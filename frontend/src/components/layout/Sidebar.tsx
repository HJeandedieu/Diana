import { cn } from "../../utils/utils";
import type { HTMLAttributes } from "react";
import { useNavigate } from "react-router";
import Button from "../ui/Button";
import ConversationList from "../chat/ConversationList";
import BrandIdentity from "../ui/BrandIdentity";
import type { Conversation, User } from "../../types";
import collapse from "../../assets/collapse.svg";
import extend from "../../assets/extend.svg";
import { logout } from "../../utils/auth";

interface SidebarProps extends HTMLAttributes<HTMLElement> {
  conversations: Conversation[];
  activeConversation: string;
  onConversationSelect: (id: string) => void;
  onNewChat: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  user?: User;
  onProfileClick?: () => void;
  sessionsLoading?: boolean;
  onRename?: (id: string, newTitle: string) => void;
}

export default function Sidebar({
  conversations,
  activeConversation,
  onConversationSelect,
  onNewChat,
  collapsed,
  onToggleCollapse,
  onProfileClick,
  className,
  sessionsLoading,
  onRename,
  ...props
}: SidebarProps) {
  const navigate = useNavigate();

  const stored = localStorage.getItem("user");
  const user: User | null = stored ? JSON.parse(stored) : null;

  const userInitials = (user?.name ?? user?.email ?? "U")
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside
      aria-label="Main Navigation Sidebar"
      className={cn(
        "h-screen flex flex-col relative overflow-hidden select-none",
        "bg-[#061527] border-r border-[#1E3550]/60",
        "transition-all duration-300 ease-in-out",
        collapsed ? "w-18" : "w-64",
        className,
      )}
      {...props}
    >
      {/* Header */}
      <div className={cn("px-3 pt-4 pb-3 shrink-0", collapsed && "px-2")}>
        <div
          className={cn(
            "flex items-center h-9 mb-4",
            collapsed ? "justify-center" : "justify-between",
          )}
        >
          {!collapsed && <BrandIdentity />}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="text-[#4A6580] hover:text-[#8FA9C2] hover:bg-[#0d2035] p-1.5 rounded-md transition-colors"
          >
            <img
              src={collapsed ? collapse : extend}
              alt={collapsed ? "expand" : "collapse"}
              className="w-4 h-4"
            />
          </Button>
        </div>

        {/* New Chat */}
        <Button
          onClick={onNewChat}
          className={cn(
            "bg-[#0d2035] hover:bg-[#132C4C] text-[#C8D9E6] border border-[#1E3550]/80",
            "justify-start gap-2.5 h-9 px-3 rounded-lg font-normal transition-all w-full text-sm",
            collapsed && "w-10 mx-auto justify-center px-0",
          )}
        >
          <span className="text-[#567C8D] text-base font-light">+</span>
          {!collapsed && <span>New Chat</span>}
        </Button>

        {/* Nav items */}
        <nav className="flex flex-col gap-0.5 mt-3" aria-label="Navigation">
          {[
            {
              label: "Memories",
              icon: (
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2a7 7 0 0 1 7 7c0 4-3 6-4 8H9c-1-2-4-4-4-8a7 7 0 0 1 7-7z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 21h6M9.5 18h5"
                  />
                </svg>
              ),
              onClick: () => navigate("/memories"),
            },
            {
              label: "Settings",
              icon: (
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ),
              onClick: () => navigate("/settings"),
            },
            {
              label: "Profile",
              icon: (
                <svg
                  className="w-4 h-4 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              ),
              onClick: () => navigate("/profile"),
            },
          ].map(({ label, icon, onClick }) => (
            <button
              key={label}
              type="button"
              onClick={onClick}
              className={cn(
                "flex items-center gap-2.5 h-9 px-3 rounded-lg text-sm font-normal transition-colors text-left w-full",
                "text-[#4A6580] hover:text-[#C8D9E6] hover:bg-[#0d2035]",
                collapsed && "justify-center px-0 w-10 mx-auto",
              )}
            >
              {icon}
              {!collapsed && <span>{label}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Divider */}
      {!collapsed && <div className="mx-3 border-t border-[#1E3550]/40" />}

      {/* Conversation list */}
      <div
        className={cn(
          "flex-1 overflow-y-auto min-h-0 px-2 py-2.5",
          "[&::-webkit-scrollbar]:w-1",
          "[&::-webkit-scrollbar-track]:bg-transparent",
          "[&::-webkit-scrollbar-thumb]:bg-[#2f3542]",
          "[&::-webkit-scrollbar-thumb]:rounded-full",
          "hover:[&::-webkit-scrollbar-thumb]:bg-[#4d5668]",
        )}
      >
        {!collapsed && (
          <div className="transition-opacity duration-200">
            {sessionsLoading ? (
              <p className="text-xs text-[#8e8e93] px-3 py-2">
                Loading history...
              </p>
            ) : (
              <>
                {conversations.length > 0 && (
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8e8e93] px-3 pb-2 pt-1">
                    Recent
                  </p>
                )}
                <div className="recent-list-wrapper text-[#ececec]">
                  <ConversationList
                    conversations={conversations}
                    activeConversation={activeConversation}
                    onSelect={onConversationSelect}
                    onRename={onRename}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-[#1E3550]/40 bg-[#061527] shrink-0 p-2">
        <button
          type="button"
          onClick={onProfileClick}
          aria-label={`Account menu for ${user?.name ?? "user"}`}
          className={cn(
            "w-full flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#0d2035] text-left transition-colors",
            collapsed ? "justify-center" : "justify-between",
          )}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-full bg-[#132C4C] shrink-0 border border-[#567C8D]/25 flex items-center justify-center">
              <span className="text-[11px] font-semibold text-[#C8D9E6]">
                {userInitials}
              </span>
            </div>
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-medium text-[#C8D9E6] truncate leading-tight">
                  {user?.name ?? "User"}
                </span>
                <span className="text-[10px] text-[#3d5566] truncate leading-tight">
                  {user?.email ?? ""}
                </span>
              </div>
            )}
          </div>
          {!collapsed && (
            <svg
              className="w-3 h-3 text-[#3d5566] shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          )}
        </button>

        {!collapsed && (
          <button
            type="button"
            onClick={() => logout(navigate)}
            className="w-full flex items-center gap-2.5 px-2 py-1.5 mt-0.5 rounded-lg text-left text-[11px] text-[#3d5566] hover:text-red-400 hover:bg-[#0d2035] transition-all"
          >
            <svg
              className="w-3.5 h-3.5 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sign out
          </button>
        )}
      </div>
    </aside>
  );
}
