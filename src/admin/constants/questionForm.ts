import { QuestionForm } from "../types/question";

export const initialQuestionForm: QuestionForm = {
  topic_id: 0,

  question: "",

  option_a: "",
  option_b: "",
  option_c: "",
  option_d: "",

  correct_option: "A",

  explanation: "",

  difficulty: "Easy",

  is_active: true,
};