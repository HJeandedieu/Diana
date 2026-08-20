import { sendMessage } from "../services/chatService";
import {
  createSession,
  getSessions,
  getSessionMessages,
} from "../services/sessionService";
import { useState, useEffect, useRef } from "react";
import { cn } from "../utils/utils";

import Sidebar from "../components/layout/Sidebar";
import ChatMessage from "../components/chat/ChatMessage";
import ChatInput from "../components/chat/ChatInput";

import type { Message, Session } from "../types";

import ThinkingIndicator from "../components/chat/ThinkingIndicator";

export default function ChatScreen() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeConversation, setActiveConversation] = useState<string | null>(
    null,
  );
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessionsLoading, setSessionsLoading] = useState(true);

  const bottomRef = useRef<HTMLDivElement>(null);
  const latestMessageId = useRef<string | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load sessions and create initial one if none exist
  useEffect(() => {
    async function init() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const existingSessions = await getSessions(token);
        setSessions(existingSessions);

        if (existingSessions.length > 0) {
          const first = existingSessions[0];
          setActiveConversation(first.id);
          const msgs = await getSessionMessages(first.id, token);
          setMessages(msgs);
        } else {
          const session = await createSession("New Chat", token);
          setSessions([session]);
          setActiveConversation(session.id);
        }
      } catch (error) {
        console.error("Failed to initialize sessions:", error);
      } finally {
        setSessionsLoading(false);
      }
    }

    init();
  }, []);

  async function handleNewChat() {
    latestMessageId.current = null;
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const session = await createSession("New Chat", token);
      setSessions((prev) => [session, ...prev]);
      setActiveConversation(session.id);
      setMessages([]);
    } catch (error) {
      console.error("Failed to create session:", error);
    }
  }

  async function handleConversationSelect(id: string) {
    const token = localStorage.getItem("token");
    if (!token) return;

    latestMessageId.current = null; // clear so no typewriter on loaded messages
    setActiveConversation(id);
    try {
      const msgs = await getSessionMessages(id, token);
      setMessages(msgs);
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  }

  async function onSendHandler() {
    if (!message.trim() || loading || !activeConversation) return;

    const content = message.trim();
    const isFirstMessage = messages.length === 0;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");

      const assistantMessage = await sendMessage(
        activeConversation,
        content,
        token,
      );

      console.log("Assistant message full:", assistantMessage);
      console.log("isFirstMessage:", isFirstMessage);
      console.log("sessionTitle:", assistantMessage.sessionTitle);

      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessage.id,
          role: assistantMessage.role,
          content: assistantMessage.content,
        },
      ]);

      if (assistantMessage.sessionTitle && isFirstMessage) {
        console.log("Setting title:", assistantMessage.sessionTitle);
        setSessions((prev) =>
          prev.map((s) =>
            s.id === activeConversation
              ? { ...s, title: assistantMessage.sessionTitle! }
              : s,
          ),
        );
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant" as const,
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className={cn(
        "flex h-screen w-screen gap-0.5",
        "bg-background text-text",
      )}
    >
      <Sidebar
        conversations={sessions}
        activeConversation={activeConversation ?? ""}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        onConversationSelect={handleConversationSelect}
        onNewChat={handleNewChat}
        sessionsLoading={sessionsLoading}
      />

      <section
        className={cn(
          "bg-background relative",
          "w-220 h-screen flex flex-col justify-center mx-auto",
        )}
      >
        <div
          className="flex-1 overflow-y-auto no-scrollbar pb-32"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, black 80%, transparent 98%)",
            maskImage: "linear-gradient(to bottom, black 80%, transparent 98%)",
          }}
        >
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              role={msg.role}
              content={msg.content}
              isLatest={msg.id === latestMessageId.current}
            />
          ))}
          {loading && <ThinkingIndicator />}
          <div ref={bottomRef}></div>
        </div>

        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none",
            "bg-linear-to-t from-background via-background/90 to-transparent pt-16 pb-3",
          )}
        >
          <div className="pointer-events-auto w-full flex justify-center">
            <ChatInput
              className={cn("max-w-240")}
              textareaClassName={"w-197"}
              buttonClassName={"w-17"}
              value={message}
              onChange={setMessage}
              onSend={onSendHandler}
              loading={loading}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
