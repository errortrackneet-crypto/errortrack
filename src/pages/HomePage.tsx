import {
  Flame,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  FileText,
  Play,
  Lock,
} from "lucide-react";
import { Badge, ProgressBar } from "@/components/UI";
import { weakChapters } from "@/data/content";
import type { Page } from "@/types";

export function HomePage({
  isPremium,
  onNav,
}: {
  isPremium: boolean;
  onNav: (p: Page) => void;
}) {
  const handleNcertClick = () => {
    if (!isPremium) {
      onNav("subscription");
    } else {
      onNav("practice");
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero banner */}
      <div className="bg-gradient-to-br from-[#0f1f5c] to-[#1a3a7a] rounded-2xl p-6 text-white shadow-lg shadow-slate-200">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-teal-100 text-sm">Good morning,</p>
            <h1 className="text-2xl font-bold font-display mt-0.5">Hi, Arjun! 👋</h1>
            <p className="text-teal-100 text-sm mt-1">Ready to crack NEET today?</p>
          </div>
          <div className="flex flex-col items-center bg-white/20 rounded-2xl px-4 py-3 backdrop-blur-sm">
            <Flame className="w-6 h-6 text-orange-300" />
            <span className="text-2xl font-bold leading-none mt-1">12</span>
            <span className="text-[10px] text-teal-100 mt-0.5">Day Streak</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-5">
          {[
            { label: "Questions Today", value: "24" },
            { label: "Accuracy", value: "82%" },
          ].map((s) => (
            <div key={s.label} className="bg-white/15 rounded-xl p-3 text-center">
              <div className="font-bold text-xl leading-none">{s.value}</div>
              <div className="text-[11px] text-teal-100 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Offer Banner */}
      {!isPremium && (
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ background: "linear-gradient(135deg, #1a0533 0%, #3b0764 50%, #6d1b7b 100%)" }}
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #f472b6 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
          <div className="absolute bottom-0 left-1/2 w-32 h-32 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #818cf8 0%, transparent 70%)", transform: "translate(-50%, 40%)" }} />

          <div className="relative flex items-center gap-3 px-4 py-4">
            {/* Left: text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider">ErrorTrack Premium</span>
              </div>
              <p className="text-white font-black font-display text-lg leading-tight">
                Unlock Everything
              </p>
              <p className="text-purple-200 text-[11px] mt-0.5">
                Only at <span className="text-white font-bold text-sm">₹59</span>
                <span className="text-purple-300">/month</span>
              </p>
            </div>

            {/* Middle: feature pills */}
            <div className="hidden sm:flex flex-col gap-1 flex-shrink-0">
              {["NCERT Line by Line", "Unlimited Tests", "Full Analytics"].map((f) => (
                <div key={f} className="flex items-center gap-1.5">
                  <CheckCircle className="w-3 h-3 text-pink-400 flex-shrink-0" />
                  <span className="text-[11px] text-purple-100 whitespace-nowrap">{f}</span>
                </div>
              ))}
            </div>

            {/* Right: decorative SVG + CTA */}
            <div className="flex flex-col items-center gap-2 flex-shrink-0 ml-1">
              {/* DNA / biology decoration */}
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none" className="opacity-80">
                <circle cx="22" cy="22" r="20" stroke="#f472b6" strokeWidth="1.5" strokeDasharray="4 3" />
                <circle cx="22" cy="22" r="12" stroke="#818cf8" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="22" cy="22" r="5" fill="#f472b6" opacity="0.6" />
                <circle cx="10" cy="14" r="2.5" fill="#c084fc" />
                <circle cx="34" cy="14" r="2.5" fill="#c084fc" />
                <circle cx="10" cy="30" r="2.5" fill="#818cf8" />
                <circle cx="34" cy="30" r="2.5" fill="#818cf8" />
                <line x1="10" y1="14" x2="34" y2="14" stroke="#c084fc" strokeWidth="1" opacity="0.5" />
                <line x1="10" y1="30" x2="34" y2="30" stroke="#818cf8" strokeWidth="1" opacity="0.5" />
                <line x1="10" y1="14" x2="10" y2="30" stroke="#c084fc" strokeWidth="1" opacity="0.4" />
                <line x1="34" y1="14" x2="34" y2="30" stroke="#818cf8" strokeWidth="1" opacity="0.4" />
              </svg>
              <button
                onClick={() => onNav("subscription")}
                className="bg-teal-500 hover:bg-teal-400 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition whitespace-nowrap shadow-lg shadow-teal-900/40"
              >
                Get Started →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section banners — compact horizontal */}
      <div className="space-y-3">
        {/* NCERT Biology */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl px-4 py-3.5 flex items-center gap-4 text-white">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4 text-gray-300" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold font-display">NCERT Biology</span>
              {!isPremium && (
                <span className="flex items-center gap-1 bg-yellow-400/20 text-yellow-300 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  <Lock className="w-2 h-2" /> Premium
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-0.5 truncate">Line by line · Concepts · Diagrams</p>
          </div>
          <button
            onClick={handleNcertClick}
            className="flex-shrink-0 flex items-center gap-1 bg-teal-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-teal-600 transition"
          >
            {isPremium ? "Open" : "Unlock"} <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* PYQ */}
        <div className="bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl px-4 py-3.5 flex items-center gap-4 text-white">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-lg">
            📝
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold font-display">Previous Year Questions</span>
              <Badge label="FREE" variant="free" />
            </div>
            <p className="text-xs text-blue-200 mt-0.5 truncate">Chapter-wise · Year-wise · Explanations</p>
          </div>
          <button
            onClick={() => onNav("practice")}
            className="flex-shrink-0 flex items-center gap-1 bg-white text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-50 transition"
          >
            Start <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Continue Practice — subject cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-gray-900 font-display">Continue Practice</h2>
          <button
            onClick={() => onNav("practice")}
            className="text-xs text-teal-600 font-semibold hover:text-teal-700"
          >
            See All →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl">🌿</div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm font-display">Botany</h3>
                  <p className="text-xs text-gray-400">16 Chapters</p>
                </div>
              </div>
              <span className="text-sm font-bold text-green-600">43%</span>
            </div>
            <ProgressBar value={43} colorClass="bg-green-500" />
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-gray-400">2,400 questions</span>
              <button
                onClick={() => onNav("practice")}
                className="flex items-center gap-1.5 bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-green-700 transition"
              >
                <Play className="w-3 h-3" /> Continue
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-xl">🧬</div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm font-display">Zoology</h3>
                  <p className="text-xs text-gray-400">16 Chapters</p>
                </div>
              </div>
              <span className="text-sm font-bold text-blue-600">31%</span>
            </div>
            <ProgressBar value={31} colorClass="bg-blue-500" />
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs text-gray-400">2,800 questions</span>
              <button
                onClick={() => onNav("practice")}
                className="flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-blue-700 transition"
              >
                <Play className="w-3 h-3" /> Continue
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Weak Chapters */}
      <div>
        <h2 className="text-base font-bold text-gray-900 font-display mb-3">Weak Chapters</h2>
        <div className="space-y-2">
          {weakChapters.map((ch) => (
            <div
              key={ch}
              className="flex items-center justify-between bg-white rounded-xl border border-orange-100 p-3.5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span className="text-sm font-medium text-gray-800">{ch}</span>
              </div>
              <button
                onClick={() => onNav("practice")}
                className="text-xs text-teal-600 font-semibold hover:text-teal-700"
              >
                Practice →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
