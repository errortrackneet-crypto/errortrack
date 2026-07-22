import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import { useTests } from "../hooks/useTests";

export default function TestEditor() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const {
    subjects,
    chapters,
    topics,
    tests,
    addTest,
    updateTest,
  } = useTests();

  const [loading, setLoading] =
    useState(false);

  const [subjectId, setSubjectId] =
    useState(0);

  const [selectedClass, setSelectedClass] =
    useState(11);

  const [chapterId, setChapterId] =
    useState<number | null>(null);

  const [topicId, setTopicId] =
    useState<number | null>(null);

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [duration, setDuration] =
    useState(180);

  const [positiveMarks, setPositiveMarks] =
    useState(4);

  const [negativeMarks, setNegativeMarks] =
    useState(1);

  const [shuffleQuestions, setShuffleQuestions] =
    useState(true);

  const [shuffleOptions, setShuffleOptions] =
    useState(true);

  const [showResult, setShowResult] =
    useState(true);

  const [showAnswers, setShowAnswers] =
    useState(false);

  const [showExplanations, setShowExplanations] =
    useState(false);

  const [allowReview, setAllowReview] =
    useState(true);

  const [allowRetest, setAllowRetest] =
    useState(false);

  const [isActive, setIsActive] =
    useState(true);

      useEffect(() => {
    if (!isEdit) {
      setSubjectId(subjects[0]?.id ?? 0);
      return;
    }

    const test = tests.find(
      (t) => t.id === Number(id)
    );

    if (!test) return;

    setSubjectId(test.subject_id);
    setSelectedClass(test.class);

    setChapterId(test.chapter_id);
    setTopicId(test.topic_id);

    setName(test.name);
    setDescription(test.description ?? "");

    setDuration(test.duration_minutes);

    setPositiveMarks(test.positive_marks);
    setNegativeMarks(test.negative_marks);

    setShuffleQuestions(
      test.shuffle_questions
    );

    setShuffleOptions(
      test.shuffle_options
    );

    setShowResult(test.show_result);

    setShowAnswers(test.show_answers);

    setShowExplanations(
      test.show_explanations
    );

    setAllowReview(test.allow_review);

    setAllowRetest(test.allow_retest);

    setIsActive(test.is_active);

  }, [
    id,
    isEdit,
    tests,
    subjects,
  ]);

  const filteredChapters = useMemo(() => {
    return chapters.filter(
      (chapter) =>
        chapter.subject_id === subjectId &&
        chapter.class === selectedClass
    );
  }, [
    chapters,
    subjectId,
    selectedClass,
  ]);

  const filteredTopics = useMemo(() => {
    if (!chapterId) return [];

    return topics.filter(
      (topic) =>
        topic.chapter_id === chapterId
    );
  }, [
    topics,
    chapterId,
  ]);

    async function handleSave(
    continueToBuilder = false
  ) {
    if (!name.trim()) {
      alert("Please enter test name.");
      return;
    }

    setLoading(true);

    const payload = {
      id: isEdit ? Number(id) : undefined,

      name,
      description,

      subject_id: subjectId,
      class: selectedClass,

      chapter_id: chapterId,
      topic_id: topicId,

      duration_minutes: duration,

      positive_marks: positiveMarks,
      negative_marks: negativeMarks,

      shuffle_questions: shuffleQuestions,
      shuffle_options: shuffleOptions,

      show_result: showResult,
      show_answers: showAnswers,
      show_explanations: showExplanations,

      allow_review: allowReview,
      allow_retest: allowRetest,

      is_active: isActive,
    };

    const success = isEdit
      ? await updateTest(payload)
      : await addTest(payload);

    setLoading(false);

    if (!success) return;

    if (continueToBuilder) {
      // Question Builder page
      // (we'll create this next)
      navigate("/admin/tests");
      return;
    }

    navigate("/admin/tests");
  }

  return (
    <AdminLayout
      title={
        isEdit
          ? "Edit Test"
          : "Create Test"
      }
    >

      <div className="max-w-6xl mx-auto space-y-6">

        {/* Top Bar */}

        <div className="flex items-center justify-between">

          <button
            onClick={() =>
              navigate("/admin/tests")
            }
            className="text-slate-600 hover:text-slate-900 font-medium"
          >
            ← Back to Tests
          </button>

          <div className="flex gap-3">

            <button
              onClick={() =>
                handleSave(false)
              }
              disabled={loading}
              className="rounded-xl border px-5 py-2 font-medium"
            >
              Save Draft
            </button>

            <button
              onClick={() =>
                handleSave(true)
              }
              disabled={loading}
              className="rounded-xl bg-teal-500 px-6 py-2 text-white hover:bg-teal-600"
            >
              Save & Continue →
            </button>

          </div>

        </div>

             {/* Basic Information */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="text-xl font-bold mb-6">
            Basic Information
          </h2>

          <div className="space-y-5">

            {/* Test Name */}

            <div>

              <label className="mb-2 block font-medium">
                Test Name
              </label>

              <input
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter test name"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500"
              />

            </div>

            {/* Description */}

            <div>

              <label className="mb-2 block font-medium">
                Description
              </label>

              <textarea
                rows={4}
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Instructions for students..."
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500"
              />

            </div>

            {/* Subject + Class */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>

                <label className="mb-2 block font-medium">
                  Subject
                </label>

                <select
                  value={subjectId}
                  onChange={(e) =>
                    setSubjectId(
                      Number(e.target.value)
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
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

                <label className="mb-2 block font-medium">
                  Class
                </label>

                <select
                  value={selectedClass}
                  onChange={(e) =>
                    setSelectedClass(
                      Number(e.target.value)
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                >
                  <option value={11}>
                    Class 11
                  </option>

                  <option value={12}>
                    Class 12
                  </option>

                </select>

              </div>

            </div>

            {/* Chapter + Topic */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>

                <label className="mb-2 block font-medium">
                  Chapter
                </label>

                <select
                  value={chapterId ?? ""}
                  onChange={(e) =>
                    setChapterId(
                      e.target.value
                        ? Number(e.target.value)
                        : null
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                >
                  <option value="">
                    All Chapters
                  </option>

                  {filteredChapters.map((chapter) => (
                    <option
                      key={chapter.id}
                      value={chapter.id}
                    >
                      {chapter.name}
                    </option>
                  ))}

                </select>

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Topic
                </label>

                <select
                  value={topicId ?? ""}
                  onChange={(e) =>
                    setTopicId(
                      e.target.value
                        ? Number(e.target.value)
                        : null
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                >
                  <option value="">
                    All Topics
                  </option>

                  {filteredTopics.map((topic) => (
                    <option
                      key={topic.id}
                      value={topic.id}
                    >
                      {topic.name}
                    </option>
                  ))}

                </select>

              </div>

            </div>

          </div>

        </div>   

                {/* Configuration */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="mb-6 text-xl font-bold">
            Test Configuration
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* Duration */}

            <div>

              <label className="mb-2 block font-medium">
                Duration (Minutes)
              </label>

              <input
                type="number"
                min={1}
                value={duration}
                onChange={(e) =>
                  setDuration(Number(e.target.value))
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500"
              />

            </div>

            {/* Positive Marks */}

            <div>

              <label className="mb-2 block font-medium">
                Positive Marks
              </label>

              <input
                type="number"
                step="0.25"
                value={positiveMarks}
                onChange={(e) =>
                  setPositiveMarks(parseFloat(e.target.value))
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500"
              />

            </div>

            {/* Negative Marks */}

            <div>

              <label className="mb-2 block font-medium">
                Negative Marks
              </label>

              <input
                type="number"
                step="0.25"
                value={negativeMarks}
                onChange={(e) =>
                  setNegativeMarks(parseFloat(e.target.value))
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-teal-500"
              />

            </div>

          </div>

        </div>

               {/* Student Experience */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h2 className="mb-6 text-xl font-bold">
            Student Experience
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={shuffleQuestions}
                onChange={(e) =>
                  setShuffleQuestions(e.target.checked)
                }
              />
              <span>Shuffle Questions</span>
            </label>

            <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={shuffleOptions}
                onChange={(e) =>
                  setShuffleOptions(e.target.checked)
                }
              />
              <span>Shuffle Options</span>
            </label>

            <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={showResult}
                onChange={(e) =>
                  setShowResult(e.target.checked)
                }
              />
              <span>Show Result After Submission</span>
            </label>

            <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={showAnswers}
                onChange={(e) =>
                  setShowAnswers(e.target.checked)
                }
              />
              <span>Show Correct Answers</span>
            </label>

            <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={showExplanations}
                onChange={(e) =>
                  setShowExplanations(e.target.checked)
                }
              />
              <span>Show Explanations</span>
            </label>

            <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={allowReview}
                onChange={(e) =>
                  setAllowReview(e.target.checked)
                }
              />
              <span>Allow Review</span>
            </label>

            <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={allowRetest}
                onChange={(e) =>
                  setAllowRetest(e.target.checked)
                }
              />
              <span>Allow Retest</span>
            </label>

            <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 cursor-pointer hover:bg-slate-50">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) =>
                  setIsActive(e.target.checked)
                }
              />
              <span>Active</span>
            </label>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
} 