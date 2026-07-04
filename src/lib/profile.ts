import { supabase } from "@/lib/supabase";

export async function ensureProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  // Check whether profile already exists
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (existing) return;

  // Create profile
  const { error } = await supabase.from("profiles").insert({
    id: user.id,
    full_name:
      user.user_metadata.full_name ||
      user.user_metadata.name ||
      "",
    email: user.email,
    avatar_url: user.user_metadata.avatar_url,
    student_type: "12th",
  });

  if (error) {
    console.error(error);
  }
}