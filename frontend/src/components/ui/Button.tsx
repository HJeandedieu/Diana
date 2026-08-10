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
  primary:
    "bg-[#567C8D] text-[#F5EFEB] hover:bg-[#638FA2] active:bg-[#4D7181] shadow-sm",

  secondary:
    "bg-[#132A43] text-[#C8D9E6] border border-[#29435D] hover:bg-[#1A344F] hover:border-[#3A5873] active:bg-[#10243A]",

  ghost:
    "bg-transparent text-[#C8D9E6] hover:bg-[#132A43] hover:text-white active:bg-[#1A344F]",

  danger: "bg-[#8F4B55] text-[#F5EFEB] hover:bg-[#A25762] active:bg-[#7C414A]",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  children,
  loading = false,
  disabled = false,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center",
        "font-medium rounded-xl",
        "transition-all duration-200",
        "focus:outline-none focus-visible:ring-2",
        "focus-visible:ring-[#567C8D] focus-visible:ring-offset-2",
        "focus-visible:ring-offset-[#07182F]",
        "disabled:pointer-events-none disabled:opacity-50",
        "active:scale-[0.98]",
        buttonVariants[variant],
        buttonSizes[size],
        className,
      )}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
