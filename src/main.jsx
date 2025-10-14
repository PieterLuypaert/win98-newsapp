import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import { Home } from "./pages/Home";
import { Article } from "./pages/Article";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="news" element={<Home openWindow="news" />} />
          <Route
            path="category/:categorySlug"
            element={<Home openWindow="category" />}
          />
          <Route path="article/:articleSlug" element={<Article />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
