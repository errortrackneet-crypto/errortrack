import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { useQuestions } from "../hooks/useQuestions";
import { useQuestionEditor } from "../hooks/useQuestionEditor";
import { supabase } from "../../lib/supabase";
import QuestionCard from "../components/question-editor/QuestionCard";
import OptionsCard from "../components/question-editor/OptionsCard";
import ExplanationCard from "../components/question-editor/ExplanationCard";
import AcademicInfoCard from "../components/question-editor/AcademicInfoCard";
import ActionBar from "../components/question-editor/ActionBar";

export default function QuestionEditor() {
  const { id } = useParams();

  const isEditing = Boolean(id);

  const {
    subjects,
    chapters,
    topics,
  } = useQuestions();

  const {
    subjectId,
    setSubjectId,
    selectedClass,
    setSelectedClass,
    chapterId,
    setChapterId,
    topicId,
    setTopicId,
    filteredChapters,
    filteredTopics,
  } = useQuestionEditor(
    subjects,
    chapters,
    topics
  );

  const [question, setQuestion] = useState("");

  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");

  const [correctAnswer, setCorrectAnswer] =
    useState("A");

  const [explanation, setExplanation] =
    useState("");

  const [difficulty, setDifficulty] =
    useState("Easy");

  const [isActive, setIsActive] =
    useState(true);

  const [isSaving, setIsSaving] =
    useState(false);

  const [saveMessage, setSaveMessage] =
    useState("");

  const [saveStatus, setSaveStatus] =
    useState<"success" | "error" | "">("");

  useEffect(() => {
    if (isEditing) {
      loadQuestion();
    }
  }, [id]);

  async function loadQuestion() {
  const { data, error } = await supabase
    .from("questions")
    .select(`
      *,
      topics (
        id,
        name,
        chapter_id,
        chapters (
          id,
          class,
          subject_id
        )
      )
    `)
    .eq("id", id)
    .single();

  if (error || !data) {
    toast.error("Failed to load question.");
    return;
  }

  setQuestion(data.question);

  setOptionA(data.option_a);
  setOptionB(data.option_b);
  setOptionC(data.option_c);
  setOptionD(data.option_d);

  setCorrectAnswer(data.correct_option);

  setExplanation(data.explanation);

  setDifficulty(data.difficulty);

  setIsActive(data.is_active);

  setSubjectId(data.topics.chapters.subject_id);

  setSelectedClass(
    data.topics.chapters.class.toString()
  );

  setChapterId(data.topics.chapter_id);

  setTopicId(data.topic_id);
}
  async function handleSave() {
  setIsSaving(true);

  function validationError(message: string) {
    setSaveStatus("error");
    setSaveMessage(message);

    setIsSaving(false);

    setTimeout(() => {
      setSaveMessage("");
      setSaveStatus("");
    }, 3000);
  }

  if (!question.trim()) return validationError("Please enter a question.");
  if (!optionA.trim()) return validationError("Please enter Option A.");
  if (!optionB.trim()) return validationError("Please enter Option B.");
  if (!optionC.trim()) return validationError("Please enter Option C.");
  if (!optionD.trim()) return validationError("Please enter Option D.");
  if (topicId === 0) return validationError("Please select a topic.");

  let error;

  if (isEditing) {
    const result = await supabase
      .from("questions")
      .update({
        topic_id: topicId,
        question,
        option_a: optionA,
        option_b: optionB,
        option_c: optionC,
        option_d: optionD,
        correct_option: correctAnswer,
        explanation,
        difficulty,
        is_active: isActive,
      })
      .eq("id", id);

    error = result.error;
  } else {
    const result = await supabase
      .from("questions")
      .insert({
        topic_id: topicId,
        question,
        option_a: optionA,
        option_b: optionB,
        option_c: optionC,
        option_d: optionD,
        correct_option: correctAnswer,
        explanation,
        difficulty,
        marks: 4,
        negative_marks: 1,
        is_active: isActive,
      });

    error = result.error;
  }

  if (error) {
    validationError(
      isEditing
        ? "Failed to update question."
        : "Failed to save question."
    );
    return;
  }

  setSaveStatus("success");
  setSaveMessage(
    isEditing
      ? "Question updated successfully!"
      : "Question saved successfully!"
  );

  if (!isEditing) {
    setQuestion("");
    setOptionA("");
    setOptionB("");
    setOptionC("");
    setOptionD("");
    setCorrectAnswer("A");
    setExplanation("");
    setDifficulty("Easy");
    setIsActive(true);
  }

  setIsSaving(false);

  setTimeout(() => {
    setSaveMessage("");
    setSaveStatus("");
  }, 3000);
}
  return (
    <AdminLayout title="Question Editor">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            {isEditing ? "Edit Question" : "Add Question"}
          </h1>

          <p className="text-slate-500 mt-1">
            {isEditing
  ? "Update an existing question."
  : "Create and manage NEET questions."}
          </p>
        </div>

        {/* Main Grid */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* LEFT */}

          <div className="xl:col-span-2 space-y-6">

            <QuestionCard
               question={question}
               setQuestion={setQuestion}
       />

            <OptionsCard
  optionA={optionA}
  setOptionA={setOptionA}

  optionB={optionB}
  setOptionB={setOptionB}

  optionC={optionC}
  setOptionC={setOptionC}

  optionD={optionD}
  setOptionD={setOptionD}

  correctAnswer={correctAnswer}
  setCorrectAnswer={setCorrectAnswer}
/>

 <ExplanationCard
  explanation={explanation}
  setExplanation={setExplanation}
/>

</div> {/* CLOSE LEFT COLUMN */}

{/* RIGHT */}

<div>

  <AcademicInfoCard
    subjects={subjects}

    subjectId={subjectId}
    setSubjectId={setSubjectId}

    selectedClass={selectedClass}
    setSelectedClass={setSelectedClass}

    chapterId={chapterId}
    setChapterId={setChapterId}

    topicId={topicId}
    setTopicId={setTopicId}

    filteredChapters={filteredChapters}
    filteredTopics={filteredTopics}

    difficulty={difficulty}
    setDifficulty={setDifficulty}

    isActive={isActive}
    setIsActive={setIsActive}
  />

</div>
        </div>

        {saveMessage && (
  <div
    className={`mb-4 rounded-xl border px-4 py-3 font-medium ${
      saveStatus === "success"
        ? "border-green-300 bg-green-50 text-green-700"
        : "border-red-300 bg-red-50 text-red-700"
    }`}
  >
    {saveMessage}
  </div>
)}

<ActionBar
  onSave={handleSave}
  isSaving={isSaving}
  isEditing={isEditing}
/>
      </div>
    </AdminLayout>
);
}