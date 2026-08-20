import { cn } from "../../utils/utils";
import type { Conversation } from "../../types";
import { useState, useRef, useEffect } from "react";

interface ConversationItemProps {
  conversation: Conversation;
  active?: boolean;
  onClick: () => void;
  onRename?: (id: string, newTitle: string) => void;
}

export default function ConversationItem({
  conversation,
  active,
  onClick,
  onRename,
}: ConversationItemProps) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(conversation.title || "New Chat");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when editing starts
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  function handleSave() {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== (conversation.title || "New Chat")) {
      onRename?.(conversation.id, trimmed);
    } else {
      setEditValue(conversation.title || "New Chat");
    }
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    } else if (e.key === "Escape") {
      setEditValue(conversation.title || "New Chat");
      setEditing(false);
    }
  }

  function handleRenameClick() {
    setEditing(true);
  }

  return (
    <div
      className={cn(
        "group relative text-left rounded-lg px-3 py-2",
        "transition-colors",
        active
          ? "bg-[#243B55] text-white"
          : "text-[#C8D9E6] hover:bg-[#162B43]",
      )}
    >
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
          maxLength={100}
          className="w-full bg-transparent border border-[#567C8D] rounded px-1.5 py-0.5 text-sm outline-none text-[#C8D9E6] placeholder-[#4A6580]"
        />
      ) : (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className="flex items-center justify-between w-full gap-2 text-left"
        >
          <p className="truncate text-sm">{conversation.title || "New Chat"}</p>

          {/* Edit/pencil icon button */}
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              handleRenameClick();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                handleRenameClick();
              }
            }}
            className={cn(
              "shrink-0 p-0.5 rounded transition-colors",
              "opacity-0 group-hover:opacity-100 hover:opacity-100",
              active ? "hover:bg-white/10" : "hover:bg-[#243B55]",
            )}
            aria-label="Rename conversation"
          >
            {/* Pencil/edit SVG icon */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
              <path d="m15 5 4 4" />
            </svg>
          </span>
        </button>
      )}


    </div>
  );
}
