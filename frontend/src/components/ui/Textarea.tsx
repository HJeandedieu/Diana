import { cn } from "../../utils/utils";
import type { TextareaHTMLAttributes } from "react";

type TextareaSize = "sm" | "md" | "lg";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  size?: TextareaSize;
  className?: string;
  containerClass?: string;
}

const textareaSizes: Record<TextareaSize, string> = {
  sm: "",
  md: "",
  lg: "",
};

export default function Textarea({
  label,
  error,
  size = "md",
  className,
  containerClass,
  id,
  ...props
}: TextareaProps) {
  return (
    <div className={cn(containerClass)}>
      {label && <label htmlFor={id}>{label}</label>}

      <textarea
        id={id}
        className={cn(textareaSizes[size], className)}
        {...props}
      />

      {error && <p>{error}</p>}
    </div>
  );
}
