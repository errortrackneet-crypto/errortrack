import { useEffect, useState } from "react";

interface Subject {
  id: number;
  name: string;
}

interface Chapter {
  id?: number;
  name: string;
  subject_id: number;
  class: number;
  display_order: number;
  is_active: boolean;
}

interface ChapterDialogProps {
  open: boolean;
  title: string;
  subjects: Subject[];
  initialData?: Chapter | null;
  onClose: () => void;
  onSave: (chapter: Chapter) => Promise<void>;
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
  const [selectedClass, setSelectedClass] = useState(11);

  const [chapterName, setChapterName] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setSubjectId(initialData.subject_id);
      setSelectedClass(initialData.class);
      setChapterName(initialData.name);
      setDisplayOrder(initialData.display_order);
      setIsActive(initialData.is_active);
    } else {
      setSubjectId(subjects[0]?.id ?? 0);
      setSelectedClass(11);
      setChapterName("");
      setDisplayOrder(0);
      setIsActive(true);
    }
  }, [initialData, subjects]);

  if (!open) return null;

  const handleSave = async () => {
    if (!chapterName.trim()) {
      alert("Please enter chapter name.");
      return;
    }
    if (subjectId === 0) {
  alert("Please select a subject.");
  return;
}

if (displayOrder < 1) {
  alert("Display order must be at least 1.");
  return;
}
    setIsSaving(true);

await onSave({
      id: initialData?.id,
      subject_id: subjectId,
      class: selectedClass,
      name: chapterName.trim(),
      display_order: displayOrder,
      is_active: isActive,
    });
    setIsSaving(false);
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
    Class
  </label>

  <select
    value={selectedClass}
    onChange={(e) =>
      setSelectedClass(Number(e.target.value))
    }
    className="w-full rounded-xl border px-4 py-3"
  >
    <option value={11}>Class 11</option>
    <option value={12}>Class 12</option>
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
  maxLength={100}
  placeholder="Enter chapter name"
  className="w-full border rounded-xl px-4 py-3"
/>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Display Order
            </label>

            <input
  type="number"
  min={1}
  value={displayOrder}
  onChange={(e) =>
    setDisplayOrder(
      Math.max(1, Number(e.target.value))
    )
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
  disabled={isSaving}
  className={`px-5 py-2 rounded-xl text-white transition ${
    isSaving
      ? "bg-slate-400 cursor-not-allowed"
      : "bg-teal-500 hover:bg-teal-600"
  }`}
>
  {isSaving
    ? "Saving..."
    : initialData
      ? "Update Chapter"
      : "Save Chapter"}
</button>

        </div>
      </div>
    </div>
  );
}