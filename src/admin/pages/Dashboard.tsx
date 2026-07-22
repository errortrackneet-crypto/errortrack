import AdminLayout from "../layouts/AdminLayout";

import {
  Users,
  BookOpen,
  FolderOpen,
  ListTree,
  FileText,
  Crown,
} from "lucide-react";

const cards = [
  {
    title: "Total Students",
    value: "0",
    icon: Users,
    color: "bg-blue-500",
  },
  {
    title: "Questions",
    value: "0",
    icon: BookOpen,
    color: "bg-green-500",
  },
  {
    title: "Chapters",
    value: "0",
    icon: FolderOpen,
    color: "bg-purple-500",
  },
  {
    title: "Topics",
    value: "0",
    icon: ListTree,
    color: "bg-orange-500",
  },
  {
    title: "Tests",
    value: "0",
    icon: FileText,
    color: "bg-pink-500",
  },
  {
    title: "Premium Users",
    value: "0",
    icon: Crown,
    color: "bg-yellow-500",
  },
];

export default function Dashboard() {
  return (
    <AdminLayout title="Dashboard">

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{card.title}</p>

                  <h2 className="text-4xl font-bold mt-2 text-slate-800">
                    {card.value}
                  </h2>
                </div>

                <div
                  className={`${card.color} w-14 h-14 rounded-xl flex items-center justify-center`}
                >
                  <Icon className="text-white" size={28} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-3">
          Welcome to ErrorTrack Admin 🚀
        </h2>

        <p className="text-slate-600">
          From here you'll manage chapters, topics, questions, tests,
          subscriptions, and students.
        </p>
      </div>
    </AdminLayout>
  );
}