type Props = {
  question: string;
  setQuestion: (value: string) => void;
};

export default function QuestionCard({
  question,
  setQuestion,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">
      <h2 className="text-xl font-semibold mb-5">
        📝 Question
      </h2>

      <textarea
        rows={6}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Enter question..."
        className="w-full rounded-xl border border-slate-300 px-4 py-3 resize-none outline-none focus:border-teal-500"
      />
    </div>
  );
}