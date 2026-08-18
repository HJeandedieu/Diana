import { useState } from "react";
import { useNavigate } from "react-router";
import Sidebar from "../components/layout/Sidebar";
import { getSessions } from "../services/sessionService";
import {
  updateProfile,
  updatePassword,
  clearAllMemories,
  deleteAccount,
} from "../services/userService";
import { logout } from "../utils/auth";
import type { User, Session } from "../types/index";
import { useEffect } from "react";

export default function SettingsScreen() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") ?? "";
  const stored = localStorage.getItem("user");
  const currentUser: User | null = stored ? JSON.parse(stored) : null;

  const [sessions, setSessions] = useState<Session[]>([]);
  const [collapsed, setCollapsed] = useState(false);

  const [name, setName] = useState(currentUser?.name ?? "");
  const [email, setEmail] = useState(currentUser?.email ?? "");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState("");
  const [profileError, setProfileError] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [clearLoading, setClearLoading] = useState(false);
  const [clearSuccess, setClearSuccess] = useState("");

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState("");

  useEffect(() => {
    getSessions(token).then(setSessions).catch(console.error);
  }, []);

  async function handleProfileUpdate(e: React.FormEvent) {
    e.preventDefault();
    setProfileLoading(true);
    setProfileError("");
    setProfileSuccess("");
    try {
      const updated = await updateProfile(name, email, token);
      localStorage.setItem("user", JSON.stringify(updated));
      setProfileSuccess("Profile updated successfully.");
    } catch (err) {
      setProfileError(
        err instanceof Error ? err.message : "Failed to update profile.",
      );
    } finally {
      setProfileLoading(false);
    }
  }

  async function handlePasswordUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      return;
    }
    setPasswordLoading(true);
    setPasswordError("");
    setPasswordSuccess("");
    try {
      await updatePassword(currentPassword, newPassword, token);
      setPasswordSuccess("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordError(
        err instanceof Error ? err.message : "Failed to update password.",
      );
    } finally {
      setPasswordLoading(false);
    }
  }

  async function handleClearMemories() {
    if (
      !window.confirm(
        "Clear all memories? Diana will forget everything about you.",
      )
    )
      return;
    setClearLoading(true);
    try {
      await clearAllMemories(token);
      setClearSuccess("All memories cleared.");
    } catch {
      setClearSuccess("");
    } finally {
      setClearLoading(false);
    }
  }

  async function handleDeleteAccount() {
    if (confirmDelete !== "DELETE") return;
    setDeleteLoading(true);
    try {
      await deleteAccount(token);
      logout();
    } catch {
      setDeleteLoading(false);
    }
  }

  return (
    <main className="flex h-screen w-screen bg-background text-text overflow-hidden">
      <Sidebar
        conversations={sessions}
        activeConversation=""
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        onConversationSelect={(id) => navigate(`/?session=${id}`)}
        onNewChat={() => navigate("/")}
      />

      <section className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-8 py-10">
          <h1 className="font-dm text-3xl font-semibold text-[#C8D9E6] mb-1">
            Settings
          </h1>
          <p className="text-sm text-[#567C8D] mb-10">
            Manage your account and Diana's behaviour.
          </p>

          {/* Account — Profile */}
          <div className="mb-8">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3d5566] mb-4">
              Account
            </p>
            <div className="bg-[#081B33] border border-[#1E3550] rounded-xl p-6">
              <h2 className="text-sm font-semibold text-[#C8D9E6] mb-4">
                Profile
              </h2>
              <form
                onSubmit={handleProfileUpdate}
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-[#567C8D]">Full Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-[#0d2035] border border-[#1E3550] rounded-lg px-3 py-2 text-sm text-[#C8D9E6] focus:outline-none focus:border-[#567C8D] transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-[#567C8D]">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-[#0d2035] border border-[#1E3550] rounded-lg px-3 py-2 text-sm text-[#C8D9E6] focus:outline-none focus:border-[#567C8D] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                {profileError && (
                  <p className="text-red-400 text-xs">{profileError}</p>
                )}
                {profileSuccess && (
                  <p className="text-green-400 text-xs">{profileSuccess}</p>
                )}
                <button
                  type="submit"
                  disabled={profileLoading}
                  className="self-start bg-[#567C8D] hover:bg-[#4a6e7e] text-white text-xs font-medium px-5 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {profileLoading ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
          </div>

          {/* Account — Password */}
          <div className="mb-8">
            <div className="bg-[#081B33] border border-[#1E3550] rounded-xl p-6">
              <h2 className="text-sm font-semibold text-[#C8D9E6] mb-4">
                Change Password
              </h2>
              <form
                onSubmit={handlePasswordUpdate}
                className="flex flex-col gap-4"
              >
                {[
                  {
                    label: "Current Password",
                    value: currentPassword,
                    setter: setCurrentPassword,
                  },
                  {
                    label: "New Password",
                    value: newPassword,
                    setter: setNewPassword,
                  },
                  {
                    label: "Confirm New Password",
                    value: confirmPassword,
                    setter: setConfirmPassword,
                  },
                ].map(({ label, value, setter }) => (
                  <div key={label} className="flex flex-col gap-1.5">
                    <label className="text-xs text-[#567C8D]">{label}</label>
                    <input
                      type="password"
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      className="bg-[#0d2035] border border-[#1E3550] rounded-lg px-3 py-2 text-sm text-[#C8D9E6] focus:outline-none focus:border-[#567C8D] transition-colors"
                      placeholder="········"
                    />
                  </div>
                ))}
                {passwordError && (
                  <p className="text-red-400 text-xs">{passwordError}</p>
                )}
                {passwordSuccess && (
                  <p className="text-green-400 text-xs">{passwordSuccess}</p>
                )}
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="self-start bg-[#567C8D] hover:bg-[#4a6e7e] text-white text-xs font-medium px-5 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  {passwordLoading ? "Updating..." : "Update Password"}
                </button>
              </form>
            </div>
          </div>

          {/* AI Behaviour */}
          <div className="mb-8">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3d5566] mb-4">
              AI Behaviour
            </p>
            <div className="bg-[#081B33] border border-[#1E3550] rounded-xl p-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold text-[#C8D9E6]">
                  Clear All Memories
                </h2>
                <p className="text-xs text-[#3d5566] mt-1">
                  Diana will forget everything she knows about you. This cannot
                  be undone.
                </p>
                {clearSuccess && (
                  <p className="text-green-400 text-xs mt-2">{clearSuccess}</p>
                )}
              </div>
              <button
                type="button"
                onClick={handleClearMemories}
                disabled={clearLoading}
                className="shrink-0 bg-transparent border border-[#567C8D]/40 hover:border-[#567C8D] text-[#567C8D] hover:text-[#C8D9E6] text-xs font-medium px-4 py-2 rounded-lg transition-all disabled:opacity-50"
              >
                {clearLoading ? "Clearing..." : "Clear Memories"}
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="mb-8">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-red-500/60 mb-4">
              Danger Zone
            </p>
            <div className="bg-[#081B33] border border-red-500/20 rounded-xl p-6">
              <h2 className="text-sm font-semibold text-[#C8D9E6]">
                Delete Account
              </h2>
              <p className="text-xs text-[#3d5566] mt-1 mb-4">
                Permanently deletes your account, all sessions, messages, and
                memories. Type{" "}
                <span className="text-red-400 font-mono">DELETE</span> to
                confirm.
              </p>
              <div className="flex gap-3 items-center">
                <input
                  value={confirmDelete}
                  onChange={(e) => setConfirmDelete(e.target.value)}
                  placeholder="Type DELETE to confirm"
                  className="bg-[#0d2035] border border-[#1E3550] rounded-lg px-3 py-2 text-sm text-[#C8D9E6] focus:outline-none focus:border-red-500/40 transition-colors flex-1"
                />
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={confirmDelete !== "DELETE" || deleteLoading}
                  className="shrink-0 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-medium px-4 py-2 rounded-lg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {deleteLoading ? "Deleting..." : "Delete Account"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
