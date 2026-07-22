import { Pencil, Trash2, BookOpen, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Test } from "../../hooks/useTests";

interface TestTableProps {
  tests: Test[];
  loading: boolean;

  onEdit: (test: Test) => void;
  onDelete: (test: Test) => void;
}

export default function TestTable({
  tests,
  loading,
  onEdit,
  onDelete,
}: TestTableProps) {

    const navigate = useNavigate();
    
  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
        Loading tests...
      </div>
    );
  }

  if (tests.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500">
        No tests found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <table className="w-full">

  <thead className="bg-slate-50">

    <tr className="text-left text-sm font-semibold text-slate-700">

      <th className="px-6 py-4">#</th>

      <th className="px-6 py-4">
        Test Name
      </th>

      <th className="px-6 py-4">
        Subject
      </th>

      <th className="px-6 py-4">
        Class
      </th>

      <th className="px-6 py-4">
        Duration
      </th>

      <th className="px-6 py-4">
        Status
      </th>

      <th className="px-6 py-4 text-center">
        Actions
      </th>

    </tr>

  </thead>

  <tbody>

  {tests.map((test, index) => (

    <tr
      key={test.id}
      className="border-t hover:bg-slate-50 transition"
    >

      <td className="px-6 py-4">
        {index + 1}
      </td>

      <td className="px-6 py-4 font-medium">
        {test.name}
      </td>

      <td className="px-6 py-4">
        {test.subjects?.name ?? "-"}
      </td>

      <td className="px-6 py-4">
        Class {test.class}
      </td>

      <td className="px-6 py-4">
        {test.duration_minutes} min
      </td>

      <td className="px-6 py-4">

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            test.is_active
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {test.is_active
            ? "Active"
            : "Inactive"}
        </span>

      </td>

      <td className="px-6 py-4">

        <div className="flex justify-center gap-3">

          <button
            onClick={() => onEdit(test)}
            className="text-blue-600 hover:text-blue-800"
            title="Edit Test"
          >
            <Pencil size={18} />
          </button>

          <button
  onClick={() =>
    navigate(`/admin/tests/${test.id}/questions`)
  }
  className="text-purple-600 hover:text-purple-800"
  title="Manage Questions"
>
  <BookOpen size={18} />
</button>

          <button
            className="text-emerald-600 hover:text-emerald-800"
            title="Preview Test"
          >
            <Eye size={18} />
          </button>

          <button
            onClick={() => onDelete(test)}
            className="text-red-600 hover:text-red-800"
            title="Delete Test"
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
