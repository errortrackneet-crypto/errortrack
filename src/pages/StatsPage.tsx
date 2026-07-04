import { TrendingUp, CheckCircle, AlertCircle } from "lucide-react";
import { ProgressBar } from "@/components/UI";
import { weakChapters, strongChapters } from "@/data/content";

const weekData = [
  { day: "Mon", value: 20 },
  { day: "Tue", value: 35 },
  { day: "Wed", value: 15 },
  { day: "Thu", value: 45 },
  { day: "Fri", value: 30 },
  { day: "Sat", value: 50 },
  { day: "Sun", value: 24 },
];
const maxWeekValue = Math.max(...weekData.map((d) => d.value));

export function StatsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-900 font-display">Statistics</h2>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Streak", value: "12 Days", emoji: "🔥", bg: "bg-orange-50", text: "text-orange-500" },
          { label: "Questions", value: "1,284", emoji: "📖", bg: "bg-teal-50", text: "text-teal-600" },
          { label: "Accuracy", value: "82%", emoji: "🎯", bg: "bg-green-50", text: "text-green-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <div className={`w-9 h-9 ${s.bg} rounded-xl flex items-center justify-center text-lg mb-3`}>
              {s.emoji}
            </div>
            <div className={`text-xl font-bold font-display ${s.text}`}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-bold text-gray-900 font-display mb-4">Answer Breakdown</h3>
        <div className="space-y-4">
          {[
            { label: "Correct", value: 1053, total: 1284, colorClass: "bg-green-500", textClass: "text-green-600" },
            { label: "Wrong", value: 167, total: 1284, colorClass: "bg-red-400", textClass: "text-red-500" },
            { label: "Skipped", value: 64, total: 1284, colorClass: "bg-gray-300", textClass: "text-gray-400" },
          ].map((s) => (
            <div key={s.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-gray-600">{s.label}</span>
                <span className={`text-sm font-bold ${s.textClass}`}>
                  {s.value}{" "}
                  <span className="font-normal text-gray-400 text-xs">
                    ({Math.round((s.value / s.total) * 100)}%)
                  </span>
                </span>
              </div>
              <ProgressBar value={(s.value / s.total) * 100} colorClass={s.colorClass} />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-bold text-gray-900 font-display mb-4">Weekly Progress</h3>
        <div className="flex items-end gap-2" style={{ height: 120 }}>
          {weekData.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-[10px] text-gray-400">{d.value}</span>
              <div
                className="w-full bg-teal-500 rounded-t-lg"
                style={{ height: `${(d.value / maxWeekValue) * 72}px` }}
              />
              <span className="text-[10px] text-gray-400">{d.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <h3 className="font-bold text-gray-900 font-display text-sm">Strong Chapters</h3>
          </div>
          <div className="space-y-2">
            {strongChapters.map((ch) => (
              <div key={ch} className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">{ch}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-orange-400" />
            <h3 className="font-bold text-gray-900 font-display text-sm">Weak Chapters</h3>
          </div>
          <div className="space-y-2">
            {weakChapters.map((ch) => (
              <div key={ch} className="flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span className="text-sm text-gray-700">{ch}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h3 className="font-bold text-gray-900 font-display mb-4">Recent Practice</h3>
        <div className="space-y-4">
          {[
            { chapter: "Cell: The Unit of Life", date: "Today", correct: 18, total: 20, pct: 90 },
            { chapter: "Animal Kingdom", date: "Yesterday", correct: 14, total: 20, pct: 70 },
            { chapter: "Human Reproduction", date: "2 days ago", correct: 16, total: 20, pct: 80 },
          ].map((r) => {
            const colorClass = r.pct >= 80 ? "bg-green-500" : r.pct >= 60 ? "bg-amber-400" : "bg-red-400";
            const textClass = r.pct >= 80 ? "text-green-600" : r.pct >= 60 ? "text-amber-600" : "text-red-500";
            return (
              <div key={r.chapter}>
                <div className="flex items-center justify-between mb-1.5">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{r.chapter}</p>
                    <p className="text-xs text-gray-400">{r.date} · {r.correct}/{r.total} correct</p>
                  </div>
                  <span className={`text-sm font-bold ${textClass}`}>{r.pct}%</span>
                </div>
                <ProgressBar value={r.pct} colorClass={colorClass} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
