import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export interface Test {
  id: number;

  name: string;

  subject_id: number;

  class: number;

  duration_minutes: number;

  is_active: boolean;

  subjects: {
    id: number;
    name: string;
  };
}

export interface Question {
  id: number;

  question: string;
  marks: number;

  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;

  correct_option: string;

  explanation: string | null;

  difficulty: string;

  is_active: boolean;

  topic_id: number;

  topics: {
    id: number;
    name: string;

    chapters: {
      id: number;
      name: string;
      class: number;

      subjects: {
        id: number;
        name: string;
      };
    };
  };
}

export function useTestQuestions(testId: number) {
  const [loading, setLoading] = useState(true);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [test, setTest] = useState<Test | null>(null);

  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
const [hasUnsavedChanges, setHasUnsavedChanges] =
  useState(false);

async function loadTest() {
  const { data, error } = await supabase
  .from("tests")
  .select(`
    *,
    subjects(
      id,
      name
    )
  `)
  .eq("id", testId)
  .single();

  if (error) {
    console.error(error);
    return;
  }

  setTest(data);
}

  async function loadQuestions() {
    const { data, error } = await supabase
      .from("questions")
      .select(`
        *,
        topics(
          id,
          name,
          chapters(
            id,
            name,
            class,
            subjects(
              id,
              name
            )
          )
        )
      `)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
      return;
    }

    setQuestions(data || []);
  }

  async function loadSelectedQuestions() {
    const { data, error } = await supabase
      .from("test_questions")
      .select("question_id")
      .eq("test_id", testId);

    if (error) {
      console.error(error);
      return;
    }

    setSelectedQuestions(
      data.map((row) => row.question_id)
    );
  }

  async function refresh() {
    setLoading(true);

    await Promise.all([
      loadTest(),
      loadQuestions(),
      loadSelectedQuestions(),
    ]);

    setLoading(false);
  }

  function toggleQuestion(questionId: number) {
  setSelectedQuestions((previous) => {
    if (previous.includes(questionId)) {
      return previous.filter(
        (id) => id !== questionId
      );
    }

    return [...previous, questionId];
  });

  setHasUnsavedChanges(true);
}

function removeQuestion(questionId: number) {
  setSelectedQuestions((previous) =>
    previous.filter((id) => id !== questionId)
  );

  setHasUnsavedChanges(true);
}

function selectAll(questionIds: number[]) {
  setSelectedQuestions((previous) => {
    const merged = new Set([
      ...previous,
      ...questionIds,
    ]);

    return [...merged];
  });

  setHasUnsavedChanges(true);
}

function clearAll() {
  setSelectedQuestions([]);
  setHasUnsavedChanges(true);
}

function replaceSelection(questionIds: number[]) {
  setSelectedQuestions(questionIds);
  setHasUnsavedChanges(true);
}

  async function saveQuestions() {
    const { error: deleteError } = await supabase
      .from("test_questions")
      .delete()
      .eq("test_id", testId);

    if (deleteError) {
      alert(deleteError.message);
      return false;
    }

    if (selectedQuestions.length > 0) {
      const rows = selectedQuestions.map(
        (questionId) => ({
          test_id: testId,
          question_id: questionId,
        })
      );

      const { error: insertError } = await supabase
        .from("test_questions")
        .insert(rows);

      if (insertError) {
        alert(insertError.message);
        return false;
      }
    }

    setHasUnsavedChanges(false);

alert("Questions saved successfully.");

return true;
  }

  useEffect(() => {
    refresh();
  }, [testId]);

  return {
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
};
}