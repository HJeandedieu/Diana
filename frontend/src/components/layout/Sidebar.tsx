import { cn } from "../../utils/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface SidebarProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  collapsed?: boolean;
  className?: string;
}

export default function Sidebar({
  children,
  collapsed,
  className,
  ...props
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col h-screen transition-all duration-300",
        collapsed ? "w-20" : "w-64",
        className,
      )}
      {...props}
    >
      {children}
    </aside>
  );
}
