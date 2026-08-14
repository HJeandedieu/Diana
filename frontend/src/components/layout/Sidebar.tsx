import { cn } from "../../utils/utils";
import type { HTMLAttributes } from "react";

import { useNavigate } from "react-router";

import Button from "../ui/Button";
import ConversationList from "../chat/ConversationList";
import BrandIdentity from "../ui/BrandIdentity";
import type { Conversation } from "../../types";

import collapse from "../../assets/collapse.svg";
import extend from "../../assets/extend.svg";

// Extensible domain interfaces for reliable context integration
interface UserMetadata {
  name: string;
  email: string;
  avatarUrl?: string;
}

interface SidebarProps extends HTMLAttributes<HTMLElement> {
  conversations: Conversation[];
  activeConversation: string;
  onConversationSelect: (id: string) => void;
  onNewChat: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  user?: UserMetadata; // Optional inject ensures zero breaking states
  onProfileClick?: () => void;
  sessionsLoading?: boolean;
}

export default function Sidebar({
  conversations,
  activeConversation,
  onConversationSelect,
  onNewChat,
  collapsed,
  onToggleCollapse,
  user = { name: "Jean de Dieu", email: "jean@example.com" },
  onProfileClick,
  className,
  sessionsLoading,
  ...props
}: SidebarProps) {

  const navigate = useNavigate();
  // Clean fallback initials computation helper
  const userInitials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside
      aria-label="Main Navigation Sidebar"
      className={cn(
        "h-screen flex flex-col relative overflow-hidden select-none",
        "bg-[#081B33] border-r border-[#1E3550]",
        "transition-all duration-300 ease-in-out",
        collapsed ? "w-20" : "w-72",
        className,
      )}
      {...props}
    >
      {/* Structural Header Wrapper */}
      <div className="p-4 z-10 shrink-0">
        <div
          className={cn(
            "flex items-center mb-6 h-9",
            collapsed ? "justify-center" : "justify-between",
          )}
        >
          {!collapsed && <BrandIdentity />}

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            aria-label={
              collapsed
                ? "Expand sidebar navigation"
                : "Collapse sidebar navigation"
            }
            className="text-[#8FA9C2] hover:bg-button-muted flex items-center text-xs transition-colors p-2"
          >
            {collapsed ? (
              <span aria-hidden="true">
                <img src={collapse} alt="collapse" />
              </span>
            ) : (
              <>
                <span aria-hidden="true">
                  <img src={extend} alt="extend" />
                </span>
              </>
            )}
          </Button>
        </div>

        {/* Semantic Layout Action Utilities */}
        <nav className="flex flex-col gap-1" aria-label="Quick Actions">
          <Button
            onClick={onNewChat}
            className={cn(
              "bg-[#132C4C] hover:bg-[#1E3550] text-[#C8D9E6] border border-[#1E3550]/60 justify-start gap-3 h-11 px-4 rounded-lg font-normal transition-all",
              collapsed ? "w-12 mx-auto justify-center px-0" : "w-full",
            )}
          >
            <span className="text-lg font-light" aria-hidden="true">
              +
            </span>
            {!collapsed && <span className="text-sm">New Chat</span>}
          </Button>

          <Button
            variant="ghost"
            onClick={() => navigate("/memories")}
            className={cn(
              "text-[#8FA9C2] hover:text-[#C8D9E6] hover:bg-[#1E3550]/40 justify-start gap-3 h-11 px-4 rounded-lg font-normal transition-colors",
              collapsed && "justify-center px-0",
            )}
          >
            <svg
              className="w-4 h-4 min-w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            {!collapsed && <span className="text-sm">Memories</span>}
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "text-[#8FA9C2] hover:text-[#C8D9E6] hover:bg-[#1E3550]/40 justify-start gap-3 h-11 px-4 rounded-lg font-normal transition-colors",
              collapsed && "justify-center px-0",
            )}
          >
            <svg
              className="w-4 h-4 min-w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <circle cx="12" cy="12" r="3" />
            </svg>
            {!collapsed && <span className="text-sm">Settings</span>}
          </Button>

          <Button
            variant="ghost"
            className={cn(
              "text-[#8FA9C2] hover:text-[#C8D9E6] hover:bg-[#1E3550]/40 justify-start gap-3 h-11 px-4 rounded-lg font-normal transition-colors",
              collapsed && "justify-center px-0",
            )}
          >
            <svg
              className="w-4 h-4 min-w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            {!collapsed && <span className="text-sm">Profile</span>}
          </Button>
        </nav>
      </div>

      {/* Dynamic Conversational Content Wrapper */}
      <div
        className={cn(
          "flex-1 overflow-y-auto px-3 z-10 min-h-0",
          "[&::-webkit-scrollbar]:w-1.5",
          "[&::-webkit-scrollbar-track]:bg-transparent",
          "[&::-webkit-scrollbar-thumb]:bg-[#1E3550]",
          "[&::-webkit-scrollbar-thumb]:rounded-full",
          "hover:[&::-webkit-scrollbar-thumb]:bg-[#567C8D]",
        )}
      >
        <div
          className={cn(
            "transition-opacity duration-200",
            collapsed ? "opacity-0 pointer-events-none" : "opacity-100",
          )}
        >
          {!collapsed &&
            (sessionsLoading ? (
              <p className="text-xs text-[#8FA9C2] px-3 py-4">
                Loading conversations...
              </p>
            ) : (
              <ConversationList
                conversations={conversations}
                activeConversation={activeConversation}
                onSelect={onConversationSelect}
              />
            ))}
        </div>
      </div>

      {/* Accessible Production-Ready Profile Interaction Footer */}
      <div className="p-3 border-t border-[#1E3550]/80 bg-[#061527] z-10 flex-shrink-0">
        <button
          type="button"
          onClick={onProfileClick}
          aria-haspopup="menu"
          aria-label={`User account menu for ${user.name}`}
          className={cn(
            "w-full flex items-center gap-3 p-1.5 rounded-lg hover:bg-[#132C4C]/50 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#567C8D]/60 transition-all",
            collapsed ? "justify-center" : "justify-between",
          )}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#1E3550] overflow-hidden flex-shrink-0 border border-[#567C8D]/20 flex items-center justify-center">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs font-semibold text-[#C8D9E6]">
                  {userInitials}
                </span>
              )}
            </div>

            {!collapsed && (
              <div className="flex flex-col min-w-0 animate-fadeIn">
                <span className="text-xs font-medium text-[#C8D9E6] truncate">
                  {user.name}
                </span>
                <span className="text-[10px] text-[#8FA9C2] truncate">
                  {user.email}
                </span>
              </div>
            )}
          </div>

          {!collapsed && (
            <svg
              className="w-3 h-3 text-[#8FA9C2] flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          )}
        </button>
      </div>
    </aside>
  );
}
