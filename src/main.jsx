import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/news" element={<App />} />
        <Route path="/bookmarks" element={<App />} />
        <Route path="/category/:categorySlug" element={<App />} />
        <Route path="/article/:articleSlug" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
