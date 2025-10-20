import React from "react";
import "./TrendingList.css";
import { Link } from "react-router"; 


export const TrendingList = ({ items, onArticleClick }) => {
  const handleClick = (e, slug) => {
    e.preventDefault();
    if (onArticleClick) {
      onArticleClick(slug);
    }
  };

  const uniqueItems = items.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.articleId === item.articleId)
  );

  return (
    <div className="trending-list">
      <div className="trending-list-header">Top 10 Trending</div>
      <ol className="trending-list-items">
        {uniqueItems.slice(0, 10).map((item) => (
          <li key={item.articleId} className="trending-list-item">
            <Link 
              to={`/article/${item.slug}`}
              className="trending-list-link"
            >
              {item.title}
            </Link>
            <span className="trending-list-views">{item.views} views</span>
          </li>
        ))}
      </ol>
    </div>
  );
};
