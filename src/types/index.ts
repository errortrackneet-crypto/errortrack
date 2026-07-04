// Shared types used across more than one page.
// Types that are only used inside a single page live in that page's file instead.

export type Page =
  | "auth"
  | "home"
  | "practice"
  | "question"
  | "saved"
  | "tests"
  | "stats"
  | "profile"
  | "subscription";

export type Subject = "botany" | "zoology";
export type ClassLevel = "11" | "12";
export type Difficulty = "Easy" | "Medium" | "Hard";

export interface Question {
  id: number;
  subject: Subject;
  chapter: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: Difficulty;
  type: string;
  class: ClassLevel;
  year?: number;
}
