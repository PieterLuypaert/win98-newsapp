import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import App from "./App";

import Home from "./pages/Home";
import News from "./pages/News";
import Bookmarks from "./pages/Bookmarks";
import Category from "./pages/Category";
import Article from "./pages/Article";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { QueryClientProvider } from "@tanstack/react-query";

const root = document.getElementById("root");

const client = new QueryClient();

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="news" element={<News />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="category/:categorySlug" element={<Category />} />
          <Route path="article/:articleSlug" element={<Article />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
