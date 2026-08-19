import { cn } from "../../utils/utils";
import ReactMarkdown from "react-markdown";
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
    <div
      className={cn(
        "text-[15px] leading-7 tracking-normal overflow-hidden",
        className,
      )}
    >
      <ReactMarkdown
        components={{
          // ... existing components ...
          table({ children }) {
            return (
              <div className="overflow-x-auto my-4 rounded-lg border border-[#1E3550]">
                <table className="w-full text-sm text-left border-collapse">
                  {children}
                </table>
              </div>
            );
          },
          thead({ children }) {
            return (
              <thead className="bg-[#0d2035] text-[#C8D9E6]">{children}</thead>
            );
          },
          tbody({ children }) {
            return <tbody>{children}</tbody>;
          },
          tr({ children }) {
            return <tr className="border-t border-[#1E3550]">{children}</tr>;
          },
          th({ children }) {
            return (
              <th className="px-4 py-2 font-semibold text-[#C8D9E6] whitespace-nowrap">
                {children}
              </th>
            );
          },
          td({ children }) {
            return (
              <td className="px-4 py-2 text-[#8FA9C2] align-top">{children}</td>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
