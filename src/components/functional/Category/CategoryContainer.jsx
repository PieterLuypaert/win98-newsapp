import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import CategoryContent from "@/components/design/CategoryContent/CategoryContent";
import { fetchNews } from "@/core/modules/news/news.api";
import { fetchCategories } from "@/core/modules/categories/category.api";
import playSound from "@/core/utils/playSound";

const CategoryContainer = ({ categorySlug }) => {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState(categorySlug);
  const [searchTerm, setSearchTerm] = useState("");
  const prevSearchTerm = useRef(searchTerm);

  useEffect(() => setActiveCategory(categorySlug), [categorySlug]);

  const { data: news = [], isLoading: newsLoading } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
  });

  const { data: categories = [], isLoading: catLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const isLoading = newsLoading || catLoading;

  // Filtering and search logic moved here (functional layer)
  const filteredByCategory = news.filter(
    (article) =>
      !activeCategory ||
      article.categories.some((cat) => cat.slug === activeCategory)
  );

  const lowerTerm = searchTerm ? searchTerm.toLowerCase() : "";
  const searchArticles = (items) => {
    if (!lowerTerm) return items;
    return items.filter((article) => {
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

  const articlesFiltered = searchArticles(filteredByCategory);

  useEffect(() => {
    if (
      searchTerm &&
      prevSearchTerm.current !== searchTerm &&
      articlesFiltered.length === 0
    ) {
      playSound("/assets/sounds/error.wav");
    }
    prevSearchTerm.current = searchTerm;
  }, [searchTerm, articlesFiltered.length]);

  const headlines = articlesFiltered.filter((a) => a.isHeadline);
  const regularNews = articlesFiltered.filter((a) => !a.isHeadline);

  const category = categories.find((c) => c.slug === activeCategory);

  // If client requested a non-existing category, show an error (handled by functional layer)
  if (activeCategory && !isLoading && !category) {
    return <div className="category-error">Category not found</div>;
  }

  const handleArticleClick = (slug) => {
    navigate(`/article/${slug}`);
  };

  const handleCategoryClick = (slug) => {
    navigate(slug ? `/category/${slug}` : "/news");
    setActiveCategory(slug);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <CategoryContent
      isLoading={isLoading}
      categories={categories}
      activeCategory={activeCategory}
      onCategoryClick={handleCategoryClick}
      headlines={headlines}
      regularNews={regularNews}
      category={category}
      searchTerm={searchTerm}
      onSearch={handleSearch}
      onArticleClick={handleArticleClick}
    />
  );
};

export default CategoryContainer;
