import { Pencil, Trash2 } from "lucide-react";
import { Question } from "../../hooks/useQuestions";

interface QuestionTableProps {
  questions: Question[];
  loading: boolean;
  onEdit: (question: Question) => void;
  onDelete: (question: Question) => void;
}

export default function QuestionTable({
  questions,
  loading,
  onEdit,
  onDelete,
}: QuestionTableProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
        Loading questions...
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
        No questions found.
      </div>
    );
  }

  return (
    <div className="overflow-auto rounded-2xl border border-slate-200 bg-white">
      <table className="min-w-full">
        <thead className="bg-slate-50">
          <tr className="text-left text-sm font-semibold text-slate-700">
            <th className="px-4 py-4">#</th>
            <th className="px-4 py-4">Subject</th>
            <th className="px-4 py-4">Class</th>
            <th className="px-4 py-4">Chapter</th>
            <th className="px-4 py-4">Topic</th>
            <th className="px-4 py-4">Question</th>
            <th className="px-4 py-4">Difficulty</th>
            <th className="px-4 py-4">Status</th>
            <th className="px-4 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {questions.map((question, index) => (
            <tr
              key={question.id}
              className="border-t hover:bg-slate-50"
            >
              <td className="px-4 py-4">{index + 1}</td>

              <td className="px-4 py-4">
                {question.topics?.chapters?.subjects?.name ?? "-"}
              </td>

              <td className="px-4 py-4">
                {question.topics?.chapters?.class ?? "-"}
              </td>

              <td className="px-4 py-4">
                {question.topics?.chapters?.name ?? "-"}
              </td>

              <td className="px-4 py-4">
                {question.topics?.name ?? "-"}
              </td>

              <td className="px-4 py-4 max-w-sm">
                <div className="truncate">
                  {question.question}
                </div>
              </td>

              <td className="px-4 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    question.difficulty === "Easy"
                      ? "bg-green-100 text-green-700"
                      : question.difficulty === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {question.difficulty}
                </span>
              </td>

              <td className="px-4 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    question.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {question.is_active ? "Active" : "Inactive"}
                </span>
              </td>

              <td className="px-4 py-4">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => onEdit(question)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(question)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}