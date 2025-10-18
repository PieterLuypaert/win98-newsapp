import { useState } from "react";
import { Button } from "../Button/Button";
import "./BookmarkButton.css";

export const BookmarkButton = ({ articleId, isBookmarked = false }) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  return (
    <div className="bookmark-button-container">
      <Button
        onClick={() => setBookmarked(!bookmarked)}
        variant="win98"
        className={`bookmark-button ${bookmarked ? "bookmarked" : ""}`}
        title={bookmarked ? "Remove bookmark" : "Add bookmark"}
      >
        <img
          src="/assets/apps/bookmarks.png"
          alt="Bookmark"
          className="bookmark-icon"
        />
        <span className="bookmark-text">
          {bookmarked ? "Bookmarked" : "Bookmark"}
        </span>
      </Button>
    </div>
  );
};
