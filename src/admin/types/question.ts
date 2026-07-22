export type Difficulty = "Easy" | "Medium" | "Hard";
export type CorrectOption = "A" | "B" | "C" | "D";

export interface QuestionForm {
  topic_id: number;

  question: string;

  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;

  correct_option: CorrectOption;

  explanation: string;

  difficulty: Difficulty;

  is_active: boolean;
}