import { cn } from "../../utils/utils";
import type { Conversation } from "../../types";

interface ConversationItemProps {
  conversation: Conversation;
  active?: boolean;
  onClick: () => void;
}

export default function ConversationItem({
  conversation,
  active,
  onClick,
}: ConversationItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "text-left rounded-lg px-3 py-2",
        "transition-colors",
        active
          ? "bg-[#243B55] text-white"
          : "text-[#C8D9E6] hover:bg-[#162B43]",
      )}
    >
      <p className="truncate">{conversation.title}</p>
    </div>
  );
}
