import { cn } from "../../utils/utils";
import type { HTMLAttributes } from "react";

import Textarea from "../ui/Textarea";
import Button from "../ui/Button";

interface ChatInputProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange"
> {
  value: string;

  onChange: (value: string) => void;
  onSend: () => void;

  loading?: boolean;
  disabled?: boolean;

  placeholder?: string;
  textareaClassName?: string;
  buttonClassName?: string;
  className?: string;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  loading = false,
  disabled = false,
  placeholder = "Ask Diana Anything...",
  textareaClassName,
  buttonClassName,
  className,
  ...props
}: ChatInputProps) {
  return (
    <div
      className={cn(
        "flex gap-2 items-center justify-center bg-user-message backdrop-blur-md border border-white/20 px-3 rounded-xl shadow-lg h-20",
        className,
      )}
      {...props}
    >
      <Textarea
        className={cn(
          "bg-user-message rounded-2xl focus:outline-none",
          textareaClassName,
        )}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        disabled={loading || disabled}
        rows={1}
      />
      <Button
        className={buttonClassName}
        loading={loading}
        disabled={disabled}
        onClick={onSend}
      >
        Send
      </Button>
    </div>
  );
}
