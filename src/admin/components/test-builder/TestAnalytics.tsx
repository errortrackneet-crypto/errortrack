interface Props {
  total: number;
  selected: number;

  easy: number;
  medium: number;
  hard: number;
}

export default function TestAnalytics({
  total,
  selected,
  easy,
  medium,
  hard,
}: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

      <div className="rounded-2xl border bg-white p-5">
        <p className="text-sm text-slate-500">
          Total
        </p>

        <p className="text-3xl font-bold">
          {total}
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-5">
        <p className="text-sm text-slate-500">
          Selected
        </p>

        <p className="text-3xl font-bold text-emerald-600">
          {selected}
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-5">
        <p className="text-sm text-slate-500">
          Easy
        </p>

        <p className="text-3xl font-bold text-green-600">
          {easy}
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-5">
        <p className="text-sm text-slate-500">
          Medium
        </p>

        <p className="text-3xl font-bold text-yellow-600">
          {medium}
        </p>
      </div>

      <div className="rounded-2xl border bg-white p-5">
        <p className="text-sm text-slate-500">
          Hard
        </p>

        <p className="text-3xl font-bold text-red-600">
          {hard}
        </p>
      </div>

    </div>
  );
}