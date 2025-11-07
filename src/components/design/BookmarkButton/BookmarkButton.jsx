import React from "react";
import "./BookmarkButton.css";
import { Button } from "@/components/design/Button/Button";
import { LoginPrompt } from "@/components/design/LoginPrompt/LoginPrompt";

export const BookmarkButton = ({
  bookmarked = false,
  onClick = () => {},
  showPrompt = false,
  onClosePrompt = () => {},
  onLogin = () => {},
  onRegister = () => {},
  titleAdd = "Bookmark",
  titleRemove = "Bookmarked",
}) => {
  return (
    <div
      className="bookmark-button-container"
      onClick={(e) => e.stopPropagation()}
    >
      <Button
        onClick={onClick}
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
          {bookmarked ? titleRemove : titleAdd}
        </span>
      </Button>

      {showPrompt && (
        <LoginPrompt
          onClose={onClosePrompt}
          onLogin={onLogin}
          onRegister={onRegister}
        />
      )}
    </div>
  );
};

