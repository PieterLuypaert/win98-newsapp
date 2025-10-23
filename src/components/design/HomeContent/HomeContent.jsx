import React, { useState } from "react";
import { useNavigate } from "react-router";
import { NewsNavigation } from "../NewsNavigation/NewsNavigation";
import { ArticleCard } from "../ArticleCard/ArticleCard";
import { TrendingList } from "../TrendingList/TrendingList";
import "./HomeContent.css";
import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "../../../core/modules/news/news.api";

export const HomeContent = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: newsData = [], isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
  });

  if (isLoading) {
    return (
      <div className="home-content-wrapper">
        <NewsNavigation
          activeCategory={activeCategory}
          onCategoryClick={(slug) => setActiveCategory(slug)}
        />
        <div className="home-content">
          <div className="home-content-main">
            <p>Loading news...</p>
          </div>
          <aside className="home-content-sidebar">
            <TrendingList onArticleClick={() => {}} />
          </aside>
        </div>
      </div>
    );
  }

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

  return (
    <div className="home-content-wrapper">
      <NewsNavigation
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
        onSearch={handleSearch}
      />
      <div className="home-content">
        <div className="home-content-main">
          {searchTerm && filteredNews.length === 0 ? (
            <div className="search-no-results">
              <p>No articles found for "{searchTerm}"</p>
              <button
                className="search-clear-button"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </button>
            </div>
          ) : (
            <>
              <section className="home-section">
                <h2 className="home-section-title">{getSectionTitle()}</h2>
                {headlines.length > 0 ? (
                  headlines.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      isHeadline={true}
                      onClick={() => handleArticleClick(article.slug)}
                      onCategoryClick={(slug) => setActiveCategory(slug)}
                    />
                  ))
                ) : !searchTerm ? (
                  <p>No headline articles available.</p>
                ) : null}
              </section>

              {!searchTerm && (
                <section className="home-section">
                  <h2 className="home-section-title">
                    {activeCategory ? "All Articles" : "Latest News"}
                  </h2>
                  {regularNews.length > 0 ? (
                    regularNews.map((article) => (
                      <ArticleCard
                        key={article.id}
                        article={article}
                        onClick={() => handleArticleClick(article.slug)}
                        onCategoryClick={(slug) => setActiveCategory(slug)}
                      />
                    ))
                  ) : (
                    <p>No articles available.</p>
                  )}
                </section>
              )}

              {searchTerm && regularNews.length > 0 && (
                <section className="home-section">
                  <h2 className="home-section-title">Other Results</h2>
                  {regularNews.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onClick={() => handleArticleClick(article.slug)}
                      onCategoryClick={(slug) => setActiveCategory(slug)}
                    />
                  ))}
                </section>
              )}
            </>
          )}
        </div>

        <aside className="home-content-sidebar">
          <TrendingList onArticleClick={handleArticleClick} />
        </aside>
      </div>
    </div>
  );
};
