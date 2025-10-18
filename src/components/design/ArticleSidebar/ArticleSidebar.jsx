import React from "react";
import "./ArticleSidebar.css";
import { AuthorCard } from "../AuthorCard/AuthorCard";
import { BookmarkButton } from "../BookmarkButton/BookmarkButton";
import { ProgressBar } from "../ProgressBar/ProgressBar";

export const ArticleSidebar = ({ author, articleId, scrollProgress }) => {
  return (
    <aside className="article-sidebar">
      <AuthorCard author={author} />
      <BookmarkButton articleId={articleId} />
      <ProgressBar progress={scrollProgress} />
    </aside>
  );
};
