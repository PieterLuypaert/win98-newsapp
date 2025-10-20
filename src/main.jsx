import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import App from "./App";

import Home from "./pages/Home";
import News from "./pages/News";
import Bookmarks from "./pages/Bookmarks";
import Category from "./pages/Category";
import Article from "./pages/Article";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="news" element={<News />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="category/:categorySlug" element={<Category />} />
          <Route path="article/:articleSlug" element={<Article />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
