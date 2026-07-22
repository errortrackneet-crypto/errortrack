import { useEffect, useMemo, useState } from "react";

import {
  Subject,
  Chapter,
  Topic,
  Test,
} from "../../hooks/useTests";

interface TestDialogProps {
  open: boolean;
  title: string;

  subjects: Subject[];
  chapters: Chapter[];
  topics: Topic[];

  initialData?: Test | null;

  onClose: () => void;
  onSave: (test: Test) => void;
}

export default function TestDialog({
  open,
  title,

  subjects,
  chapters,
  topics,

  initialData,

  onClose,
  onSave,
}: TestDialogProps) {

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
    if (initialData) {
      setSubjectId(initialData.subject_id);
      setSelectedClass(initialData.class);

      setChapterId(initialData.chapter_id);
      setTopicId(initialData.topic_id);

      setName(initialData.name);
      setDescription(initialData.description ?? "");

      setDuration(initialData.duration_minutes);

      setPositiveMarks(initialData.positive_marks);
      setNegativeMarks(initialData.negative_marks);

      setShuffleQuestions(
        initialData.shuffle_questions
      );

      setShuffleOptions(
        initialData.shuffle_options
      );

      setShowResult(
        initialData.show_result
      );

      setShowAnswers(
        initialData.show_answers
      );

      setShowExplanations(
        initialData.show_explanations
      );

      setAllowReview(
        initialData.allow_review
      );

      setAllowRetest(
        initialData.allow_retest
      );

      setIsActive(
        initialData.is_active
      );
    } else {
      setSubjectId(subjects[0]?.id ?? 0);

      setSelectedClass(11);

      setChapterId(null);
      setTopicId(null);

      setName("");
      setDescription("");

      setDuration(180);

      setPositiveMarks(4);
      setNegativeMarks(1);

      setShuffleQuestions(true);
      setShuffleOptions(true);

      setShowResult(true);
      setShowAnswers(false);
      setShowExplanations(false);

      setAllowReview(true);
      setAllowRetest(false);

      setIsActive(true);
    }
  }, [
    initialData,
    subjects,
  ]);

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

  if (!open) return null;

  function handleSave() {
    if (!name.trim()) {
      alert("Please enter test name.");
      return;
    }

    onSave({
      id: initialData?.id,

      name: name.trim(),
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
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-xl">

        <div className="border-b px-6 py-5">

          <h2 className="text-2xl font-bold">
            {title}
          </h2>

        </div>

        <div className="max-h-[75vh] overflow-y-auto p-6 space-y-6">

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
              className="w-full rounded-xl border px-4 py-3"
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
              className="w-full rounded-xl border px-4 py-3"
            />

          </div>

          {/* Subject + Class */}

          <div className="grid grid-cols-2 gap-4">

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
                className="w-full rounded-xl border px-4 py-3"
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
                className="w-full rounded-xl border px-4 py-3"
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

          <div className="grid grid-cols-2 gap-4">

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
                className="w-full rounded-xl border px-4 py-3"
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
                className="w-full rounded-xl border px-4 py-3"
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

          {/* Test Configuration */}

          <div className="grid grid-cols-3 gap-4">

            <div>

              <label className="mb-2 block font-medium">
                Duration (Minutes)
              </label>

              <input
                type="number"
                min={1}
                value={duration}
                onChange={(e) =>
                  setDuration(
                    Number(e.target.value)
                  )
                }
                className="w-full rounded-xl border px-4 py-3"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Positive Marks
              </label>

              <input
                type="number"
                step="0.25"
                value={positiveMarks}
                onChange={(e) =>
                  setPositiveMarks(
                    parseFloat(e.target.value)
                  )
                }
                className="w-full rounded-xl border px-4 py-3"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Negative Marks
              </label>

              <input
                type="number"
                step="0.25"
                value={negativeMarks}
                onChange={(e) =>
                  setNegativeMarks(
                    parseFloat(e.target.value)
                  )
                }
                className="w-full rounded-xl border px-4 py-3"
              />

            </div>

          </div>

                    {/* Test Settings */}

          <div className="grid grid-cols-2 gap-4">

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={shuffleQuestions}
                onChange={(e) =>
                  setShuffleQuestions(e.target.checked)
                }
              />
              Shuffle Questions
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={shuffleOptions}
                onChange={(e) =>
                  setShuffleOptions(e.target.checked)
                }
              />
              Shuffle Options
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={showResult}
                onChange={(e) =>
                  setShowResult(e.target.checked)
                }
              />
              Show Result
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={showAnswers}
                onChange={(e) =>
                  setShowAnswers(e.target.checked)
                }
              />
              Show Correct Answers
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={showExplanations}
                onChange={(e) =>
                  setShowExplanations(e.target.checked)
                }
              />
              Show Explanations
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={allowReview}
                onChange={(e) =>
                  setAllowReview(e.target.checked)
                }
              />
              Allow Review
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={allowRetest}
                onChange={(e) =>
                  setAllowRetest(e.target.checked)
                }
              />
              Allow Retest
            </label>

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

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t px-6 py-4">

          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="rounded-xl bg-teal-500 px-6 py-2 text-white hover:bg-teal-600"
          >
            {initialData
              ? "Update Test"
              : "Save Test"}
          </button>

        </div>

      </div>

    </div>
  );
}