import { cn } from "../../utils/utils";
import type { HTMLAttributes } from "react";
import MarkdownRenderer from "./MarkdownRenderer";

import Logo from "../ui/Logo";

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
          <div className="max-w-full flex ">
            <MarkdownRenderer content={content} />
          </div>
        ) : (
          <div className="rounded-xl px-4 py-3 max-w-[50%] bg-user-message text-white">
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
