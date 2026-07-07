import { Pencil, Trash2 } from "lucide-react";

interface Subject {
  name: string;
}

export interface Chapter {
  id: number;
  name: string;
  display_order: number;
  is_active: boolean;
  subjects: Subject | null;
}

interface ChapterTableProps {
  chapters: Chapter[];
  loading: boolean;
  onEdit: (chapter: Chapter) => void;
  onDelete: (chapter: Chapter) => void;
}

export default function ChapterTable({
  chapters,
  loading,
  onEdit,
  onDelete,
}: ChapterTableProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
        Loading chapters...
      </div>
    );
  }

  if (chapters.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
        No chapters found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr className="text-left text-sm font-semibold text-slate-700">
            <th className="px-6 py-4">#</th>
            <th className="px-6 py-4">Subject</th>
            <th className="px-6 py-4">Chapter</th>
            <th className="px-6 py-4">Order</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {chapters.map((chapter, index) => (
            <tr
              key={chapter.id}
              className="border-t hover:bg-slate-50 transition"
            >
              <td className="px-6 py-4">{index + 1}</td>

              <td className="px-6 py-4">
                {chapter.subjects?.name ?? "-"}
              </td>

              <td className="px-6 py-4 font-medium">
                {chapter.name}
              </td>

              <td className="px-6 py-4">
                {chapter.display_order}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    chapter.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {chapter.is_active ? "Active" : "Inactive"}
                </span>
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => onEdit(chapter)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => onDelete(chapter)}
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