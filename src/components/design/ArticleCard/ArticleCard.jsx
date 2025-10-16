import React from "react";
import "./ArticleCard.css";

export const ArticleCard = ({
  article,
  isHeadline = false,
  onClick,
  onCategoryClick,
}) => {
  if (!article) return null;

  const date = new Date(article.timestamp).toLocaleDateString("nl-BE");

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleCategoryClick = (e, slug) => {
    e.stopPropagation();
    if (onCategoryClick) {
      e.preventDefault(); // voorkom full page reload als we client-side navigeren
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
                <a
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  onClick={(e) => handleCategoryClick(e, cat.slug)}
                  className="article-card-category"
                >
                  {cat.title}
                </a>
              ))}
            </span>
          )}
        </div>
        <p className="article-card-intro">{article.intro}</p>
      </div>
    </div>
  );
};
