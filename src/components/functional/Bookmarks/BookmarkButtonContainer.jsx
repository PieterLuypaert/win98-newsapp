import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@functional/Auth/UseAuth";
import { useBookmarks } from "./BookmarksProvider";
import { BookmarkButton } from "../../design/BookmarkButton/BookmarkButton";

export const BookmarkButtonContainer = ({ articleSlug, articleId }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks();
  const [showPrompt, setShowPrompt] = useState(false);

  const key = articleSlug ?? articleId;
  const bookmarked = isBookmarked ? !!isBookmarked(key) : false;

  const handleClick = (e) => {
    e && e.stopPropagation();
    if (!auth?.isAuthenticated) {
      setShowPrompt(true);
      return;
    }
    if (bookmarked) removeBookmark(key);
    else addBookmark(key);
  };

  const handleClosePrompt = () => setShowPrompt(false);
  const handleLogin = () => {
    setShowPrompt(false);
    navigate("/login");
  };
  const handleRegister = () => {
    setShowPrompt(false);
    navigate("/register");
  };

  return (
    <BookmarkButton
      bookmarked={bookmarked}
      onClick={handleClick}
      showPrompt={showPrompt}
      onClosePrompt={handleClosePrompt}
      onLogin={handleLogin}
      onRegister={handleRegister}
    />
  );
};

export default BookmarkButtonContainer;
