import { cn } from "../../utils/utils";
import type { HTMLAttributes } from "react";
import Button from "./Button";

type ToastVariant = "success" | "error" | "warning" | "info";

interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ToastVariant;
  title: string;
  description: string;
  duration?: number;
  closable?: boolean;
  className?: string;
}

const toastVariants: Record<ToastVariant, string> = {
  success: "",
  error: "",
  warning: "",
  info: "",
};

export default function Toast({
  variant = "info",
  title,
  description,
  duration,
  closable,
  className,
  ...props
}: ToastProps) {
  return (
    <div className={cn(toastVariants[variant], className)} {...props}>
      {closable && <Button>✕</Button>}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
