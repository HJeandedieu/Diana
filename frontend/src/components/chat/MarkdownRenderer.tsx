import React, { useMemo } from "react";
import { cn } from "../../utils/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/* ────────────────────────────────────────────────────────────────────────
 * Table repair
 *
 * LLMs streaming markdown routinely produce two kinds of broken tables:
 *
 *  1. "Flattened" tables — an entire table (header, separator, every row)
 *     gets emitted on ONE line with no newlines between rows, just pipes.
 *     GFM has no way to know where a row ends, so it never parses as a
 *     table at all.
 *
 *  2. "Leaking" cells — a cell's content contains a real newline (e.g. a
 *     bullet list inside an "Action Items" column). GFM tables are strictly
 *     one-row-per-line, so the moment a raw \n appears mid-row, everything
 *     after it falls OUT of the table and renders as a stray paragraph.
 *
 * Both are fixed here with the same idea: once we've found a real header
 * row followed by a real separator row, we know the column count. From
 * there we treat every subsequent pipe-bearing line as more cells to add
 * to a flat buffer, flushing a clean row every time the buffer reaches
 * `columnCount` cells (this is a no-op for already-well-formed tables —
 * each line contributes exactly one row's worth of cells and flushes
 * immediately). Lines with no pipe at all, encountered while inside a
 * table, are treated as a continuation of the last open cell rather than
 * left to break out of the table.
 * ──────────────────────────────────────────────────────────────────────── */

// Unicode line separator — survives inside a single markdown "line" (never
// split on by `\n`), so we can carry real line breaks through cell content
// without breaking GFM's one-row-per-line rule. Converted back to <br/>
// at render time.
const LINE_BREAK = "\u2028";

const FENCE_RE = /^\s*(```|~~~)/;
const HEADING_RE = /^\s*#{1,6}\s/;

function stripBrTags(text: string): string {
  return text.replace(/<br\s*\/?>/gi, LINE_BREAK);
}

/** Split one markdown table row/line into its cell contents. Respects
 * inline code spans (backticks) and escaped pipes so `a | b` inside
 * `` `code` `` or `\|` doesn't get mistaken for a column boundary. */
function splitRowCells(line: string): string[] {
  let s = line.trim();
  if (s.startsWith("|")) s = s.slice(1);
  if (s.endsWith("|") && !s.endsWith("\\|")) s = s.slice(0, -1);

  const cells: string[] = [];
  let current = "";
  let inCode = false;

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "\\" && s[i + 1] === "|") {
      current += "|";
      i++;
      continue;
    }
    if (ch === "`") {
      inCode = !inCode;
      current += ch;
      continue;
    }
    if (ch === "|" && !inCode) {
      cells.push(stripBrTags(current.trim()));
      current = "";
      continue;
    }
    current += ch;
  }
  cells.push(stripBrTags(current.trim()));
  return cells;
}

function isSeparatorRow(cells: string[]): boolean {
  if (cells.length === 0) return false;
  return cells.every((c) => /^:?-+:?$/.test(c.replace(/\s+/g, "")));
}

function lastOutIsBlank(out: string[]): boolean {
  return out.length === 0 || out[out.length - 1].trim() === "";
}

function repairMarkdownTables(input: string): string {
  const lines = input.replace(/\r\n?/g, "\n").split("\n");
  const out: string[] = [];
  let i = 0;
  let inFence = false;

  while (i < lines.length) {
    const line = lines[i];

    if (FENCE_RE.test(line)) {
      inFence = !inFence;
      out.push(line);
      i++;
      continue;
    }
    if (inFence) {
      out.push(line);
      i++;
      continue;
    }

    const hasPipe = line.includes("|");
    if (!hasPipe) {
      out.push(stripBrTags(line));
      i++;
      continue;
    }

    // Candidate header row — only treat as a table if the very next
    // pipe-bearing line is a genuine separator row (e.g. | --- | --- |).
    const headerCells = splitRowCells(line);
    const nextLine = lines[i + 1] ?? "";
    const nextIsSeparator =
      nextLine.includes("|") && isSeparatorRow(splitRowCells(nextLine));

    if (!nextIsSeparator || headerCells.length === 0) {
      out.push(stripBrTags(line));
      i++;
      continue;
    }

    const columnCount = headerCells.length;

    if (!lastOutIsBlank(out)) out.push("");
    out.push(`| ${headerCells.join(" | ")} |`);
    out.push(`| ${headerCells.map(() => "---").join(" | ")} |`);
    i += 2;

    let pending: string[] = [];

    while (i < lines.length) {
      const current = lines[i];
      if (current.trim() === "") break;
      if (FENCE_RE.test(current) || HEADING_RE.test(current)) break;

      if (current.includes("|")) {
        pending.push(...splitRowCells(current));
      } else if (pending.length > 0) {
        // Continuation of the last open cell (e.g. a bullet line that
        // belongs inside the previous cell but broke onto its own line).
        pending[pending.length - 1] += LINE_BREAK + stripBrTags(current.trim());
      } else {
        break;
      }
      i++;

      while (pending.length >= columnCount) {
        const row = pending.splice(0, columnCount);
        out.push(`| ${row.join(" | ")} |`);
      }
    }

    if (pending.length > 0) {
      while (pending.length < columnCount) pending.push("");
      out.push(`| ${pending.join(" | ")} |`);
      pending = [];
    }

    if (!lastOutIsBlank(out)) out.push("");
  }

  return out.join("\n");
}

function preProcessMarkdown(rawContent: string): string {
  if (!rawContent) return "";
  return repairMarkdownTables(rawContent);
}

