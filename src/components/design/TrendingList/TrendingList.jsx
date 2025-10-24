import React from "react";
import "./TrendingList.css";
import { Link } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchTrending } from "../../../core/modules/trending/trending.api";
import LoadingDialog from "../LoadingDialog/LoadingDialog";

export const TrendingList = ({ items: propItems, onArticleClick }) => {
  const queryClient = useQueryClient();
  const { data: fetched = [], isLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: fetchTrending,
  });

  const items =
    Array.isArray(propItems) && propItems.length ? propItems : fetched;

  const handleClick = (e, slug) => {
    e.preventDefault();
    if (onArticleClick) {
      onArticleClick(slug);
      return;
    }
    window.location.href = `/article/${slug}`;
  };

  if (isLoading && (!propItems || propItems.length === 0)) {
    return (
      <div className="trending-list">
        <div className="trending-list-header">Top 10 Trending</div>
        <div style={{ padding: 12 }}>
          <LoadingDialog
            message="Loading trending..."
            onCancel={() => queryClient.cancelQueries(["trending"])}
          />
        </div>
      </div>
    );
  }

  const uniqueItems = (items || []).filter(
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
              onClick={(e) => handleClick(e, item.slug)}
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
