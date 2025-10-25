import React, { useMemo } from "react";
import { useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import BookmarksContent from "../../design/BookmarksContent/BookmarksContent";
import { fetchNews } from "../../../core/modules/news/news.api";
import useAuth from "../Auth/UseAuth";
import { useBookmarks } from "./BookmarksProvider";

const BookmarksContainer = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const auth = useAuth();
  const { bookmarks, removeBookmark, count } = useBookmarks();

  const { data: news = [], isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
  });

  const bookmarkedItems = bookmarks || [];
  const bookmarkedArticles = useMemo(
    () =>
      news.filter((a) =>
        bookmarkedItems.some((b) => b === a.slug || b == a.id)
      ),
    [news, bookmarkedItems]
  );

  const handleLogin = () => navigate("/login");
  const handleRegister = () => navigate("/register");
  const handleArticleClick = (slug) => navigate(`/article/${slug}`);

  return (
    <BookmarksContent
      isAuthenticated={!!auth?.isAuthenticated}
      onLogin={handleLogin}
      onRegister={handleRegister}
      isLoading={isLoading}
      bookmarkedArticles={bookmarkedArticles}
      bookmarksCount={count}
      onRemoveBookmark={removeBookmark}
      onArticleClick={handleArticleClick}
    />
  );
};

export default BookmarksContainer;
