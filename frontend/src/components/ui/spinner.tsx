import { cn } from "../../utils/utils";
import type { HTMLAttributes } from "react";

type SpinnerSize = "sm" | "md" | "lg";

interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  className?: string;
}

const spinnerSizes: Record<SpinnerSize, string> = {
  sm: "",
  md: "",
  lg: "",
};

export default function Spinner({
  size = "md",
  className,
  ...props
}: SpinnerProps) {
  return (
    <span className={cn("", spinnerSizes[size], className)} {...props}></span>
  );
}
