import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export interface Subject {
  id: number;
  name: string;
}

export interface Chapter {
  id: number;
  subject_id: number;
  class: number;
  name: string;
}

export interface Topic {
  id: number;
  chapter_id: number;
  name: string;
}

export interface Question {
  id?: number;

  topic_id: number;

  question: string;

  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;

  correct_option: "A" | "B" | "C" | "D";

  explanation: string;

  difficulty: "Easy" | "Medium" | "Hard";

  is_active: boolean;

  topics?: {
    id: number;
    name: string;
    chapter_id: number;

    chapters?: {
      id: number;
      name: string;
      class: number;
      subject_id: number;

      subjects?: {
        name: string;
      } | null;
    } | null;
  } | null;
}

export function useQuestions() {
  const [loading, setLoading] = useState(true);

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  async function refresh() {
    setLoading(true);

    const [subjectsRes, chaptersRes, topicsRes, questionsRes] =
      await Promise.all([
        supabase.from("subjects").select("*").order("display_order"),

        supabase.from("chapters").select("*").order("display_order"),

        supabase.from("topics").select("*").order("display_order"),

        supabase
          .from("questions")
          .select(`
            *,
            topics(
              id,
              name,
              chapter_id,
              chapters(
                id,
                name,
                class,
                subject_id,
                subjects(name)
              )
            )
          `)
          .order("id", { ascending: false }),
      ]);

    if (subjectsRes.data) setSubjects(subjectsRes.data);

    if (chaptersRes.data) setChapters(chaptersRes.data);

    if (topicsRes.data) setTopics(topicsRes.data);

    if (questionsRes.data)
      setQuestions(questionsRes.data as Question[]);

    setLoading(false);
  }

  async function addQuestion(question: Question) {
    const { error } = await supabase
      .from("questions")
      .insert(question);

    if (error) {
      alert(error.message);
      return false;
    }

    await refresh();

    return true;
  }

  async function updateQuestion(question: Question) {
    if (!question.id) return false;

    const { error } = await supabase
      .from("questions")
      .update(question)
      .eq("id", question.id);

    if (error) {
      alert(error.message);
      return false;
    }

    await refresh();

    return true;
  }

  async function deleteQuestion(id: number) {
    if (!confirm("Delete this question?")) return;

    const { error } = await supabase
      .from("questions")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    await refresh();
  }

  useEffect(() => {
    refresh();
  }, []);

  return {
    loading,

    subjects,
    chapters,
    topics,

    questions,

    refresh,

    addQuestion,
    updateQuestion,
    deleteQuestion,
  };
}