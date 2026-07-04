import { useState } from "react";
import { FileText, Clock } from "lucide-react";
import { Badge } from "@/components/UI";
import type { Difficulty } from "@/types";

type TestTab = "mock" | "chapter" | "pyp";

interface TestItem {
  name: string;
  questions: number;
  duration: string;
  difficulty: Difficulty;
  attempted: boolean;
}

const mockTests: TestItem[] = [
  { name: "NEET 2024 Full Mock Test 1", questions: 180, duration: "200 min", difficulty: "Hard", attempted: false },
  { name: "NEET 2024 Full Mock Test 2", questions: 180, duration: "200 min", difficulty: "Hard", attempted: true },
  { name: "NEET Biology Mock Test 1", questions: 90, duration: "100 min", difficulty: "Medium", attempted: false },
];

const chapterTests: TestItem[] = [
  { name: "The Living World — Chapter Test", questions: 30, duration: "30 min", difficulty: "Easy", attempted: true },
  { name: "Cell Biology Chapter Test", questions: 30, duration: "30 min", difficulty: "Medium", attempted: false },
  { name: "Human Reproduction Chapter Test", questions: 30, duration: "30 min", difficulty: "Easy", attempted: false },
];

const pypTests: TestItem[] = [
  { name: "NEET 2023 Biology Paper", questions: 90, duration: "100 min", difficulty: "Hard", attempted: false },
  { name: "NEET 2022 Biology Paper", questions: 90, duration: "100 min", difficulty: "Hard", attempted: true },
  { name: "NEET 2021 Biology Paper", questions: 90, duration: "100 min", difficulty: "Medium", attempted: false },
];

function TestCard({ test }: { test: TestItem }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-semibold text-gray-900 text-sm leading-snug">{test.name}</h3>
        {test.attempted && (
          <span className="text-[11px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full flex-shrink-0">
            Done
          </span>
        )}
      </div>
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <FileText className="w-3 h-3" /> {test.questions} Questions
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <Clock className="w-3 h-3" /> {test.duration}
        </span>
        <Badge label={test.difficulty} variant={test.difficulty.toLowerCase() as "easy" | "medium" | "hard"} />
      </div>
      <button
        className={`w-full py-2.5 rounded-xl text-sm font-semibold transition ${
          test.attempted
            ? "border border-gray-200 text-gray-700 hover:bg-gray-50"
            : "bg-teal-500 text-white hover:bg-teal-600"
        }`}
      >
        {test.attempted ? "Re-attempt" : "Start Test"}
      </button>
    </div>
  );
}

export function TestsPage() {
  const [tab, setTab] = useState<TestTab>("mock");
  const tests = tab === "mock" ? mockTests : tab === "chapter" ? chapterTests : pypTests;

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-gray-900 font-display">Tests</h2>

      <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
        {[
          { id: "mock" as TestTab, label: "Full Mock" },
          { id: "chapter" as TestTab, label: "Chapter Tests" },
          { id: "pyp" as TestTab, label: "Previous Year" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition ${
              tab === t.id ? "bg-white text-teal-700 shadow-sm" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {tests.map((test, i) => (
          <TestCard key={i} test={test} />
        ))}
      </div>
    </div>
  );
}
