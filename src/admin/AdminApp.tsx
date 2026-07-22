import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Chapters from "./pages/Chapters";
import Topics from "./pages/Topics";
import Questions from "./pages/Questions";
import QuestionEditor from "./pages/QuestionEditor";
import Tests from "./pages/Tests";
import TestEditor from "./pages/TestEditor";
import TestQuestions from "./pages/TestQuestions";

export default function AdminApp() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />

      <Route path="questions" element={<Questions />} />
      <Route path="chapters" element={<Chapters />} />
      <Route path="topics" element={<Topics />} />

      <Route path="tests" element={<Tests />} />
      <Route path="tests/new" element={<TestEditor />} />
      <Route path="tests/:id/edit" element={<TestEditor />} />
      <Route path="tests/:id/questions" element={<TestQuestions />} />

      <Route path="questions/new" element={<QuestionEditor />} />
      <Route path="questions/:id/edit" element={<QuestionEditor />} />
      <Route path="questions/:id" element={<QuestionEditor />} />

      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
}