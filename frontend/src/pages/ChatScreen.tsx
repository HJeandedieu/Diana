import { useState } from "react";
import { cn } from "../utils/utils";

import Sidebar from "../components/layout/Sidebar";
import ChatMessage from "../components/chat/ChatMessage";
import ChatInput from "../components/chat/ChatInput";

import { conversations } from "../utils/mockConversations";

import { messages } from "../utils/mockdata";

export default function ChatScreen() {
  const [activeConversation,setActiveConversation] = useState("1");
  const [message, setMessage] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  function handleNewChat(){
    console.log("create new session");
}
  function onSendHandler() {
    console.log("Sending:", message);
    setMessage("");
  }

  return (
    <main className={cn(
      "flex h-screen w-screen gap-0.5 ",
      "bg-background text-text"
    )}>
      
      <Sidebar
  conversations={conversations}
  activeConversation={activeConversation}
  collapsed={collapsed}
  onToggleCollapse={() => setCollapsed(!collapsed)}
  onConversationSelect={(id)=>{
    setActiveConversation(id)
  }}
  onNewChat={handleNewChat}
/>

      {/* 1. Added relative positioning to parent container */}
      <section
        className={cn(
          "bg-background relative",
          "w-220 h-screen flex flex-col justify-center mx-auto",
        )}
      >
        {/* 2. Added pb-32 to give messages room to scroll completely past the input */}
        {/* 3. Added a Webkit mask gradient to fade text out at the bottom */}
        <div 
          className="flex-1 overflow-y-auto no-scrollbar pb-32"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 98%)',
            maskImage: 'linear-gradient(to bottom, black 80%, transparent 98%)'
          }}
        >
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              content={message.content}
            />
          ))}
        </div>

        {/* 4. Switched to absolute positioning so text flows beneath it */}
        {/* 5. Added a matching background gradient to block out text softly */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none",
          "bg-gradient-to-t from-background via-background/90 to-transparent pt-16 pb-3"
        )}>
          {/* 6. Restored pointer-events so users can click inside the input */}
          <div className="pointer-events-auto w-full flex justify-center">
            <ChatInput
              className={cn("max-w-240")}
              textareaClassName={"w-197"}
              buttonClassName={"w-17"}
              value={message}
              onChange={setMessage}
              onSend={onSendHandler}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