/* ────────────────────────────────────────────────────────────────────────
 * Rendering line breaks that were preserved as LINE_BREAK placeholders
 * (from either an inline <br> tag or a repaired multi-line table cell)
 * back into real <br/> elements, without touching react-markdown's own
 * element tree or resorting to raw HTML injection.
 * ──────────────────────────────────────────────────────────────────────── */
function insertLineBreaks(
  node: React.ReactNode,
  keyPrefix = "lb",
): React.ReactNode {
  if (typeof node === "string") {
    if (!node.includes(LINE_BREAK)) return node;
    const parts = node.split(LINE_BREAK);
    const result: React.ReactNode[] = [];
    parts.forEach((part, idx) => {
      if (idx > 0) result.push(<br key={`${keyPrefix}-br-${idx}`} />);
      if (part) result.push(part);
    });
    return result;
  }
  if (Array.isArray(node)) {
    return node.map((child, idx) =>
      insertLineBreaks(child, `${keyPrefix}-${idx}`),
    );
  }
  if (React.isValidElement(node) && (node.props as any)?.children != null) {
    return React.cloneElement(
      node,
      undefined,
      insertLineBreaks((node.props as any).children, keyPrefix),
    );
  }
  return node;
}

/* ────────────────────────────────────────────────────────────────────────
 * Error boundary — malformed/adversarial AI output should never take down
 * the whole chat. Falls back to plain preformatted text.
 * ──────────────────────────────────────────────────────────────────────── */
class MarkdownErrorBoundary extends React.Component<
  { content: string; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { content: string; children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate(prevProps: { content: string }) {
    if (this.state.hasError && prevProps.content !== this.props.content) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <pre className="whitespace-pre-wrap wrap-break-words text-[15px] leading-7 text-[#C8D9E6] font-sans">
          {this.props.content}
        </pre>
      );
    }
    return this.props.children;
  }
}

function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  const cleanContent = useMemo(() => preProcessMarkdown(content), [content]);

  return (
    <div className="w-full max-w-full overflow-hidden block">
      <div
        className={cn(
          "text-[15px] leading-7 tracking-normal w-full wrap-break-words whitespace-pre-wrap text-[#C8D9E6]",
          className,
        )}
      >
        <MarkdownErrorBoundary content={content}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                if (!match) {
                  return (
                    <code
                      className="bg-[#0d1520] text-[#8bc9d8] px-1.5 py-0.5 rounded text-[13px] font-mono border border-[#1e3550] inline break-all whitespace-normal"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }
                return (
                  <CodeBlock
                    language={match[1]}
                    code={String(children).replace(/\n$/, "")}
                  />
                );
              },
              p({ children }) {
                return (
                  <p className="mb-4 last:mb-0 text-[#C8D9E6] text-[15px] leading-7 block w-full wrap-break-words">
                    {insertLineBreaks(children)}
                  </p>
                );
              },
              h2({ children }) {
                return (
                  <h2 className="text-white font-semibold text-xl mt-6 mb-3 tracking-tight wrap-break-words">
                    {children}
                  </h2>
                );
              },
              h3({ children }) {
                return (
                  <h3 className="text-white font-semibold text-[17px] mt-5 mb-2 tracking-tight wrap-break-words">
                    {children}
                  </h3>
                );
              },
              ul({ children }) {
                return (
                  <ul className="list-disc list-outside ml-5 mb-4 space-y-2 text-[#C8D9E6] text-[15px]">
                    {children}
                  </ul>
                );
              },
              ol({ children }) {
                return (
                  <ol className="list-decimal list-outside ml-5 mb-4 space-y-2 text-[#C8D9E6] text-[15px]">
                    {children}
                  </ol>
                );
              },
              li({ children }) {
                return (
                  <li className="leading-7 pl-1 wrap-break-words">
                    {insertLineBreaks(children)}
                  </li>
                );
              },
              strong({ children }) {
                return (
                  <strong className="text-white font-semibold">
                    {children}
                  </strong>
                );
              },
              blockquote({ children }) {
                return (
                  <blockquote className="border-l-2 border-[#567C8D] pl-4 my-4 text-[#8FA9C2] italic wrap-break-words">
                    {insertLineBreaks(children)}
                  </blockquote>
                );
              },
              hr() {
                return <hr className="border-[#1E3550] my-5" />;
              },
              table({ children }) {
                return (
                  <div className="w-full overflow-x-auto my-6 rounded-lg border border-[#1E3550] bg-[#0d1520]/40 backdrop-blur-sm">
                    <table className="w-full text-sm text-left border-collapse table-auto min-w-150">
                      {children}
                    </table>
                  </div>
                );
              },
              thead({ children }) {
                return (
                  <thead className="bg-[#0d2035] text-[#C8D9E6] border-b border-[#1E3550]">
                    {children}
                  </thead>
                );
              },
              tbody({ children }) {
                return (
                  <tbody className="divide-y divide-[#1E3550] bg-transparent">
                    {children}
                  </tbody>
                );
              },
              tr({ children }) {
                return (
                  <tr className="hover:bg-[#1E3550]/10 transition-colors">
                    {children}
                  </tr>
                );
              },
              th({ children }) {
                return (
                  <th className="px-4 py-3 font-semibold text-[#C8D9E6] text-xs uppercase tracking-wider whitespace-normal wrap-break-words">
                    {insertLineBreaks(children)}
                  </th>
                );
              },
              td({ children }) {
                return (
                  <td className="px-4 py-3 text-[#8FA9C2] align-top text-[14px] leading-relaxed wrap-break-words whitespace-normal">
                    {insertLineBreaks(children)}
                  </td>
                );
              },
            }}
          >
            {cleanContent}
          </ReactMarkdown>
        </MarkdownErrorBoundary>
      </div>
    </div>
  );
}

export default React.memo(MarkdownRenderer);
