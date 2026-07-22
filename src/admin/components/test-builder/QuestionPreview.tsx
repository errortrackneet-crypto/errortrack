import { X } from "lucide-react";
import { Question } from "../../hooks/useTestQuestions";

interface QuestionPreviewProps {
  open: boolean;
  question: Question | null;
  onClose: () => void;
}

export default function QuestionPreview({
  open,
  question,
  onClose,
}: QuestionPreviewProps) {
  if (!open || !question) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-bold">
            Question Preview
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6 p-6">

          <div>
            <p className="mb-2 text-sm font-semibold text-slate-500">
              Question
            </p>

            <p className="text-lg">
              {question.question}
            </p>
          </div>

          <div className="grid gap-3">

            <div className="rounded-lg border p-3">
              <strong>A.</strong> {question.option_a}
            </div>

            <div className="rounded-lg border p-3">
              <strong>B.</strong> {question.option_b}
            </div>

            <div className="rounded-lg border p-3">
              <strong>C.</strong> {question.option_c}
            </div>

            <div className="rounded-lg border p-3">
              <strong>D.</strong> {question.option_d}
            </div>

          </div>

          <div className="grid grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-slate-500">
                Correct Answer
              </p>

              <p className="font-semibold text-emerald-600">
                {question.correct_option}
              </p>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Difficulty
              </p>

              <p className="font-semibold">
                {question.difficulty}
              </p>
            </div>

          </div>

          <div>
            <p className="text-sm text-slate-500">
              Explanation
            </p>

            <p>
              {question.explanation || "No explanation available."}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}