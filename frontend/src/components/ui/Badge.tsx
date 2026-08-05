import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/utils";

type BadgeVariant =
  "default" | "primary" | "success" | "warning" | "danger" | "outline";

type BadgeSize = "sm" | "md" | "lg";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const badgeVariants: Record<BadgeVariant, string> = {
  default: "",
  primary: "",
  success: "",
  warning: "",
  danger: "",
  outline: "",
};

const badgeSizes: Record<BadgeSize, string> = {
  sm: "",
  md: "",
  lg: "",
};

export default function Badge({
  children,
  variant = "default",
  size = "md",
  className,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants[variant], badgeSizes[size], className)}
      {...props}
    >
      {children}
    </span>
  );
}
