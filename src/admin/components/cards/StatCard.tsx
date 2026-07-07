import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  color = "#0F1F5C",
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-slate-500 text-sm">{title}</p>

          <h2 className="text-4xl font-bold mt-2 text-slate-800">
            {value}
          </h2>
        </div>

        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}