import { cn } from "../../utils/utils";
import type { HTMLAttributes } from "react";
import MarkdownRenderer from "./MarkdownRenderer";

interface ChatMessageProps extends HTMLAttributes<HTMLDivElement> {
  role: "user" | "assistant";
  content: string;
  timestamp?: string;
  className?: string;
}

export default function ChatMessage({
  role,
  content,
  timestamp,
  className,
  ...props
}: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex gap-3 py-4",
        role === "user" ? "justify-end" : "justify-start",
        className,
      )}
      {...props}
    >
      {role === "assistant" && <div>Diana</div>}
      <div>
        {role === "assistant" ? (
          <MarkdownRenderer content={content} />
        ) : (
          <div className="rounded-xl px-4 py-3">{content}</div>
        )}

        {timestamp && (
          <span className="text-xs text-slate-400">{timestamp}</span>
        )}
      </div>
    </div>
  );
}
