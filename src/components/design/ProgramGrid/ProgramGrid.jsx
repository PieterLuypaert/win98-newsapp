import React from "react";
import { useNavigate } from "react-router";
import { NewsWindow } from "../NewsWindow/NewsWindow";
import { HomeContent } from "../HomeContent/HomeContent";
import { CategoryContent } from "../CategoryContent/CategoryContent";
import { ArticleContent } from "../ArticleContent/ArticleContent";

export const ProgramGrid = ({ openWindow, categorySlug, articleSlug }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  if (openWindow === "news") {
    return (
      <NewsWindow title="News Explorer - Home" onClose={handleClose}>
        <HomeContent />
      </NewsWindow>
    );
  }

  if (openWindow === "category") {
    return (
      <NewsWindow title={`News Explorer - Category`} onClose={handleClose}>
        <CategoryContent categorySlug={categorySlug} />
      </NewsWindow>
    );
  }

  if (openWindow === "article") {
    return (
      <NewsWindow title="News Explorer - Article" onClose={handleClose}>
        <ArticleContent articleSlug={articleSlug} />
      </NewsWindow>
    );
  }

  return null;
};
