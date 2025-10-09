import React from "react";
import "./Category.css";

export const Category = ({
  title,
  slug,
  articles = [],
  isNavigationMode = true,
}) => {
  const handleCategoryClick = () => {
    if (isNavigationMode && slug) {
      console.log(`Navigate to /categories/${slug}`);
    }
  };

  return (
    <div
      className={`news-category ${isNavigationMode ? "navigation-mode" : ""}`}
      onClick={handleCategoryClick}
    >
      <div className="category-header">
        <h2 className="category-title">{title}</h2>
        <div className="category-divider"></div>
      </div>
      {!isNavigationMode && (
        <div className="category-content">
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <div key={index} className="article-item">
                <h3 className="article-title">{article.title}</h3>
                <p className="article-summary">{article.summary}</p>
                <span className="article-date">{article.date}</span>
              </div>
            ))
          ) : (
            <p className="no-articles">No articles available</p>
          )}
        </div>
      )}
    </div>
  );
};
