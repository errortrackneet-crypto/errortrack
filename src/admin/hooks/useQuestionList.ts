import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export type Question = {
  id: number;
  question: string;
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
};

export function useQuestionList() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuestions();
  }, []);

  async function loadQuestions() {
    const { data, error } = await supabase
      .from("questions")
      .select(`
  id,
  question,
  difficulty,
  is_active,
  topic_id,

  topics (
    id,
    name,

    chapters (
      id,
      name,
      class,

      subjects (
        id,
        name
      )
    )
  )
`)
      .order("id", { ascending: false });

    if (!error && data) {
        console.log(data);
      setQuestions(data);
    }

    setLoading(false);
  }

  return {
    questions,
    loading,
    reload: loadQuestions,
  };
}