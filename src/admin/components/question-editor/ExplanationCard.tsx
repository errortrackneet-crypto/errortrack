type Props = {
  explanation: string;
  setExplanation: (value: string) => void;
};

export default function ExplanationCard({
  explanation,
  setExplanation,
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">

      <h2 className="text-xl font-semibold mb-5">
        📖 Explanation
      </h2>

      <textarea
        rows={5}
        value={explanation}
        onChange={(e) => setExplanation(e.target.value)}
        placeholder="Explain why the answer is correct..."
        className="w-full rounded-xl border border-slate-300 px-4 py-3 resize-none outline-none focus:border-teal-500"
      />

    </div>
  );
}