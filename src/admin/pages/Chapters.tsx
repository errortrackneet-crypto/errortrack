import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";

import AdminLayout from "../layouts/AdminLayout";
import ChapterTable from "../components/tables/ChapterTable";
import ChapterDialog from "../components/dialogs/ChapterDialog";

import { useChapters, Chapter } from "../hooks/useChapters";

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

  const [dialogOpen, setDialogOpen] = useState(false);

  const [selectedChapter, setSelectedChapter] =
    useState<Chapter | null>(null);

  const filteredChapters = useMemo(() => {
    if (!search.trim()) return chapters;

    return chapters.filter((chapter) =>
      chapter.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [chapters, search]);

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
    }
  }

  return (
    <AdminLayout title="Chapter Manager">
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search chapter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 outline-none focus:border-teal-500"
          />
        </div>

        <button
          onClick={() => {
            setSelectedChapter(null);
            setDialogOpen(true);
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-teal-500 px-5 py-3 text-white font-semibold hover:bg-teal-600"
        >
          <Plus size={18} />
          Add Chapter
        </button>
      </div>

      <ChapterTable
        chapters={filteredChapters}
        loading={loading}
        onEdit={(chapter) => {
          setSelectedChapter(chapter);
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
        title={
          selectedChapter
            ? "Edit Chapter"
            : "Add Chapter"
        }
        subjects={subjects}
        initialData={selectedChapter}
        onClose={() => {
          setDialogOpen(false);
          setSelectedChapter(null);
        }}
        onSave={handleSave}
      />
    </AdminLayout>
  );
}