import { useState } from "react";
import {
  ArrowLeft,
  Star,
  Crown,
  User,
  Lock,
  CreditCard,
  Bell,
  ChevronRight,
  LogOut,
} from "lucide-react";
import type { Page } from "@/types";

export function ProfilePage({
  isPremium,
  onNav,
  onLogout,
}: {
  isPremium: boolean;
  onNav: (p: Page) => void;
  onLogout: () => void;
}) {
  const [section, setSection] = useState<"main" | "edit" | "password">("main");

  // Editable student details state
  const [name, setName] = useState("Arjun Sharma");
  const [mobile, setMobile] = useState("9876543210");
  const [email, setEmail] = useState("arjun.sharma@gmail.com");
  const [studentType, setStudentType] = useState<"11th" | "12th" | "dropper">("12th");

  // Password change state
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdSaved, setPwdSaved] = useState(false);

  const [detailsSaved, setDetailsSaved] = useState(false);

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleSaveDetails = () => {
    setDetailsSaved(true);
    setTimeout(() => { setDetailsSaved(false); setSection("main"); }, 1200);
  };

  const handleSavePassword = () => {
    if (newPwd && newPwd === confirmPwd) {
      setPwdSaved(true);
      setTimeout(() => {
        setPwdSaved(false);
        setCurrentPwd(""); setNewPwd(""); setConfirmPwd("");
        setSection("main");
      }, 1200);
    }
  };

  return (
    <div className="space-y-5 max-w-lg">

      {/* ── Edit Details section ── */}
      {section === "edit" && (
        <>
          <div className="flex items-center gap-3">
            <button onClick={() => setSection("main")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h2 className="text-lg font-bold text-gray-900 font-display">Edit Profile</h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            {/* Avatar */}
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0f1f5c] to-[#1a3a7a] flex items-center justify-center text-white text-xl font-bold font-display flex-shrink-0">
                {initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">{name}</p>
                <p className="text-xs text-gray-400">{email}</p>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Full Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent transition"
                placeholder="Your full name"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Mobile Number</label>
              <div className="flex gap-2">
                <span className="flex items-center px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-500 font-medium flex-shrink-0">+91</span>
                <input
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/, ""))}
                  maxLength={10}
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent transition"
                  placeholder="10-digit mobile number"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Email Address</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent transition"
                placeholder="you@example.com"
              />
            </div>

            {/* Student Type */}
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">I am a</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "11th" as const, emoji: "✏️", label: "11th", sub: "Class 11" },
                  { id: "12th" as const, emoji: "📚", label: "12th", sub: "Class 12" },
                  { id: "dropper" as const, emoji: "🎯", label: "Dropper", sub: "Repeating" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setStudentType(opt.id)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all ${
                      studentType === opt.id
                        ? "border-teal-400 bg-teal-50"
                        : "border-gray-100 bg-white hover:border-gray-200"
                    }`}
                  >
                    <span className="text-xl">{opt.emoji}</span>
                    <span className={`text-xs font-bold ${studentType === opt.id ? "text-teal-700" : "text-gray-600"}`}>
                      {opt.label}
                    </span>
                    <span className="text-[10px] text-gray-400">{opt.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSaveDetails}
              className={`w-full py-3 rounded-xl text-sm font-semibold transition ${
                detailsSaved
                  ? "bg-green-500 text-white"
                  : "bg-teal-500 text-white hover:bg-teal-600"
              }`}
            >
              {detailsSaved ? "✓ Saved!" : "Save Changes"}
            </button>
          </div>
        </>
      )}

      {/* ── Change Password section ── */}
      {section === "password" && (
        <>
          <div className="flex items-center gap-3">
            <button onClick={() => setSection("main")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h2 className="text-lg font-bold text-gray-900 font-display">Change Password</h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Current Password</label>
              <input
                type="password"
                value={currentPwd}
                onChange={(e) => setCurrentPwd(e.target.value)}
                placeholder="Enter current password"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">New Password</label>
              <input
                type="password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Confirm New Password</label>
              <input
                type="password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                placeholder="Re-enter new password"
                className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent transition ${
                  confirmPwd && newPwd !== confirmPwd ? "border-red-300 bg-red-50" : "border-gray-200"
                }`}
              />
              {confirmPwd && newPwd !== confirmPwd && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>
            <button
              onClick={handleSavePassword}
              disabled={!currentPwd || !newPwd || newPwd !== confirmPwd}
              className={`w-full py-3 rounded-xl text-sm font-semibold transition ${
                pwdSaved
                  ? "bg-green-500 text-white"
                  : "bg-teal-500 text-white hover:bg-teal-600 disabled:opacity-40 disabled:cursor-not-allowed"
              }`}
            >
              {pwdSaved ? "✓ Password Updated!" : "Update Password"}
            </button>
          </div>
        </>
      )}

      {/* ── Main Profile section ── */}
      {section === "main" && (
        <>
          <h2 className="text-lg font-bold text-gray-900 font-display">Profile</h2>

          {/* Hero card */}
          <div className="bg-gradient-to-br from-[#0f1f5c] to-[#1a3a7a] rounded-2xl p-5 text-white">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-bold font-display backdrop-blur-sm flex-shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold font-display leading-tight">{name}</h3>
                <p className="text-teal-100 text-xs mt-0.5 truncate">{email}</p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 bg-white/20 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                    {studentType === "dropper" ? "🎯 Dropper" : studentType === "11th" ? "✏️ Class 11" : "📚 Class 12"}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-white/20 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                    {isPremium ? <><Crown className="w-2.5 h-2.5 text-yellow-300" /> Premium</> : <><Star className="w-2.5 h-2.5" /> Free</>}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSection("edit")}
                className="flex-shrink-0 bg-white/20 hover:bg-white/30 transition px-3 py-1.5 rounded-lg text-xs font-semibold"
              >
                Edit
              </button>
            </div>
          </div>

          {/* Student details card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-50">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Student Details</p>
            </div>
            {[
              { label: "Full Name", value: name, icon: "👤" },
              { label: "Mobile", value: `+91 ${mobile}`, icon: "📱" },
              { label: "Email", value: email, icon: "✉️" },
              { label: "Student Type", value: studentType === "dropper" ? "Dropper" : studentType === "11th" ? "Class 11" : "Class 12", icon: studentType === "dropper" ? "🎯" : studentType === "11th" ? "✏️" : "📚" },
            ].map(({ label, value, icon }) => (
              <div key={label} className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-50 last:border-0">
                <span className="text-base flex-shrink-0">{icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">{label}</p>
                  <p className="text-sm font-medium text-gray-800 truncate mt-0.5">{value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Account actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-50">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Account</p>
            </div>
            {[
              { Icon: User, label: "Edit Profile", action: () => setSection("edit") },
              { Icon: Lock, label: "Change Password", action: () => setSection("password") },
              { Icon: CreditCard, label: "Billing & Plans", action: () => onNav("subscription") },
              { Icon: Bell, label: "Notifications", action: undefined },
            ].map(({ Icon, label, action }, i) => (
              <button
                key={i}
                onClick={action}
                className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition text-left border-b border-gray-50 last:border-0"
              >
                <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-800">{label}</span>
                <ChevronRight className="ml-auto w-4 h-4 text-gray-300" />
              </button>
            ))}
          </div>

          {!isPremium && (
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-100 rounded-2xl p-4 flex items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-gray-900 text-sm font-display">Upgrade to Premium</h4>
                <p className="text-xs text-gray-500 mt-0.5">NCERT, chapter tests & full stats from ₹59/mo</p>
              </div>
              <button
                onClick={() => onNav("subscription")}
                className="flex-shrink-0 bg-teal-500 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-teal-600 transition"
              >
                View Plans
              </button>
            </div>
          )}

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-red-100 bg-red-50 text-red-500 text-sm font-semibold hover:bg-red-100 transition"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>

          <p className="text-center text-[11px] text-gray-400 pb-4">
            ErrorTrack v1.0 · Built for NEET Biology aspirants
          </p>
        </>
      )}
    </div>
  );
}
