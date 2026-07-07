import { useEffect, useState } from "react";

interface Subject {
  id: number;
  name: string;
}

interface Chapter {
  id?: number;
  name: string;
  subject_id: number;
  display_order: number;
  is_active: boolean;
}

interface ChapterDialogProps {
  open: boolean;
  title: string;
  subjects: Subject[];
  initialData?: Chapter | null;
  onClose: () => void;
  onSave: (chapter: Chapter) => void;
}

export default function ChapterDialog({
  open,
  title,
  subjects,
  initialData,
  onClose,
  onSave,
}: ChapterDialogProps) {
  const [subjectId, setSubjectId] = useState(0);
  const [chapterName, setChapterName] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (initialData) {
      setSubjectId(initialData.subject_id);
      setChapterName(initialData.name);
      setDisplayOrder(initialData.display_order);
      setIsActive(initialData.is_active);
    } else {
      setSubjectId(subjects[0]?.id ?? 0);
      setChapterName("");
      setDisplayOrder(0);
      setIsActive(true);
    }
  }, [initialData, subjects]);

  if (!open) return null;

  const handleSave = () => {
    if (!chapterName.trim()) {
      alert("Please enter chapter name.");
      return;
    }

    onSave({
      id: initialData?.id,
      subject_id: subjectId,
      name: chapterName.trim(),
      display_order: displayOrder,
      is_active: isActive,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl">

        <h2 className="text-2xl font-bold mb-6">
          {title}
        </h2>

        <div className="space-y-4">

          <div>
            <label className="block mb-2 font-medium">
              Subject
            </label>

            <select
              value={subjectId}
              onChange={(e) =>
                setSubjectId(Number(e.target.value))
              }
              className="w-full border rounded-xl px-4 py-3"
            >
              {subjects.map((subject) => (
                <option
                  key={subject.id}
                  value={subject.id}
                >
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Chapter Name
            </label>

            <input
              value={chapterName}
              onChange={(e) =>
                setChapterName(e.target.value)
              }
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Display Order
            </label>

            <input
              type="number"
              value={displayOrder}
              onChange={(e) =>
                setDisplayOrder(Number(e.target.value))
              }
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) =>
                setIsActive(e.target.checked)
              }
            />

            Active
          </label>

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl border"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-teal-500 text-white hover:bg-teal-600"
          >
            Save
          </button>

        </div>
      </div>
    </div>
  );
}