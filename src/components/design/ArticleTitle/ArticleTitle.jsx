import React from "react";
import "./ArticleTitle.css";

export const ArticleTitle = ({
  children,
  title,
  className = "",
  onClick,
  ...props
}) => {
  const content = title ?? children;
  return (
    <div
      className={`article-card-title  ${className}`.trim()}
      onClick={onClick}
      {...props}
    >
      {content}
    </div>
  );
};
