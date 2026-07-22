import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { supabase } from "../../lib/supabase";
import AdminLayout from "../layouts/AdminLayout";
import { useQuestionList } from "../hooks/useQuestionList";
import QuestionsTable from "../components/questions/QuestionsTable";

export default function Questions() {
  const navigate = useNavigate();
const {
  questions,
  loading,
  reload,
} = useQuestionList();

const [search, setSearch] = useState("");

const [selectedSubject, setSelectedSubject] = useState("All");

const [selectedClass, setSelectedClass] = useState("All");

const subjects = [
  "All",
  ...new Set(
    questions.map(
      (question) =>
        question.topics.chapters.subjects.name
    )
  ),
];
const classes = [
  "All",
  ...new Set(
    questions
      .filter(
        (question) =>
          selectedSubject === "All" ||
          question.topics.chapters.subjects.name === selectedSubject
      )
      .map((question) =>
        question.topics.chapters.class.toString()
      )
  ),
];
const [selectedChapter, setSelectedChapter] = useState("All");

const chapters = [
  "All",
  ...new Set(
    questions
      .filter((question) => {
        const matchesSubject =
          selectedSubject === "All" ||
          question.topics.chapters.subjects.name === selectedSubject;

        const matchesClass =
          selectedClass === "All" ||
          question.topics.chapters.class.toString() === selectedClass;

        return matchesSubject && matchesClass;
      })
      .map((question) => question.topics.chapters.name)
  ),
];
const [selectedTopic, setSelectedTopic] = useState("All");
const [message, setMessage] = useState("");

const [messageType, setMessageType] =
  useState<"success" | "error" | "">("");

const topics = [
  "All",
  ...new Set(
    questions
      .filter((question) => {
        const matchesSubject =
          selectedSubject === "All" ||
          question.topics.chapters.subjects.name === selectedSubject;

        const matchesClass =
          selectedClass === "All" ||
          question.topics.chapters.class.toString() === selectedClass;

        const matchesChapter =
          selectedChapter === "All" ||
          question.topics.chapters.name === selectedChapter;

        return (
          matchesSubject &&
          matchesClass &&
          matchesChapter
        );
      })
      .map((question) => question.topics.name)
  ),
];

const filteredQuestions = questions.filter((question) => {

  const matchesSearch =
    question.question
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesSubject =
    selectedSubject === "All" ||
    question.topics.chapters.subjects.name === selectedSubject;

  const matchesClass =
    selectedClass === "All" ||
    question.topics.chapters.class.toString() === selectedClass;

  const matchesChapter =
    selectedChapter === "All" ||
    question.topics.chapters.name === selectedChapter;

  const matchesTopic =
    selectedTopic === "All" ||
    question.topics.name === selectedTopic;

  return (
    matchesSearch &&
    matchesSubject &&
    matchesClass &&
    matchesChapter &&
    matchesTopic
  );

});
async function handleDelete(id: number) {
  const confirmed = window.confirm(
    "Are you sure you want to delete this question?"
  );

  if (!confirmed) return;

  const { error } = await supabase
    .from("questions")
    .delete()
    .eq("id", id);

 if (error) {
  alert(error.message);
  return;
}
  await reload();

  setMessageType("success");
  setMessage("Question deleted successfully.");

  setTimeout(() => {
    setMessage("");
    setMessageType("");
  }, 3000);
}
  return (
    <AdminLayout title="Questions">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

  <div>

    <h1 className="text-3xl font-bold text-slate-800">
      Question Bank
    </h1>

    <p className="text-slate-500 mt-1">
      View, search and manage all questions.
    </p>

  </div>

  <button
    onClick={() => navigate("/admin/questions/new")}
    className="h-12 rounded-xl bg-teal-500 px-6 text-white font-semibold hover:bg-teal-600 transition flex items-center justify-center gap-2"
  >
    <Plus size={18} />
    Add Question
  </button>

</div>

{/* Filters */}

<div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">

  <input
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search questions..."
    className="rounded-xl border border-slate-300 px-4 py-3"
  />

  <select
    value={selectedSubject}
    onChange={(e) => setSelectedSubject(e.target.value)}
    className="rounded-xl border border-slate-300 px-4 py-3"
  >

    {subjects.map((subject) => (

      <option
        key={subject}
        value={subject}
      >
        {subject}
      </option>

    ))}

  </select>
  <select
  value={selectedClass}
  onChange={(e) => setSelectedClass(e.target.value)}
  className="rounded-xl border border-slate-300 px-4 py-3"
>
  {classes.map((className) => (
    <option
      key={className}
      value={className}
    >
      {className === "All"
        ? "All Classes"
        : `Class ${className}`}
    </option>
  ))}
</select>
<select
  value={selectedChapter}
  onChange={(e) => setSelectedChapter(e.target.value)}
  className="rounded-xl border border-slate-300 px-4 py-3"
>
  {chapters.map((chapter) => (
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
<select
  value={selectedTopic}
  onChange={(e) => setSelectedTopic(e.target.value)}
  className="rounded-xl border border-slate-300 px-4 py-3"
>
  {topics.map((topic) => (
    <option
      key={topic}
      value={topic}
    >
      {topic === "All"
        ? "All Topics"
        : topic}
    </option>
  ))}
</select>

</div>

{/* Success / Error Message */}

{message && (
  <div
    className={`mb-4 rounded-xl border px-4 py-3 font-medium ${
      messageType === "success"
        ? "border-green-300 bg-green-50 text-green-700"
        : "border-red-300 bg-red-50 text-red-700"
    }`}
  >
    {message}
  </div>
)}

{/* Questions Table */}

<QuestionsTable
  loading={loading}
  questions={filteredQuestions}
  onDelete={handleDelete}
/>

</div>

    </AdminLayout>
  );
}