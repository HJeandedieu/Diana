import { cn } from "../../utils/utils.tsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-blue-500 text-white hover:bg-blue-600",
  secondary: "border border-slate-700 text-white hover:bg-slate-800",
  ghost: "bg-transparent text-blue-400 hover:text-blue-300",
  danger: "bg-red-500 text-white hover:bg-red-600",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  children,
  loading = false,
  disabled,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "font-medium rounded-xl transition-all duration-200",
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}

      {...props}
    >
      {children}
    </button>
  );
}
