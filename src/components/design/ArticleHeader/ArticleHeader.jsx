import React from "react";
import "./ArticleHeader.css";

export const ArticleHeader = ({ article }) => {
  return (
    <article className="article-header">
      <h1 className="article-title">{article.title}</h1>
      <div className="article-meta">
        <span className="article-date">
          {new Date(article.timestamp).toLocaleDateString("nl-BE", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        {article.categories && article.categories.length > 0 && (
          <div className="article-categories">
            {article.categories.map((cat) => (
              <span key={cat.slug} className="article-category">
                {cat.title}
              </span>
            ))}
          </div>
        )}
      </div>

      {article.mainImage && (
        <img
          src={article.mainImage}
          alt={article.title}
          className="article-main-image"
        />
      )}
      <p className="article-intro">{article.intro}</p>
    </article>
  );
};
