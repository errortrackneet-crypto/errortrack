import { X } from "lucide-react";
import { Question } from "../../hooks/useTestQuestions";

interface SelectedPanelProps {
  questions: Question[];

  selectedQuestions: number[];

  hasUnsavedChanges: boolean;

  saveQuestions: () => Promise<boolean>;

  removeQuestion: (questionId: number) => void;

  previewQuestion: (question: Question) => void;
}

export default function SelectedPanel({
  questions,
  selectedQuestions,
  hasUnsavedChanges,
  saveQuestions,
    removeQuestion,
    previewQuestion,
}: SelectedPanelProps) {

  const selected = questions.filter((question) =>
    selectedQuestions.includes(question.id)
  );

  const totalMarks = selected.reduce(
  (total, question) => total + question.marks,
  0
);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white">

      <div className="border-b border-slate-200 p-5">

        <h3 className="text-lg font-bold">
          Selected Questions
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          {selectedQuestions.length} selected
        </p>

      </div>

      <div className="max-h-[550px] overflow-y-auto">

        {selected.length === 0 ? (

          <div className="p-6 text-center text-slate-500">
            No questions selected.
          </div>

        ) : (

          selected.map((question, index) => (

            <div
  key={question.id}
  className="border-b border-slate-100 p-4"
>
  <div className="flex items-start justify-between gap-3">

    <div className="flex-1">

      <div className="text-sm font-semibold text-slate-700">
        {index + 1}.
      </div>

      <div className="mt-1 text-sm text-slate-600 line-clamp-3">
        {question.question}
      </div>

    </div>

    <div className="flex items-center gap-2">

  <button
    onClick={() => previewQuestion(question)}
    className="rounded-lg p-2 text-teal-600 hover:bg-teal-50 hover:text-teal-700 transition"
    title="Preview Question"
  >
    👁
  </button>

  <button
    onClick={() => removeQuestion(question.id)}
    className="rounded-lg p-2 text-red-600 hover:bg-red-50 hover:text-red-700 transition"
    title="Remove Question"
  >
    <X size={18} />
  </button>

</div>

  </div>
</div>

          ))

        )}

      </div>

      <div className="border-t border-slate-200 p-5">

  <div className="mb-5 space-y-2 rounded-xl bg-slate-50 p-4">

    <div className="flex justify-between text-sm">
      <span className="text-slate-600">
        Selected Questions
      </span>

      <span className="font-semibold">
        {selected.length}
      </span>
    </div>

    <div className="flex justify-between text-sm">
      <span className="text-slate-600">
        Total Marks
      </span>

      <span className="font-semibold text-teal-600">
        {totalMarks}
      </span>
    </div>

  </div>

  <button
    onClick={saveQuestions}
    disabled={!hasUnsavedChanges}
    className={`w-full rounded-xl px-4 py-3 font-semibold text-white transition ${
      hasUnsavedChanges
        ? "bg-teal-600 hover:bg-teal-700"
        : "bg-slate-300 cursor-not-allowed"
    }`}
  >
    Save Questions
  </button>

</div>

    </div>
  );
}