import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import TestSummary from "../components/test-builder/TestSummary";
import QuestionFilters from "../components/test-builder/QuestionFilters";
import QuestionList from "../components/test-builder/QuestionList";
import SelectedPanel from "../components/test-builder/SelectedPanel";
import TestAnalytics from "../components/test-builder/TestAnalytics";
import QuestionPreview from "../components/test-builder/QuestionPreview";

import AdminLayout from "../layouts/AdminLayout";
import {
  useTestQuestions,
  Question,
} from "../hooks/useTestQuestions";

export default function TestQuestions() {
  const { id } = useParams();

  const testId = Number(id);

 const {
  loading,
  test,
  questions,
  selectedQuestions,
  hasUnsavedChanges,

  toggleQuestion,
  removeQuestion,

  selectAll,
  clearAll,
  replaceSelection,

  saveQuestions,
} = useTestQuestions(testId);

  const [search, setSearch] = useState("");

  const [previewOpen, setPreviewOpen] =
  useState(false);

const [previewQuestion, setPreviewQuestion] =
  useState<Question | null>(null);

const [selectedSubject, setSelectedSubject] =
  useState("All");

const [selectedClass, setSelectedClass] =
  useState("All");

const [selectedDifficulty, setSelectedDifficulty] =
  useState("All");

const [selectedChapter, setSelectedChapter] = 
  useState("All");

const [selectedTopic, setSelectedTopic] = 
  useState("All");

useEffect(() => {
  const handleBeforeUnload = (
    event: BeforeUnloadEvent
  ) => {
    if (!hasUnsavedChanges) return;

    event.preventDefault();
    event.returnValue = "";
  };

  window.addEventListener(
    "beforeunload",
    handleBeforeUnload
  );

  return () => {
    window.removeEventListener(
      "beforeunload",
      handleBeforeUnload
    );
  };
}, [hasUnsavedChanges]);

const subjectOptions = [

  "All",
  ...new Set(
    questions.map(
      (question) =>
        question.topics.chapters.subjects.name
    )
  ),
];

const classOptions = [
  "All",
  ...new Set(
    questions.map((question) =>
      question.topics.chapters.class.toString()
    )
  ),
];

const chapterOptions = [
  "All",
  ...new Set(
    questions
      .filter(
        (q) =>
          selectedSubject === "All" ||
          q.topics.chapters.subjects.name === selectedSubject
      )
      .filter(
        (q) =>
          selectedClass === "All" ||
          q.topics.chapters.class.toString() === selectedClass
      )
      .map((q) => q.topics.chapters.name)
  ),
];

const topicOptions = [
  "All",
  ...new Set(
    questions
      .filter(
        (q) =>
          selectedSubject === "All" ||
          q.topics.chapters.subjects.name === selectedSubject
      )
      .filter(
        (q) =>
          selectedClass === "All" ||
          q.topics.chapters.class.toString() === selectedClass
      )
      .filter(
        (q) =>
          selectedChapter === "All" ||
          q.topics.chapters.name === selectedChapter
      )
      .map((q) => q.topics.name)
  ),
];

const difficultyOptions = [
  "All",
  ...new Set(
    questions.map(
      (question) => question.difficulty
    )
  ),
];

 const filteredQuestions = useMemo(() => {
  return questions.filter((question) => {
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

    const matchesDifficulty =
      selectedDifficulty === "All" ||
      question.difficulty === selectedDifficulty;

    return (
      matchesSearch &&
      matchesSubject &&
      matchesClass &&
      matchesChapter &&
      matchesTopic &&
      matchesDifficulty
    );
  });
}, [
  questions,
  search,
  selectedSubject,
  selectedClass,
  selectedChapter,
  selectedTopic,
  selectedDifficulty,
]);

const easyCount = selectedQuestions.filter((id) => {
  const q = questions.find((question) => question.id === id);
  return q?.difficulty === "Easy";
}).length;

const mediumCount = selectedQuestions.filter((id) => {
  const q = questions.find((question) => question.id === id);
  return q?.difficulty === "Medium";
}).length;

const hardCount = selectedQuestions.filter((id) => {
  const q = questions.find((question) => question.id === id);
  return q?.difficulty === "Hard";
}).length;

  return (
    <AdminLayout title="Question Builder">

      <div className="space-y-6">

        {/* Header */}

        <TestSummary
  test={test}
  totalQuestions={filteredQuestions.length}
  selectedQuestions={selectedQuestions.length}
/>

{hasUnsavedChanges && (
  <div className="rounded-xl border border-amber-300 bg-amber-50 px-5 py-4">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-semibold text-amber-900">
          Unsaved Changes
        </h3>

        <p className="text-sm text-amber-700">
          You have modified the selected questions.
          Click <strong>Save Questions</strong> to keep your changes.
        </p>
      </div>

      <span className="rounded-full bg-amber-200 px-3 py-1 text-xs font-semibold text-amber-900">
        Not Saved
      </span>
    </div>
  </div>
)}

<TestAnalytics
  total={filteredQuestions.length}
  selected={selectedQuestions.length}
  easy={easyCount}
  medium={mediumCount}
  hard={hardCount}
/>

        {/* Search */}

 <QuestionFilters
  search={search}
  setSearch={setSearch}

  selectedSubject={selectedSubject}
  setSelectedSubject={setSelectedSubject}

  selectedClass={selectedClass}
  setSelectedClass={setSelectedClass}

  selectedChapter={selectedChapter}
  setSelectedChapter={setSelectedChapter}

  selectedTopic={selectedTopic}
  setSelectedTopic={setSelectedTopic}

  selectedDifficulty={selectedDifficulty}
  setSelectedDifficulty={setSelectedDifficulty}

  subjectOptions={subjectOptions}
  classOptions={classOptions}
  chapterOptions={chapterOptions}
  topicOptions={topicOptions}
  difficultyOptions={difficultyOptions}
/>

<div className="flex flex-wrap gap-3">

  <button
    onClick={() =>
      selectAll(filteredQuestions.map((q) => q.id))
    }
    className="rounded-xl bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700"
  >
    Select Filtered
  </button>

  <button
    onClick={() =>
      replaceSelection(
        filteredQuestions.map((q) => q.id)
      )
    }
    className="rounded-xl bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-emerald-700"
  >
    Replace with Filtered
  </button>

  <button
    onClick={clearAll}
    className="rounded-xl bg-red-600 px-4 py-2 text-white font-medium hover:bg-red-700"
  >
    Clear All
  </button>

</div>

        {/* Question List */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

  <div className="xl:col-span-2">

   <QuestionList
  loading={loading}
  questions={filteredQuestions}
  selectedQuestions={selectedQuestions}
  toggleQuestion={toggleQuestion}
  onPreview={(question) => {
    setPreviewQuestion(question);
    setPreviewOpen(true);
  }}
/>

  </div>

 <SelectedPanel
  questions={questions}
  selectedQuestions={selectedQuestions}
  hasUnsavedChanges={hasUnsavedChanges}
  saveQuestions={saveQuestions}
  removeQuestion={removeQuestion}
  previewQuestion={(question) => {
    setPreviewQuestion(question);
    setPreviewOpen(true);
  }}
/>

</div> 

</div>

<QuestionPreview
  open={previewOpen}
  question={previewQuestion}
  onClose={() => {
    setPreviewOpen(false);
    setPreviewQuestion(null);
  }}
/>

    </AdminLayout>
  );
}