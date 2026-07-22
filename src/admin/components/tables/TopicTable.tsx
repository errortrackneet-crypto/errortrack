import { Pencil, Trash2 } from "lucide-react";
import { Topic } from "../../hooks/useTopics";

interface TopicTableProps {
  topics: Topic[];
  loading: boolean;
  onEdit: (topic: Topic) => void;
  onDelete: (topic: Topic) => void;
}

export default function TopicTable({
  topics,
  loading,
  onEdit,
  onDelete,
}: TopicTableProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
        Loading topics...
      </div>
    );
  }

  if (topics.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
        No topics found.
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
            <th className="px-6 py-4">Class</th>
            <th className="px-6 py-4">Chapter</th>
            <th className="px-6 py-4">Topic</th>
            <th className="px-6 py-4">Order</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {topics.map((topic, index) => (
            <tr
              key={topic.id}
              className="border-t hover:bg-slate-50 transition"
            >
              <td className="px-6 py-4">{index + 1}</td>

             <td className="px-6 py-4">
  {topic.chapters?.subjects?.name ?? "-"}
</td>

<td className="px-6 py-4">
  {topic.chapters?.class
    ? `Class ${topic.chapters.class}`
    : "-"}
</td>

<td className="px-6 py-4">
  {topic.chapters?.name ?? "-"}
</td>

              <td className="px-6 py-4 font-semibold text-slate-900">
                {topic.name}
              </td>

              <td className="px-6 py-4">
  <span className="inline-flex min-w-10 justify-center rounded-lg bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
    {topic.display_order}
  </span>
</td>

              <td className="px-6 py-4">
                <span
  className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${
    topic.is_active
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700"
  }`}
>
  {topic.is_active ? "Active" : "Inactive"}
</span>
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-center gap-3">
                  <button
  onClick={() => onEdit(topic)}
  title="Edit Topic"
  className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
>
  <Pencil size={18} />
</button>

<button
  onClick={() => onDelete(topic)}
  title="Delete Topic"
  className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
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