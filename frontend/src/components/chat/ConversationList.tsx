import ConversationItem from "./ConversationItem";
import type { Conversation } from "../../types";

interface ConversationListProps {
  conversations: Conversation[];
  activeConversation?: string;
  onSelect: (id: string) => void;
}

export default function ConversationList({
  conversations,
  activeConversation,
  onSelect,
}: ConversationListProps) {
  return (
    <div className="flex flex-col gap-2">
      {conversations.map((conversation) => (
        <ConversationItem
          key={conversation.id}
          conversation={conversation}
          active={activeConversation === conversation.id}
          onClick={() => onSelect(conversation.id)}
        />
      ))}
    </div>
  );
}
