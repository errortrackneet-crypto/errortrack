import { useNavigate } from "react-router-dom";
import { Question } from "../../hooks/useQuestionList";

type Props = {
  loading: boolean;
  questions: Question[];
  onDelete: (id: number) => void;
};

export default function QuestionsTable({
  loading,
  questions,
  onDelete
}: Props) {

  const navigate = useNavigate();
  
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
        Loading questions...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="text-left px-6 py-4">
              Subject
            </th>

            <th className="text-left px-6 py-4">
              Question
            </th>

            <th className="text-left px-6 py-4">
              Difficulty
            </th>

            <th className="text-left px-6 py-4">
              Status
            </th>

            <th className="text-right px-6 py-4">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {questions.map((question) => (

            <tr
              key={question.id}
              className="border-t border-slate-200"
            >

              <td className="px-6 py-4 font-medium">
                {question.topics.chapters.subjects.name}
              </td>

              <td className="px-6 py-4">
                {question.question}
              </td>

              <td className="px-6 py-4">
                {question.difficulty}
              </td>

              <td className="px-6 py-4">

                {question.is_active ? (
                  <span className="text-green-600 font-medium">
                    Active
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">
                    Inactive
                  </span>
                )}

              </td>

              <td className="px-6 py-4 text-right">

                <button
                    onClick={() =>
                    navigate(`/admin/questions/${question.id}/edit`)
                    }
                    className="text-blue-600 hover:underline mr-4"
                    >
                    Edit
                    </button>

              <button
  onClick={() => onDelete(question.id)}
  className="text-red-600 hover:underline"
>
  Delete
</button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}