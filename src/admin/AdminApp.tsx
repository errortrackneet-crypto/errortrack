import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

import Dashboard from "./pages/Dashboard";
import Chapters from "./pages/Chapters";

export default function AdminApp() {
  return (
    <>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="chapters" element={<Chapters />} />

        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>

      <Toaster
        position="top-right"
        richColors
        closeButton
      />
    </>
  );
}