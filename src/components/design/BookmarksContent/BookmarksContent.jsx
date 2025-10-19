import React from "react";
import { ArticleCard } from "../ArticleCard/ArticleCard";
import newsData from "../../../data/news.json";
import "./BookmarksContent.css";
import { Button } from "../Button/Button";

const sampleBookmarkedSlugs = newsData.slice(0, 4).map((a) => a.slug);

const BookmarksContent = () => {
  const bookmarkedArticles = newsData.filter((a) =>
    sampleBookmarkedSlugs.includes(a.slug)
  );

  const handleArticleClick = (slug) => {
    window.dispatchEvent(
      new CustomEvent("openAppWindow", {
        detail: { type: "article", data: { articleSlug: slug } },
      })
    );
  };

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
