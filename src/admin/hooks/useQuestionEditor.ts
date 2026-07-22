import { useMemo, useState } from "react";
import {
  Subject,
  Chapter,
  Topic,
} from "./useQuestions";

export function useQuestionEditor(
  subjects: Subject[],
  chapters: Chapter[],
  topics: Topic[]
) {
  const [subjectId, setSubjectId] = useState(0);

  const [selectedClass, setSelectedClass] =
    useState<11 | 12>(11);

  const [chapterId, setChapterId] = useState(0);

  const [topicId, setTopicId] = useState(0);

  const filteredChapters = useMemo(() => {
    return chapters.filter(
      (chapter) =>
        chapter.subject_id === subjectId &&
        chapter.class === selectedClass
    );
  }, [chapters, subjectId, selectedClass]);

  const filteredTopics = useMemo(() => {
    return topics.filter(
      (topic) => topic.chapter_id === chapterId
    );
  }, [topics, chapterId]);

  return {
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
  };
}