import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export interface Subject {
  id: number;
  name: string;
}

export interface Chapter {
  id?: number;
  subject_id: number;
  name: string;
  display_order: number;
  is_active: boolean;
  subjects?: {
    name: string;
  } | null;
}

export function useChapters() {
  const [loading, setLoading] = useState(true);

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);

  async function loadSubjects() {
    const { data, error } = await supabase
      .from("subjects")
      .select("*")
      .order("id");

    if (error) {
      console.error(error);
      return;
    }

    setSubjects(data || []);
  }

  async function loadChapters() {
    const { data, error } = await supabase
      .from("chapters")
      .select(
        `
        *,
        subjects(name)
      `
      )
      .order("display_order");

    if (error) {
      console.error(error);
      return;
    }

    setChapters(data as Chapter[]);
  }

  async function refresh() {
    setLoading(true);

    await loadSubjects();
    await loadChapters();

    setLoading(false);
  }

  async function addChapter(chapter: Chapter) {
    const { error } = await supabase
      .from("chapters")
      .insert({
        subject_id: chapter.subject_id,
        name: chapter.name,
        display_order: chapter.display_order,
        is_active: chapter.is_active,
      });

    if (error) {
      console.error(error);
      alert(error.message);
      return false;
    }

    await refresh();

    return true;
  }

  async function updateChapter(chapter: Chapter) {
    if (!chapter.id) return false;

    const { error } = await supabase
      .from("chapters")
      .update({
        subject_id: chapter.subject_id,
        name: chapter.name,
        display_order: chapter.display_order,
        is_active: chapter.is_active,
      })
      .eq("id", chapter.id);

    if (error) {
      console.error(error);
      alert(error.message);
      return false;
    }

    await refresh();

    return true;
  }

  async function deleteChapter(id: number) {
    const ok = confirm(
      "Are you sure you want to delete this chapter?"
    );

    if (!ok) return;

    const { error } = await supabase
      .from("chapters")
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
    chapters,
    subjects,

    addChapter,
    updateChapter,
    deleteChapter,

    refresh,
  };
}