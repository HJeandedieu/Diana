import logo from "../../assets/logo.svg";
import type { ImgHTMLAttributes } from "react";

import { cn } from "../../utils/utils";

type LogoSize = "sm" | "md" | "lg";

interface logoProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: LogoSize;
  containerClassName?: string;
  className?: string;
}

const logoSizes: Record<LogoSize, string> = {
  sm: "w-6",
  md: "w-8",
  lg: "w-10",
};

export default function Logo({
  size = "sm",
  containerClassName,
  className,
  ...props
}: logoProps) {
  return (
    <div
      className={cn(
        "p-1 bg-transparent rounded-full border border-logo",
        containerClassName,
      )}
    >
      <img
        className={cn("rounded-2xl", logoSizes[size], className)}
        src={logo}
        alt="Diana"
        {...props}
      />
    </div>
  );
}
