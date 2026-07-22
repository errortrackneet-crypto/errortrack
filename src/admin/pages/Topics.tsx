import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";

import AdminLayout from "../layouts/AdminLayout";
import TopicTable from "../components/tables/TopicTable";
import TopicDialog from "../components/dialogs/TopicDialog";
import ConfirmDialog from "../components/dialogs/ConfirmDialog";

import { useTopics, Topic } from "../hooks/useTopics";

export default function Topics() {
  const {
    loading,
    subjects,
    chapters,
    topics,
    addTopic,
    updateTopic,
    deleteTopic,
  } = useTopics();

  const [search, setSearch] = useState("");

  const [selectedSubject, setSelectedSubject] =
    useState("All");

  const [selectedClass, setSelectedClass] =
    useState("All");

  const [selectedChapter, setSelectedChapter] =
    useState("All");

  const [dialogOpen, setDialogOpen] =
    useState(false);

  const [confirmOpen, setConfirmOpen] = 
    useState(false);

  const [topicToDelete, setTopicToDelete] = 
    useState<Topic | null>(null);

  const [selectedTopic, setSelectedTopic] =
    useState<Topic | null>(null);

  const subjectOptions = useMemo(
    () => [
      "All",
      ...subjects.map((subject) => subject.name),
    ],
    [subjects]
  );

  const classOptions = useMemo(
    () => ["All", "11", "12"],
    []
  );

  const chapterOptions = useMemo(() => {
    return [
      "All",
      ...new Set(
        chapters
          .filter((chapter) => {

            const subjectName =
              subjects.find(
                (subject) =>
                  subject.id === chapter.subject_id
              )?.name;

            const matchesSubject =
              selectedSubject === "All" ||
              subjectName === selectedSubject;

            const matchesClass =
              selectedClass === "All" ||
              chapter.class.toString() ===
                selectedClass;

            return (
              matchesSubject &&
              matchesClass
            );

          })
          .map((chapter) => chapter.name)
      ),
    ];
  }, [
    chapters,
    subjects,
    selectedSubject,
    selectedClass,
  ]);

  const filteredTopics = useMemo(() => {

    return topics.filter((topic) => {

      const searchText = search.toLowerCase();

const matchesSearch =
  topic.name.toLowerCase().includes(searchText) ||
  topic.chapters?.name?.toLowerCase().includes(searchText) ||
  topic.chapters?.subjects?.name
    ?.toLowerCase()
    .includes(searchText);

      const matchesSubject =
        selectedSubject === "All" ||
        topic.chapters?.subjects?.name ===
          selectedSubject;

      const matchesClass =
        selectedClass === "All" ||
        topic.chapters?.class
          ?.toString() === selectedClass;

      const matchesChapter =
        selectedChapter === "All" ||
        topic.chapters?.name ===
          selectedChapter;

      return (
        matchesSearch &&
        matchesSubject &&
        matchesClass &&
        matchesChapter
      );

    });

  }, [
    topics,
    search,
    selectedSubject,
    selectedClass,
    selectedChapter,
  ]);

    async function handleSave(topic: Topic) {
    let success = false;

    if (topic.id) {
      success = await updateTopic(topic);
    } else {
      success = await addTopic(topic);
    }

    if (success) {
      setDialogOpen(false);
      setSelectedTopic(null);
    }
  }

async function handleDelete() {
  if (!topicToDelete?.id) return;

  const success = await deleteTopic(topicToDelete.id);

  console.log("Delete success:", success);


  if (success) {
    setConfirmOpen(false);
    setTopicToDelete(null);
  }
}

  return (
    <AdminLayout title="Topic Manager">

      <div className="space-y-6">

        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

          {/* Filters */}

          <div className="flex flex-1 flex-col md:flex-row gap-4">

            {/* Search */}

            <div className="relative flex-1">

              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search topics..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 outline-none focus:border-teal-500"
              />

            </div>

            {/* Subject */}

            <select
              value={selectedSubject}
              onChange={(e) => {
  setSelectedSubject(e.target.value);
  setSelectedChapter("All");
}}
              className="h-12 w-full md:w-52 rounded-xl border border-slate-300 bg-white px-4"
            >
              {subjectOptions.map((subject) => (
                <option
                  key={subject}
                  value={subject}
                >
                  {subject}
                </option>
              ))}
            </select>

            {/* Class */}

            <select
              value={selectedClass}
              onChange={(e) => {
  setSelectedClass(e.target.value);
  setSelectedChapter("All");
}}
              className="h-12 w-full md:w-40 rounded-xl border border-slate-300 bg-white px-4"
            >
              {classOptions.map((cls) => (
                <option
                  key={cls}
                  value={cls}
                >
                  {cls === "All"
                    ? "All Classes"
                    : `Class ${cls}`}
                </option>
              ))}
            </select>

            {/* Chapter */}

            <select
              value={selectedChapter}
              onChange={(e) =>
                setSelectedChapter(e.target.value)
              }
              className="h-12 w-full md:w-60 rounded-xl border border-slate-300 bg-white px-4"
            >
              {chapterOptions.map((chapter) => (
                <option
                  key={chapter}
                  value={chapter}
                >
                  {chapter === "All"
                    ? "All Chapters"
                    : chapter}
                </option>
              ))}
            </select>

          </div>

          {/* Add Button */}

          <button
            onClick={() => {
              setSelectedTopic(null);
              setDialogOpen(true);
            }}
            className="h-12 rounded-xl bg-teal-500 px-6 text-white font-semibold hover:bg-teal-600 transition flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Topic
          </button>

        </div>

              <TopicTable
        topics={filteredTopics}
        loading={loading}
        onEdit={(topic) => {
          setSelectedTopic(topic);
          setDialogOpen(true);
        }}
       onDelete={(topic) => {
  setTopicToDelete(topic);
  setConfirmOpen(true);
}}
      />

      <TopicDialog
        open={dialogOpen}
        title={
          selectedTopic
            ? "Edit Topic"
            : "Add Topic"
        }
        subjects={subjects}
        chapters={chapters}
        initialData={selectedTopic}
        onClose={() => {
          setDialogOpen(false);
          setSelectedTopic(null);
        }}
        onSave={handleSave}
      />


    <ConfirmDialog
  open={confirmOpen}
  title="Delete Topic"
  description={`Are you sure you want to delete "${topicToDelete?.name}"? This action cannot be undone.`}
  confirmText="Delete"
  cancelText="Cancel"
  variant="danger"
  onConfirm={handleDelete}
  onCancel={() => {
    setConfirmOpen(false);
    setTopicToDelete(null);
  }}
/>

      </div>

    </AdminLayout>
  );
}
