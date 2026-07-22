import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import AdminApp from "./admin/AdminApp";

import { Toaster } from "sonner";

import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>

  <Routes>

    <Route path="/" element={<App />} />

    <Route path="/admin/*" element={<AdminApp />} />

  </Routes>

  <Toaster
  position="top-right"
  richColors
/>

</BrowserRouter>
  </StrictMode>
);