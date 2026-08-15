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
    <div className={cn("text-[15px] leading-7 tracking-normal", className)}>
      <ReactMarkdown
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            if (!match) {
              return (
                <code
                  className="bg-[#0d1520] text-[#8bc9d8] px-1.5 py-0.5 rounded text-[13px] font-mono border border-[#1e3550]"
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
              <p className="mb-4 last:mb-0 text-[#C8D9E6] text-[15px] leading-7">
                {children}
              </p>
            );
          },
          h2({ children }) {
            return (
              <h2 className="text-white font-semibold text-xl mt-6 mb-3 tracking-tight">
                {children}
              </h2>
            );
          },
          h3({ children }) {
            return (
              <h3 className="text-white font-semibold text-[17px] mt-5 mb-2 tracking-tight">
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
            return <li className="leading-7 pl-1">{children}</li>;
          },
          strong({ children }) {
            return (
              <strong className="text-white font-semibold">{children}</strong>
            );
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-2 border-[#567C8D] pl-4 my-4 text-[#8FA9C2] italic">
                {children}
              </blockquote>
            );
          },
          hr() {
            return <hr className="border-[#1E3550] my-5" />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
