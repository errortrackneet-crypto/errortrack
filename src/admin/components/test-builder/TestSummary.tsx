interface TestSummaryProps {
  test: any;

  totalQuestions: number;

  selectedQuestions: number;
}

export default function TestSummary({
  test,
  totalQuestions,
  selectedQuestions,
}: TestSummaryProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">

      <h2 className="text-2xl font-bold text-slate-800">
        {test?.name ?? "Loading Test..."}
      </h2>

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-5 gap-6">

        <div>
          <p className="text-sm text-slate-500">
            Subject
          </p>

          <p className="font-semibold text-lg">
            {test?.subjects?.name ?? "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Class
          </p>

          <p className="font-semibold text-lg">
            {test?.class ?? "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Duration
          </p>

          <p className="font-semibold text-lg">
            {test?.duration_minutes ?? 0} min
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Selected
          </p>

          <p className="font-semibold text-lg text-emerald-600">
            {selectedQuestions}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">
            Total Questions
          </p>

          <p className="font-semibold text-lg">
            {totalQuestions}
          </p>
        </div>

      </div>

    </div>
  );
}