import { cn } from "../../utils/utils";
import type { LabelHTMLAttributes, ReactNode } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  required?: boolean;
  className?: string;
}

export default function Label({
  children,
  required,
  className,
  ...props
}: LabelProps) {
  return (
    <label className={cn("text-sm font-medium", className)} {...props}>
      {children} {required && <span className="text-muted">(required)</span>}
    </label>
  );
}
