import React from "react";
import "./ArticleSidebar.css";
import { AuthorCard } from "@/components/design/AuthorCard/AuthorCard";
import { ProgressBar } from "@/components/design/ProgressBar/ProgressBar";

export const ArticleSidebar = ({
  author,
  articleId,
  scrollProgress,
  BookmarkComponent = null,
}) => {
  return (
    <aside className="article-sidebar">
      {author ? <AuthorCard author={author} /> : null}
      {BookmarkComponent ? <BookmarkComponent articleId={articleId} /> : null}
      <ProgressBar progress={scrollProgress} />
    </aside>
  );
};

export default ArticleSidebar;
