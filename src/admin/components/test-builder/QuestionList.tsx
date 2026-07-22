import { Question } from "../../hooks/useTestQuestions";

interface QuestionListProps {
  loading: boolean;

  questions: Question[];

  selectedQuestions: number[];

  toggleQuestion: (questionId: number) => void;

  onPreview: (question: Question) => void;
}

export default function QuestionList({
  loading,
  questions,
  selectedQuestions,
  toggleQuestion,
  onPreview,
}: QuestionListProps) {

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        Loading questions...
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500">
        No questions found.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden">

      {questions.map((question) => (

        <div
  key={question.id}
  className="flex items-start gap-4 border-b p-5 hover:bg-slate-50"
>

          <input
            type="checkbox"
            checked={selectedQuestions.includes(question.id)}
            onChange={() =>
              toggleQuestion(question.id)
            }
            className="mt-1 h-4 w-4"
          />

          <div className="flex-1">

            <div className="font-medium text-slate-800">
              {question.question}
            </div>

            <div className="mt-2 flex flex-wrap gap-2 text-xs">

              <span className="rounded-full bg-slate-100 px-3 py-1">
                {question.topics.chapters.subjects.name}
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1">
                Class {question.topics.chapters.class}
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1">
                {question.topics.chapters.name}
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1">
                {question.topics.name}
              </span>

              <span
                className={`rounded-full px-3 py-1 ${
                  question.difficulty === "Easy"
                    ? "bg-green-100 text-green-700"
                    : question.difficulty === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {question.difficulty}
              </span>

            </div>

            <div className="mt-4">
  <button
  type="button"
  onClick={() => onPreview(question)}
  className="rounded-lg border border-teal-500 px-3 py-1 text-sm font-medium text-teal-600 hover:bg-teal-50"
>
  👁 Preview
</button>
</div>

          </div>

        </div>

      ))}

    </div>
  );
}