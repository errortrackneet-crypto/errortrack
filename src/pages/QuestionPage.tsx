import { useState } from "react";
import { CheckCircle, AlertCircle, Bookmark, Flag, ArrowLeft, ArrowRight } from "lucide-react";
import { Badge, ProgressBar } from "@/components/UI";
import { sampleQuestions } from "@/data/content";

export function QuestionPage({ onBack }: { onBack: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [bookmarked, setBookmarked] = useState<Set<number>>(new Set());
  const [reported, setReported] = useState(false);

  const q = sampleQuestions[currentIdx];
  const isBookmarked = bookmarked.has(q.id);
  const isCorrect = selected !== null && selected === q.correct;

  const handleSelect = (idx: number) => {
    if (selected === null) setSelected(idx);
  };

  const goNext = () => {
    if (currentIdx < sampleQuestions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelected(null);
      setReported(false);
    }
  };

  const goPrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((i) => i - 1);
      setSelected(null);
      setReported(false);
    }
  };

  const toggleBookmark = () => {
    setBookmarked((prev) => {
      const next = new Set(prev);
      if (next.has(q.id)) next.delete(q.id);
      else next.add(q.id);
      return next;
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">
            {currentIdx + 1} / {sampleQuestions.length}
          </span>
          <button
            onClick={toggleBookmark}
            className={`p-2 rounded-xl transition ${
              isBookmarked ? "bg-teal-50 text-teal-600" : "text-gray-400 hover:bg-gray-100"
            }`}
          >
            <Bookmark className="w-4 h-4" fill={isBookmarked ? "currentColor" : "none"} />
          </button>
          <button
            onClick={() => setReported((r) => !r)}
            className={`p-2 rounded-xl transition ${
              reported ? "bg-red-50 text-red-400" : "text-gray-400 hover:bg-gray-100"
            }`}
          >
            <Flag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {reported && (
        <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 text-sm text-red-600">
          Question reported. Thanks for your feedback!
        </div>
      )}

      <ProgressBar value={((currentIdx + 1) / sampleQuestions.length) * 100} colorClass="bg-teal-500" />

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <Badge label={q.difficulty} variant={q.difficulty.toLowerCase() as "easy" | "medium" | "hard"} />
          <Badge label={q.chapter} />
          <Badge label={`Class ${q.class}`} />
          {q.year && <Badge label={`NEET ${q.year}`} />}
        </div>

        <p className="text-gray-900 font-medium leading-relaxed mb-6">{q.question}</p>

        <div className="space-y-2.5">
          {q.options.map((opt, idx) => {
            let cls = "border-gray-100 bg-white hover:border-teal-200 hover:bg-teal-50";
            if (selected !== null) {
              if (idx === q.correct) cls = "border-green-400 bg-green-50";
              else if (idx === selected) cls = "border-red-300 bg-red-50";
              else cls = "border-gray-100 bg-white opacity-50";
            }
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={selected !== null}
                className={`w-full text-left p-3.5 rounded-xl border-2 transition-all ${cls}`}
              >
                <span className="text-sm font-medium text-gray-800">{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

      {selected !== null && (
        <div
          className={`rounded-2xl border p-5 ${
            isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
            <span
              className={`font-bold text-sm ${isCorrect ? "text-green-700" : "text-red-600"}`}
            >
              {isCorrect ? "Correct!" : "Incorrect — keep going!"}
            </span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{q.explanation}</p>
        </div>
      )}

      <div className="flex items-center justify-between pt-1">
        <button
          onClick={goPrev}
          disabled={currentIdx === 0}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </button>
        <button
          onClick={goNext}
          disabled={currentIdx === sampleQuestions.length - 1}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-500 text-white text-sm font-medium hover:bg-teal-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
