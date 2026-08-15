import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import type { HTMLAttributes } from "react";
import { cn } from "../../utils/utils";

interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
  className?: string;
}

export default function CodeBlock({
  code,
  language = "text",
  className,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className={cn(
        "max-w-full min-w-[50%] my-2 overflow-hidden rounded-xl border border-border",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between border-b border-slate-700 px-4 py-2 bg-[#0d1520]">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="text-xs text-slate-400 hover:text-white transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: 0,
          background: "#0d1520",
          fontSize: "13px",
          lineHeight: "1.6",
        }}
        showLineNumbers
        lineNumberStyle={{ color: "#3d5566", minWidth: "2.5em" }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
