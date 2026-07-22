import { useEffect, useMemo, useState } from "react";
import { Chapter, Subject, Topic } from "../../hooks/useTopics";

interface TopicDialogProps {
  open: boolean;
  title: string;
  subjects: Subject[];
  chapters: Chapter[];
  initialData?: Topic | null;
  onClose: () => void;
  onSave: (topic: Topic) => void;
}

export default function TopicDialog({
  open,
  title,
  subjects,
  chapters,
  initialData,
  onClose,
  onSave,
}: TopicDialogProps) {
  const [subjectId, setSubjectId] = useState(0);
  const [selectedClass, setSelectedClass] = useState(11);
  const [chapterId, setChapterId] = useState(0);
  const [name, setName] = useState("");
  const [displayOrder, setDisplayOrder] = useState(1);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (initialData) {
      const chapter = chapters.find(
        (c) => c.id === initialData.chapter_id
      );

      setSubjectId(chapter?.subject_id ?? 0);
      setSelectedClass(chapter?.class ?? 11);
      setChapterId(initialData.chapter_id);
      setName(initialData.name);
      setDisplayOrder(initialData.display_order);
      setIsActive(initialData.is_active);
    } else {
      setSubjectId(subjects[0]?.id ?? 0);
      setSelectedClass(11);
      setChapterId(0);
      setName("");
      setDisplayOrder(1);
      setIsActive(true);
    }
  }, [initialData, chapters, subjects]);

  const filteredChapters = useMemo(() => {
  return chapters.filter((chapter) => {
    return (
      chapter.subject_id === subjectId &&
      chapter.class === selectedClass
    );
  });
}, [
  chapters,
  subjectId,
  selectedClass,
]);

const hasChapters = filteredChapters.length > 0;

  useEffect(() => {
    if (
      filteredChapters.length > 0 &&
      !filteredChapters.some(c => c.id === chapterId)
    ) {
      setChapterId(filteredChapters[0].id);
    }
  }, [filteredChapters, chapterId]);

  if (!open) return null;

  function handleSave() {
  const topicName = name.trim();

if (!topicName) {
  alert("Please enter topic name.");
  return;
}

if (chapterId <= 0) {
  alert("Please select a chapter.");
  return;
}

    onSave({
      id: initialData?.id,
      chapter_id: chapterId,
      name: topicName,
      display_order: displayOrder,
      is_active: isActive,
    });
  }

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
              onChange={(e) => setSubjectId(Number(e.target.value))}
              className="w-full border rounded-xl px-4 py-3"
            >
              {subjects.map(subject => (
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
    className="w-full border rounded-xl px-4 py-3"
  >
    <option value={11}>Class 11</option>
    <option value={12}>Class 12</option>
  </select>
</div>

          <div>
            <label className="block mb-2 font-medium">
              Chapter
            </label>

           {hasChapters ? (
  <select
    value={chapterId}
    onChange={(e) => setChapterId(Number(e.target.value))}
    className="w-full border rounded-xl px-4 py-3"
  >
    {filteredChapters.map((chapter) => (
      <option
        key={chapter.id}
        value={chapter.id}
      >
        {chapter.name}
      </option>
    ))}
  </select>
) : (
  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-700">
    No chapters available for the selected Subject and Class.
    <br />
    Please create a chapter first.
  </div>
)}
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Topic Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setDisplayOrder(parseFloat(e.target.value))}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
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
  disabled={!hasChapters}
  className={`px-5 py-2 rounded-xl text-white transition ${
    hasChapters
      ? "bg-teal-500 hover:bg-teal-600"
      : "bg-slate-300 cursor-not-allowed"
  }`}
>
            Save
          </button>
        </div>

      </div>
    </div>
  );
}