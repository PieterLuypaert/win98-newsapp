import React from "react";
import { useNavigate } from "react-router";
import { NewsWindow } from "../NewsWindow/NewsWindow";
import HomeContainer from "../../functional/Home/HomeContainer";
import CategoryContainer from "../../functional/Category/CategoryContainer";
import ArticleContainer from "../../functional/Article/ArticleContainer";
import BookmarksContainer from "../../functional/Bookmarks/BookmarksContainer";

export const ProgramGrid = ({ openWindow, categorySlug, articleSlug }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  if (openWindow === "news") {
    return (
      <NewsWindow title="News Explorer - Home" onClose={handleClose}>
        <HomeContainer />
      </NewsWindow>
    );
  }

  if (openWindow === "category") {
    return (
      <NewsWindow title={`News Explorer - Category`} onClose={handleClose}>
        <CategoryContainer categorySlug={categorySlug} />
      </NewsWindow>
    );
  }

  if (openWindow === "article") {
    return (
      <NewsWindow title="News Explorer - Article" onClose={handleClose}>
        <ArticleContainer articleSlug={articleSlug} />
      </NewsWindow>
    );
  }

  if (openWindow === "bookmarks") {
    return (
      <NewsWindow title="Bookmarks" onClose={handleClose}>
        <BookmarksContainer />
      </NewsWindow>
    );
  }

  return null;
};
