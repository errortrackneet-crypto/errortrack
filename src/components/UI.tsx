// Small, reusable UI building blocks shared across pages.

export function Badge({
  label,
  variant = "default",
}: {
  label: string;
  variant?: "easy" | "medium" | "hard" | "default" | "free";
}) {
  const styles: Record<string, string> = {
    easy: "bg-green-100 text-green-700",
    medium: "bg-amber-100 text-amber-700",
    hard: "bg-red-100 text-red-600",
    default: "bg-gray-100 text-gray-500",
    free: "bg-emerald-100 text-emerald-700",
  };
  return (
    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${styles[variant]}`}>
      {label}
    </span>
  );
}

export function ProgressBar({
  value,
  colorClass = "bg-teal-500",
}: {
  value: number;
  colorClass?: string;
}) {
  return (
    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ${colorClass}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
