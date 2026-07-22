import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { notify } from "@/lib/toast";

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
  id?: number;
  chapter_id: number;
  name: string;
  display_order: number;
  is_active: boolean;

  chapters?: {
    id: number;
    name: string;
    subject_id: number;
    class: number;

    subjects?: {
      name: string;
    } | null;
  } | null;
}

export function useTopics() {
  const [loading, setLoading] = useState(true);

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);

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
      .select(`
        *,
        chapters(
          id,
          name,
          class,
          subject_id,
          subjects(name)
        )
      `)
      .order("display_order");

    if (error) {
      console.error(error);
      return;
    }

    setTopics(data as Topic[]);
  }

  async function refresh() {
    setLoading(true);

    await Promise.all([
  loadSubjects(),
  loadChapters(),
  loadTopics(),
]);
    setLoading(false);
  }

  async function addTopic(topic: Topic) {
  const { data: existing } = await supabase
    .from("topics")
    .select("id")
    .eq("chapter_id", topic.chapter_id)
    .ilike("name", topic.name)
    .maybeSingle();

  if (existing) {
    notify.success(
      "A topic with this name already exists in the selected chapter."
    );
    return false;
  }

  const { error } = await supabase
    .from("topics")
    .insert({
      chapter_id: topic.chapter_id,
      name: topic.name,
      display_order: topic.display_order,
      is_active: topic.is_active,
    });

  if (error) {
    notify.error(error.message);
    return false;
  }

  await refresh();

  return true;
}

 async function updateTopic(topic: Topic) {
  if (!topic.id) return false;

  const { data: existing } = await supabase
    .from("topics")
    .select("id")
    .eq("chapter_id", topic.chapter_id)
    .ilike("name", topic.name)
    .neq("id", topic.id)
    .maybeSingle();

  if (existing) {
    notify.warning(
      "A topic with this name already exists in the selected chapter."
    );
    return false;
  }

  const { error } = await supabase
    .from("topics")
    .update({
      chapter_id: topic.chapter_id,
      name: topic.name,
      display_order: topic.display_order,
      is_active: topic.is_active,
    })
    .eq("id", topic.id);

  if (error) {
    notify.error(error.message);
    return false;
  }

  await refresh();

  return true;
}

  async function deleteTopic(id: number) {
  const { error } = await supabase
    .from("topics")
    .delete()
    .eq("id", id);

  if (error) {
    notify.error(error.message);
    return false;
  }

  await refresh();
  notify.success("Topic deleted successfully.");
  
  
  
  return true;
}

  useEffect(() => {
    refresh();
  }, []);

  return {
    loading,
    subjects,
    chapters,
    topics,
    addTopic,
    updateTopic,
    deleteTopic,
    refresh,
  };
}