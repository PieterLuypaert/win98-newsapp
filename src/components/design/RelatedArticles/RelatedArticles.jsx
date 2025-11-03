import React from "react";
import { Link } from "react-router";
import "./RelatedArticles.css";

export const RelatedArticles = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className="related-articles">
      <div className="related-articles-header">Related Articles</div>
      <div className="related-articles-list">
        {articles.map((article) => (
          <Link
            key={article.id}
            to={`/article/${article.slug}`}
            className="related-article-item"
          >
            {article.mainImage && (
              <img
                src={article.mainImage}
                alt={article.title}
                className="related-article-image"
              />
            )}
            <div className="related-article-content">
              <div className="related-article-title">{article.title}</div>
              <div className="related-article-date">
                {new Date(article.timestamp).toLocaleDateString("nl-BE")}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
