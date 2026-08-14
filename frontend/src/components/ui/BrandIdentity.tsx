import Logo from "./Logo";
import { cn } from "../../utils/utils";
import type { HTMLAttributes } from "react";

interface brandIdentityProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function BrandIdentity({
  className,
  ...props
}: brandIdentityProps) {
  return (
    <div
      className={cn("flex justify-center items-center gap-3", className)}
      {...props}
    >
      <Logo />
      <h1 className="text-lg font-semibold tracking-wide text-[#C8D9E6]">
        Diana
      </h1>
    </div>
  );
}
