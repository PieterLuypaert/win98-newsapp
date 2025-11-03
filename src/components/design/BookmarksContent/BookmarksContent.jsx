import React from "react";
import { Link } from "react-router";
import { ArticleCard } from "@/components/design/ArticleCard/ArticleCard";
import "@/components/design/BookmarksContent/BookmarksContent.css";
import { Button } from "@/components/design/Button/Button";
import LoadingDialog from "@/components/design/LoadingDialog/LoadingDialog";

export const BookmarksContent = ({
  isAuthenticated = false,
  isLoading = false,
  bookmarkedArticles = [],
  bookmarksCount = 0,
  onRemoveBookmark = () => {},
}) => {
  if (!isAuthenticated) {
    return (
      <div className="bookmarks-wrapper">
        <header className="bookmarks-header">
          <h2>Saved Articles</h2>
        </header>

        <div className="bookmarks-empty">
          <div className="empty-inner">
            <div className="empty-message">
              <p>Je bent niet ingelogd.</p>
              <p>Log in om artikelen op te slaan en te bekijken.</p>
            </div>

            <div className="empty-actions">
              <Link to="/login">
                <Button variant="win98" className="win98-button">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="win98" className="win98-button">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bookmarks-wrapper">
        <LoadingDialog
          message="Loading saved articles..."
          onCancel={() => {}}
        />
      </div>
    );
  }

  return (
    <div className="bookmarks-wrapper">
      <header className="bookmarks-header">
        <h2>Saved Articles ({bookmarksCount})</h2>
      </header>

      <main className="bookmarks-list">
        {bookmarkedArticles.length === 0 ? (
          <div className="bookmarks-empty">
            <p>No saved articles yet.</p>
            <p>Gebruik de bookmark knop op een artikel om het op te slaan.</p>
          </div>
        ) : (
          bookmarkedArticles.map((article) => (
            <div key={article.id} className="bookmark-item">
              <Link to={`/article/${article.slug}`}>
                <ArticleCard
                  article={article}
                  onClick={(e) => e.preventDefault()}
                  onCategoryClick={() => {}}
                />
              </Link>
              <div className="bookmark-actions">
                <Button
                  variant="win98"
                  className="remove-bookmark"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveBookmark(article.slug);
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
