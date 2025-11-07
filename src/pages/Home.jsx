import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchNews } from "@core/modules/news/news.api";
import { HomeContent } from "@design/HomeContent/HomeContent";

export const useHomeLogic = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const queryClient = useQueryClient();

  const { data: newsData = [], isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
  });

  const searchArticles = (articles, term) => {
    if (!term) return articles;

    const lowerTerm = term.toLowerCase();
    return articles.filter((article) => {
      const titleMatch = article.title.toLowerCase().includes(lowerTerm);
      const introMatch = article.intro.toLowerCase().includes(lowerTerm);
      const tagsMatch = article.tags.some((tag) =>
        tag.title.toLowerCase().includes(lowerTerm)
      );
      const categoryMatch = article.categories.some((cat) =>
        cat.title.toLowerCase().includes(lowerTerm)
      );

      return titleMatch || introMatch || tagsMatch || categoryMatch;
    });
  };

  const filteredByCategory = activeCategory
    ? newsData.filter((article) =>
        article.categories.some((cat) => cat.slug === activeCategory)
      )
    : newsData;

  const filteredNews = searchArticles(filteredByCategory, searchTerm);

  const headlines = filteredNews.filter((article) => article.isHeadline);
  const regularNews = filteredNews.filter((article) => !article.isHeadline);

  const handleArticleClick = (slug) => {
    navigate(`/article/${slug}`);
  };

  const handleCategoryClick = (slug) => {
    navigate(`/category/${slug}`);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const getSectionTitle = () => {
    if (searchTerm) return `Search Results (${filteredNews.length})`;
    if (activeCategory) return "Featured";
    return "Breaking News";
  };

  return {
    isLoading,
    activeCategory,
    searchTerm,
    filteredNews,
    headlines,
    regularNews,
    sectionTitle: getSectionTitle(),
    handleCategoryClick,
    handleArticleClick,
    handleSearch,
    handleClearSearch: () => setSearchTerm(""),
    setActiveCategory,
    handleCancelQuery: () => queryClient.cancelQueries(["news"]),
  };
};

export function Home() {
  return <HomeContent />;
}
