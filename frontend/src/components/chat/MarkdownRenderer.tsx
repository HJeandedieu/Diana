import { cn } from "../../utils/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // 👈 Crucial import
import CodeBlock from "./CodeBlock";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  return (
    <div className="w-full max-w-full overflow-hidden">
      <div className={cn("text-[15px] leading-7 tracking-normal w-full wrap-break-words whitespace-pre-line", className)}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]} // 👈 Tells react-markdown to parse table structures
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              if (!match) {
                return (
                  <code
                    className="bg-[#0d1520] text-[#8bc9d8] px-1.5 py-0.5 rounded text-[13px] font-mono border border-[#1e3550] inline-block max-w-full break-all whitespace-normal"
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
                  {children}
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
              return <li className="leading-7 pl-1 wrap-break-words">{children}</li>;
            },
            strong({ children }) {
              return <strong className="text-white font-semibold">{children}</strong>;
            },
            blockquote({ children }) {
              return (
                <blockquote className="border-l-2 border-[#567C8D] pl-4 my-4 text-[#8FA9C2] italic wrap-break-words">
                  {children}
                </blockquote>
              );
            },
            hr() {
              return <hr className="border-[#1E3550] my-5" />;
            },
            // --- Table handling ---
            table({ children }) {
              return (
                <div className="w-full overflow-x-auto my-6 rounded-lg border border-[#1E3550] shadow-sm">
                  <table className="w-full text-sm text-left border-collapse table-auto min-w-150">
                    {children}
                  </table>
                </div>
              );
            },
            thead({ children }) {
              return <thead className="bg-[#0d2035] text-[#C8D9E6] border-b border-[#1E3550]">{children}</thead>;
            },
            tbody({ children }) {
              return <tbody className="divide-y divide-[#1E3550] bg-transparent">{children}</tbody>;
            },
            tr({ children }) {
              return <tr className="hover:bg-[#0d1520]/30 transition-colors">{children}</tr>;
            },
            th({ children }) {
              return (
                <th className="px-4 py-3 font-semibold text-[#C8D9E6] text-xs uppercase tracking-wider whitespace-normal wrap-break-words">
                  {children}
                </th>
              );
            },
            td({ children }) {
              return (
                <td className="px-4 py-3 text-[#8FA9C2] align-top text-[14px] leading-relaxed wrap-break-words whitespace-normal">
                  {children}
                </td>
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
