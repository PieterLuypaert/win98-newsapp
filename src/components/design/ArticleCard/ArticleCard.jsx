import React from "react";
import "./ArticleCard.css";
import { ArticleIntro } from "../ArticleIntro/ArticleIntro";

export const ArticleCard = ({
  article,
  isHeadline = false,
  onClick,
  onCategoryClick,
}) => {
  const date = new Date(article.timestamp).toLocaleDateString("nl-BE");

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleCategoryClick = (e, slug) => {
    e.stopPropagation();
    if (onCategoryClick) {
      onCategoryClick(slug);
    }
  };

  return (
    <div
      className={`article-card ${isHeadline ? "article-card-headline" : ""}`}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      {isHeadline && article.mainImage && (
        <img
          src={article.mainImage}
          alt={article.title}
          className="article-card-image"
        />
      )}
      <div className="article-card-content">
        <div className="article-card-title">{article.title}</div>
        <div className="article-card-meta">
          <span className="article-card-date">{date}</span>
          {article.categories && article.categories.length > 0 && (
            <span className="article-card-categories">
              {article.categories.map((cat) => (
                <span
                  key={cat.slug}
                  onClick={(e) => handleCategoryClick(e, cat.slug)}
                  className="article-card-category"
                >
                  {cat.title}
                </span>
              ))}
            </span>
          )}
        </div>
        <ArticleIntro>{article.intro}</ArticleIntro>
      </div>
    </div>
  );
};
