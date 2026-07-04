import { useState } from "react";
import { Search, Bookmark, Play } from "lucide-react";
import { Badge } from "@/components/UI";
import { sampleQuestions } from "@/data/content";

export function SavedPage({ onStartPractice }: { onStartPractice: () => void }) {
  const [filter, setFilter] = useState<"all" | "botany" | "zoology">("all");
  const [search, setSearch] = useState("");

  const filtered = sampleQuestions.filter((q) => {
    if (filter !== "all" && q.subject !== filter) return false;
    if (search && !q.question.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 font-display">Saved Questions</h2>
        <span className="text-sm text-gray-400">{filtered.length} questions</span>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search bookmarks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent transition"
        />
      </div>

      <div className="flex gap-2">
        {(["all", "botany", "zoology"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition capitalize ${
              filter === f
                ? "bg-teal-500 text-white"
                : "bg-white border border-gray-200 text-gray-500 hover:border-teal-200 hover:text-teal-600"
            }`}
          >
            {f === "all" ? "All" : f === "botany" ? "🌿 Botany" : "🧬 Zoology"}
          </button>
        ))}
      </div>

      <button
        onClick={onStartPractice}
        className="w-full flex items-center justify-center gap-2 bg-teal-500 text-white font-semibold text-sm py-3 rounded-xl hover:bg-teal-600 transition"
      >
        <Play className="w-4 h-4" /> Practice Saved Questions
      </button>

      <div className="space-y-3">
        {filtered.map((q) => (
          <div
            key={q.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <Bookmark className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" fill="currentColor" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 line-clamp-2">{q.question}</p>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <Badge label={q.chapter} />
                  <Badge label={q.difficulty} variant={q.difficulty.toLowerCase() as "easy" | "medium" | "hard"} />
                  <span className={`text-[11px] font-semibold ${q.subject === "botany" ? "text-green-600" : "text-blue-600"}`}>
                    {q.subject === "botany" ? "🌿 Botany" : "🧬 Zoology"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Bookmark className="w-8 h-8 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No saved questions found</p>
          </div>
        )}
      </div>
    </div>
  );
}
