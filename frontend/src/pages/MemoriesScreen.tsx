import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { cn } from "../utils/utils";
import Sidebar from "../components/layout/Sidebar";
import {
  getMemories,
  updateMemory,
  deleteMemory,
} from "../services/memoryService";
import { getSessions } from "../services/sessionService";
import type { Memory, Session } from "../types/index";

const TYPE_COLORS: Record<string, string> = {
  project: "bg-[#1a3a5c] text-[#7ab8d4] border-[#2a5a8c]",
  skill: "bg-[#1a3a2c] text-[#7ab894] border-[#2a5a3c]",
  goal: "bg-[#3a2a1a] text-[#d4a87a] border-[#5a3a2a]",
  preference: "bg-[#2a1a3a] text-[#a87ab8] border-[#3a2a5a]",
  fact: "bg-[#1e3550] text-[#8fa9c2] border-[#2a4a6a]",
};

const IMPORTANCE_LABEL: Record<number, string> = {
  1: "Low",
  2: "Medium",
  3: "High",
  4: "Critical",
  5: "Core",
};

function ImportanceDots({ score }: { score: number }) {
  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={cn(
            "w-1.5 h-1.5 rounded-full",
            i <= score ? "bg-[#567C8D]" : "bg-[#1E3550]",
          )}
        />
      ))}
      <span className="text-[10px] text-[#567C8D] ml-1 uppercase tracking-wider">
        {IMPORTANCE_LABEL[score] ?? score}
      </span>
    </div>
  );
}

export default function MemoriesScreen() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token") ?? "";
  const navigate = useNavigate();

  useEffect(() => {
    async function init() {
      try {
        const [mems, sess] = await Promise.all([
          getMemories(token),
          getSessions(token),
        ]);
        setMemories(mems);
        setSessions(sess);
      } catch {
        setError("Failed to load memories.");
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  const types = [
    "all",
    ...Array.from(new Set(memories.map((m) => m.memoryType))),
  ];

  const filtered =
    filter === "all"
      ? memories
      : memories.filter((m) => m.memoryType === filter);

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await deleteMemory(id, token);
      setMemories((prev) => prev.filter((m) => m.id !== id));
    } catch {
      setError("Failed to delete memory.");
    } finally {
      setDeletingId(null);
    }
  }

  function startEdit(memory: Memory) {
    setEditingId(memory.id);
    setEditContent(memory.content);
  }

  async function handleSave(id: string) {
    setSavingId(id);
    try {
      const updated = await updateMemory(id, editContent, token);
      setMemories((prev) => prev.map((m) => (m.id === id ? updated : m)));
      setEditingId(null);
    } catch {
      setError("Failed to update memory.");
    } finally {
      setSavingId(null);
    }
  }

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

      <section className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-10 pt-10 pb-6 border-b border-[#1E3550] shrink-0">
          <h1 className="font-dm text-3xl font-semibold text-[#C8D9E6] mb-1">
            Memories
          </h1>
          <p className="text-sm text-[#567C8D]">
            Everything Diana knows about you — {memories.length} memories
            stored.
          </p>

          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

          {/* Filter tabs */}
          <div className="flex gap-2 mt-5 flex-wrap">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-medium border transition-all capitalize",
                  filter === type
                    ? "bg-[#567C8D] text-white border-[#567C8D]"
                    : "bg-transparent text-[#8FA9C2] border-[#1E3550] hover:border-[#567C8D] hover:text-[#C8D9E6]",
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-10 py-8">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-[#567C8D] text-sm animate-pulse">
                Loading memories...
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <p className="text-[#567C8D] text-sm">No memories yet.</p>
              <p className="text-[#3d5a70] text-xs max-w-xs text-center">
                Start a conversation with Diana — she will extract and store
                what matters automatically.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((memory) => (
                <div
                  key={memory.id}
                  className="bg-[#081B33] border border-[#1E3550] rounded-xl p-5 flex flex-col gap-3 hover:border-[#567C8D]/40 transition-colors"
                >
                  {/* Type badge + importance */}
                  <div className="flex items-center justify-between">
                    <span
                      className={cn(
                        "text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border",
                        TYPE_COLORS[memory.memoryType] ?? TYPE_COLORS.fact,
                      )}
                    >
                      {memory.memoryType}
                    </span>
                    <ImportanceDots score={memory.importance} />
                  </div>

                  {/* Content */}
                  {editingId === memory.id ? (
                    <textarea
                      className="bg-[#0d2240] border border-[#567C8D]/40 rounded-lg p-3 text-sm text-[#C8D9E6] resize-none focus:outline-none focus:border-[#567C8D] w-full"
                      rows={3}
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      autoFocus
                    />
                  ) : (
                    <p className="text-sm text-[#C8D9E6] leading-relaxed flex-1">
                      {memory.content}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-1 border-t border-[#1E3550] mt-auto">
                    {editingId === memory.id ? (
                      <>
                        <button
                          onClick={() => handleSave(memory.id)}
                          disabled={savingId === memory.id}
                          className="text-xs text-[#567C8D] hover:text-[#C8D9E6] transition-colors disabled:opacity-50"
                        >
                          {savingId === memory.id ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-xs text-[#3d5a70] hover:text-[#8FA9C2] transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(memory)}
                          className="text-xs text-[#567C8D] hover:text-[#C8D9E6] transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(memory.id)}
                          disabled={deletingId === memory.id}
                          className="text-xs text-[#3d5a70] hover:text-red-400 transition-colors disabled:opacity-50 ml-auto"
                        >
                          {deletingId === memory.id ? "Deleting..." : "Delete"}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
