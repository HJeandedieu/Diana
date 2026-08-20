import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { cn } from "../utils/utils";
import Sidebar from "../components/layout/Sidebar";
import { getSessions } from "../services/sessionService";
import { getMemories } from "../services/memoryService";
import type { Session, Memory, User } from "../types/index";

export default function ProfileScreen() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") ?? "";
  const stored = localStorage.getItem("user");
  const user: User | null = stored ? JSON.parse(stored) : null;

  const [sessions, setSessions] = useState<Session[]>([]);
  const [memories, setMemories] = useState<Memory[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const [sess, mems] = await Promise.all([
          getSessions(token),
          getMemories(token),
        ]);
        setSessions(sess);
        setMemories(mems);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  const userInitials = (user?.name ?? user?.email ?? "U")
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Unknown";

  // Memory breakdown by type
  const memoryBreakdown = memories.reduce(
    (acc, m) => {
      acc[m.memoryType] = (acc[m.memoryType] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const TYPE_COLORS: Record<string, string> = {
    project: "bg-[#1a3a5c] text-[#7ab8d4] border-[#2a5a8c]",
    skill: "bg-[#1a3a2c] text-[#7ab894] border-[#2a5a3c]",
    goal: "bg-[#3a2a1a] text-[#d4a87a] border-[#5a3a2a]",
    preference: "bg-[#2a1a3a] text-[#a87ab8] border-[#3a2a5a]",
    fact: "bg-[#1e3550] text-[#8fa9c2] border-[#2a4a6a]",
  };

  return (
    <main className="flex h-screen w-screen bg-background text-text overflow-hidden">
      <Sidebar
        conversations={sessions}
        activeConversation=""
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        onConversationSelect={() => navigate("/")}
        onNewChat={() => navigate("/")}
      />

      <section className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-8 py-10">
          {/* Header */}
          <h1 className="font-dm text-3xl font-semibold text-[#C8D9E6] mb-1">
            Profile
          </h1>
          <p className="text-sm text-[#567C8D] mb-10">
            Your identity and activity with Diana.
          </p>

          {/* Avatar + identity */}
          <div className="bg-[#081B33] border border-[#1E3550] rounded-xl p-6 mb-6 flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-[#132C4C] border border-[#567C8D]/30 flex items-center justify-center shrink-0">
              <span className="text-2xl font-semibold text-[#C8D9E6] font-cormorant">
                {userInitials}
              </span>
            </div>
            <div className="min-w-0">
              <h2 className="text-lg font-semibold text-[#C8D9E6] truncate">
                {user?.name ?? "User"}
              </h2>
              <p className="text-sm text-[#567C8D] truncate">{user?.email}</p>
              <p className="text-xs text-[#3d5566] mt-1">
                Member since {memberSince}
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigate("/settings")}
              className="ml-auto shrink-0 text-xs text-[#567C8D] hover:text-[#C8D9E6] border border-[#1E3550] hover:border-[#567C8D] px-4 py-2 rounded-lg transition-all"
            >
              Edit Profile
            </button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Conversations", value: sessions.length },
              { label: "Memories Stored", value: memories.length },
              {
                label: "Avg. Importance",
                value: memories.length
                  ? (
                      memories.reduce((sum, m) => sum + m.importance, 0) /
                      memories.length
                    ).toFixed(1)
                  : "—",
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-[#081B33] border border-[#1E3550] rounded-xl p-4 text-center"
              >
                <p className="font-cormorant text-3xl font-light text-[#C8D9E6]">
                  {loading ? "—" : value}
                </p>
                <p className="text-[11px] text-[#3d5566] uppercase tracking-wider mt-1">
                  {label}
                </p>
              </div>
            ))}
          </div>

          {/* Memory breakdown */}
          <div className="mb-6">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3d5566] mb-4">
              Memory Breakdown
            </p>
            <div className="bg-[#081B33] border border-[#1E3550] rounded-xl p-6">
              {loading ? (
                <p className="text-xs text-[#3d5566] animate-pulse">
                  Loading...
                </p>
              ) : Object.keys(memoryBreakdown).length === 0 ? (
                <p className="text-xs text-[#3d5566]">
                  No memories yet. Start a conversation with Diana.
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {Object.entries(memoryBreakdown).map(([type, count]) => (
                    <div key={type} className="flex items-center gap-3">
                      <span
                        className={cn(
                          "text-[10px] font-semibold tracking-widest px-2.5 py-1 rounded-full border capitalize shrink-0",
                          TYPE_COLORS[type] ?? TYPE_COLORS.fact,
                        )}
                      >
                        {type}
                      </span>
                      <div className="flex-1 bg-[#0d2035] rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full bg-[#567C8D] rounded-full transition-all"
                          style={{
                            width: `${(count / memories.length) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-[#567C8D] shrink-0 w-4 text-right">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent sessions */}
          <div className="mb-6">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3d5566] mb-4">
              Recent Conversations
            </p>
            <div className="bg-[#081B33] border border-[#1E3550] rounded-xl overflow-hidden">
              {loading ? (
                <p className="text-xs text-[#3d5566] animate-pulse p-6">
                  Loading...
                </p>
              ) : sessions.length === 0 ? (
                <p className="text-xs text-[#3d5566] p-6">
                  No conversations yet.
                </p>
              ) : (
                sessions.slice(0, 5).map((session, index) => (
                  <button
                    key={session.id}
                    type="button"
                    onClick={() => navigate("/")}
                    className={cn(
                      "w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-[#0d2035] transition-colors",
                      index !== 0 && "border-t border-[#1E3550]/60",
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#567C8D] shrink-0" />
                      <span className="text-sm text-[#C8D9E6] truncate">
                        {session.title || "New Chat"}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#3d5566] shrink-0 ml-4">
                      {new Date(session.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
