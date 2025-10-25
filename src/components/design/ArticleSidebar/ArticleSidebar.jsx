import React from "react";
import "./ArticleSidebar.css";
import { AuthorCard } from "../AuthorCard/AuthorCard";
import { ProgressBar } from "../ProgressBar/ProgressBar";

export const ArticleSidebar = ({
  author,
  articleId,
  scrollProgress,
  BookmarkComponent = null,
}) => {
  return (
    <aside className="article-sidebar">
      <AuthorCard author={author} />
      {BookmarkComponent ? <BookmarkComponent articleId={articleId} /> : null}
      <ProgressBar progress={scrollProgress} />
    </aside>
  );
};

export default ArticleSidebar;
