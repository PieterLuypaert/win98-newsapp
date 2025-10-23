import React from "react";
import { ArticleCard } from "../ArticleCard/ArticleCard";
import "./BookmarksContent.css";
import { Button } from "../Button/Button";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "../../../core/modules/news/news.api";

const BookmarksContent = () => {
  const navigate = useNavigate();

  const { data: news = [], isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
  });

  const sampleBookmarkedSlugs = (news || []).slice(0, 4).map((a) => a.slug);

  const bookmarkedArticles = news.filter((a) =>
    sampleBookmarkedSlugs.includes(a.slug)
  );

  const handleArticleClick = (slug) => {
    navigate(`/article/${slug}`);
  };

  if (isLoading) {
    return <div className="bookmarks-wrapper">Loading saved articles...</div>;
  }

  return (
    <div className="bookmarks-wrapper">
      <header className="bookmarks-header">
        <h2>Saved Articles</h2>
      </header>

      <main className="bookmarks-list">
        {bookmarkedArticles.length === 0 ? (
          <div className="bookmarks-empty">
            <p>No saved articles yet.</p>
            <p>Use the bookmark button on an article to save it.</p>
          </div>
        ) : (
          bookmarkedArticles.map((article) => (
            <div key={article.id} className="bookmark-item">
              <ArticleCard
                article={article}
                onClick={() => handleArticleClick(article.slug)}
                onCategoryClick={() => {}}
              />
              <div className="bookmark-actions">
                <Button
                  variant="win98"
                  className="remove-bookmark"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  title="Remove bookmark"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default BookmarksContent;
