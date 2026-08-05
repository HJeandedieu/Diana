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
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-slate-700 bg-slate-900",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between border-b border-slate-700 px-4 py-2">
        <span className="text-sm font-medium text-slate-300">{language}</span>

        <button
          type="button"
          className="text-sm text-slate-400 transition-colors hover:text-white"
        >
          Copy
        </button>
      </div>

      <pre className="overflow-x-auto p-4">
        <code>{code}</code>
      </pre>
    </div>
  );
}
