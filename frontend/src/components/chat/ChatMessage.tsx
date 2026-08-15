import { cn } from "../../utils/utils";
import type { HTMLAttributes } from "react";
import MarkdownRenderer from "./MarkdownRenderer";
import Logo from "../ui/Logo";
import { useTypewriter } from "../../hooks/useTypeWriter";

interface ChatMessageProps extends HTMLAttributes<HTMLDivElement> {
  role: "user" | "assistant";
  content: string;
  isLatest?: boolean;
  timestamp?: string;
  className?: string;
}

export default function ChatMessage({
  role,
  content,
  isLatest = false,
  timestamp,
  className,
  ...props
}: ChatMessageProps) {
  const { displayed } = useTypewriter(
    content,
    role === "assistant" && isLatest,
    6,
  );

  const renderedContent =
    role === "assistant" && isLatest ? displayed : content;

  return (
    <div
      className={cn("flex flex-col gap-3 py-4 w-full", className)}
      {...props}
    >
      <div
        className={cn(
          "flex flex-col w-full",
          role === "user" ? "items-end" : "items-start",
        )}
      >
        {role === "assistant" && (
          <div className="flex gap-2 justify-center items-center py-2">
            <Logo />
            <span>Diana</span>
          </div>
        )}

        {role === "assistant" ? (
          <div className="max-w-[85%] w-full">
            <MarkdownRenderer content={renderedContent} />
          </div>
        ) : (
          <div className="rounded-xl px-4 py-3 max-w-[55%] bg-user-message text-white text-[15px] leading-7">
            {content}
          </div>
        )}

        {timestamp && (
          <span className="text-xs text-slate-400 mt-1">{timestamp}</span>
        )}
      </div>
    </div>
  );
}
