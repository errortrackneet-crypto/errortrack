import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { toast } from "sonner";

import AdminLayout from "../layouts/AdminLayout";
import ChapterTable from "../components/tables/ChapterTable";
import ChapterDialog from "../components/dialogs/ChapterDialog";

import { useChapters, Chapter } from "../hooks/useChapters";
import { Chapter as TableChapter } from "../components/tables/ChapterTable";

export default function Chapters() {
  const {
    chapters,
    subjects,
    loading,
    addChapter,
    updateChapter,
    deleteChapter,
  } = useChapters();

  const [search, setSearch] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedClass, setSelectedClass] = useState("All");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] =
    useState<Chapter | null>(null);

  const subjectOptions = useMemo(
    () => ["All", ...subjects.map((subject) => subject.name)],
    [subjects]
  );

  const classOptions = useMemo(() => ["All", "11", "12"], []);

  const filteredChapters = useMemo(
    () =>
      chapters
        .filter(
          (chapter): chapter is Chapter & { id: number } => {
            if (chapter.id === undefined) return false;

            const matchesSearch = chapter.name
              .toLowerCase()
              .includes(search.toLowerCase());

            const matchesSubject =
              selectedSubject === "All" ||
              chapter.subjects?.name === selectedSubject;

            const matchesClass =
              selectedClass === "All" ||
              chapter.class.toString() === selectedClass;

            return (
              matchesSearch &&
              matchesSubject &&
              matchesClass
            );
          }
        )
        .map((chapter) => ({
          ...chapter,
          id: chapter.id as number,
          subjects: chapter.subjects || null,
        })) as TableChapter[],
    [chapters, search, selectedSubject, selectedClass]
  );

  async function handleSave(chapter: Chapter) {
    let success = false;

    if (chapter.id) {
      success = await updateChapter(chapter);
    } else {
      success = await addChapter(chapter);
    }

    if (success) {
      setDialogOpen(false);
      setSelectedChapter(null);

      toast.success(
        chapter.id
          ? "Chapter updated successfully!"
          : "Chapter added successfully!"
      );
    }
  }

  return (
    <AdminLayout title="Chapter Manager">
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-1 flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search chapters..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 outline-none focus:border-teal-500"
              />
            </div>

            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="h-12 w-full md:w-56 rounded-xl border border-slate-300 bg-white px-4"
            >
              {subjectOptions.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>

            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="h-12 w-full md:w-44 rounded-xl border border-slate-300 bg-white px-4"
            >
              {classOptions.map((cls) => (
                <option key={cls} value={cls}>
                  {cls === "All" ? "All Classes" : `Class ${cls}`}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => {
              setSelectedChapter(null);
              setDialogOpen(true);
            }}
            className="h-12 rounded-xl bg-teal-500 px-6 text-white font-semibold hover:bg-teal-600 transition flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Chapter
          </button>
        </div>

        <ChapterTable
          chapters={filteredChapters}
          loading={loading}
          onEdit={(chapter) => {
            setSelectedChapter(chapter as Chapter);
            setDialogOpen(true);
          }}
          onDelete={(chapter) => {
            if (chapter.id) {
              deleteChapter(chapter.id);
            }
          }}
        />

        <ChapterDialog
          open={dialogOpen}
          title={selectedChapter ? "Edit Chapter" : "Add Chapter"}
          subjects={subjects}
          initialData={selectedChapter}
          onClose={() => {
            setDialogOpen(false);
            setSelectedChapter(null);
          }}
          onSave={handleSave}
        />
      </div>
    </AdminLayout>
  );
}