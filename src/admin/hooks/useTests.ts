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

export interface Test {
  id?: number;

  name: string;
  description: string;

  subject_id: number;
  class: number;

  chapter_id: number | null;
  topic_id: number | null;

  duration_minutes: number;

  positive_marks: number;
  negative_marks: number;

  shuffle_questions: boolean;
  shuffle_options: boolean;

  show_result: boolean;
  show_answers: boolean;
  show_explanations: boolean;

  allow_review: boolean;
  allow_retest: boolean;

  is_active: boolean;

  subjects?: {
    name: string;
  } | null;

  chapters?: {
    name: string;
  } | null;

  topics?: {
    name: string;
  } | null;
}

export function useTests() {
  const [loading, setLoading] =
    useState(true);

  const [subjects, setSubjects] =
    useState<Subject[]>([]);

  const [chapters, setChapters] =
    useState<Chapter[]>([]);

  const [topics, setTopics] =
    useState<Topic[]>([]);

  const [tests, setTests] =
    useState<Test[]>([]);

      async function loadSubjects() {
    const { data, error } = await supabase
      .from("subjects")
      .select("*")
      .order("display_order");

    if (error) {
      console.error(error);
      return;
    }

    setSubjects(data || []);
  }

  async function loadChapters() {
    const { data, error } = await supabase
      .from("chapters")
      .select("*")
      .order("display_order");

    if (error) {
      console.error(error);
      return;
    }

    setChapters(data || []);
  }

  async function loadTopics() {
    const { data, error } = await supabase
      .from("topics")
      .select("*")
      .order("display_order");

    if (error) {
      console.error(error);
      return;
    }

    setTopics(data || []);
  }

  async function loadTests() {
    const { data, error } = await supabase
      .from("tests")
      .select(`
        *,
        subjects(name),
        chapters(name),
        topics(name)
      `)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);
      return;
    }

    setTests(data as Test[]);
  }

  async function refresh() {
    setLoading(true);

    await Promise.all([
      loadSubjects(),
      loadChapters(),
      loadTopics(),
      loadTests(),
    ]);

    setLoading(false);
  }

    async function addTest(test: Test) {
    const { data: existing } = await supabase
      .from("tests")
      .select("id")
      .eq("name", test.name)
      .maybeSingle();

    if (existing) {
      alert("A test with this name already exists.");
      return false;
    }

    const { error } = await supabase
      .from("tests")
      .insert({
        name: test.name,
        description: test.description,

        subject_id: test.subject_id,
        class: test.class,

        chapter_id: test.chapter_id,
        topic_id: test.topic_id,

        duration_minutes: test.duration_minutes,

        positive_marks: test.positive_marks,
        negative_marks: test.negative_marks,

        shuffle_questions: test.shuffle_questions,
        shuffle_options: test.shuffle_options,

        show_result: test.show_result,
        show_answers: test.show_answers,
        show_explanations: test.show_explanations,

        allow_review: test.allow_review,
        allow_retest: test.allow_retest,

        is_active: test.is_active,
      });

    if (error) {
      console.error(error);
      alert(error.message);
      return false;
    }

    await refresh();

    return true;
  }

  async function updateTest(test: Test) {
    if (!test.id) return false;

    const { data: existing } = await supabase
      .from("tests")
      .select("id")
      .eq("name", test.name)
      .neq("id", test.id)
      .maybeSingle();

    if (existing) {
      alert("A test with this name already exists.");
      return false;
    }

    const { error } = await supabase
      .from("tests")
      .update({
        name: test.name,
        description: test.description,

        subject_id: test.subject_id,
        class: test.class,

        chapter_id: test.chapter_id,
        topic_id: test.topic_id,

        duration_minutes: test.duration_minutes,

        positive_marks: test.positive_marks,
        negative_marks: test.negative_marks,

        shuffle_questions: test.shuffle_questions,
        shuffle_options: test.shuffle_options,

        show_result: test.show_result,
        show_answers: test.show_answers,
        show_explanations: test.show_explanations,

        allow_review: test.allow_review,
        allow_retest: test.allow_retest,

        is_active: test.is_active,
      })
      .eq("id", test.id);

    if (error) {
      console.error(error);
      alert(error.message);
      return false;
    }

    await refresh();

    return true;
  }

  async function deleteTest(id: number) {
    const ok = confirm(
      "Are you sure you want to delete this test?"
    );

    if (!ok) return;

    const { error } = await supabase
      .from("tests")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
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

    tests,

    addTest,
    updateTest,
    deleteTest,

    refresh,
  };
}