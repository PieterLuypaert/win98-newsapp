import React, { useEffect, useRef } from "react";
import "./HomeContent.css";
import { NewsNavigation } from "@/components/design/NewsNavigation/NewsNavigation";
import { ArticleCard } from "@/components/design/ArticleCard/ArticleCard";
import { TrendingList } from "@/components/design/TrendingList/TrendingList";
import { Button } from "@/components/design/Button/Button";
import LoadingDialog from "@/components/design/LoadingDialog/LoadingDialog";
import { useHomeLogic } from "@/pages/Home";
import playSound from "@/core/utils/playSound";

export const HomeContent = () => {
  const {
    isLoading,
    activeCategory,
    searchTerm,
    filteredNews,
    headlines,
    regularNews,
    sectionTitle,
    handleCategoryClick,
    handleArticleClick,
    handleSearch,
    handleClearSearch,
    setActiveCategory,
    handleCancelQuery,
  } = useHomeLogic();

  const prevSearchTerm = useRef(searchTerm);

  useEffect(() => {
    if (
      searchTerm &&
      prevSearchTerm.current !== searchTerm &&
      filteredNews.length === 0
    ) {
      playSound("/assets/sounds/erro.mp3");
    }
    prevSearchTerm.current = searchTerm;
  }, [searchTerm, filteredNews.length]);

  if (isLoading) {
    return (
      <div className="home-content-wrapper">
        <NewsNavigation
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
        />
        <div className="home-content">
          <div className="home-content-main">
            <LoadingDialog
              embedded
              message="Loading news..."
              onCancel={handleCancelQuery}
            />
          </div>
          <aside className="home-content-sidebar">
            <TrendingList onArticleClick={handleArticleClick} />
          </aside>
        </div>
      </div>
    );
  }

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
              <Button
                onClick={handleClearSearch}
                className="search-clear-button"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <>
              <section className="home-section">
                <h2 className="home-section-title">{sectionTitle}</h2>
                {headlines.length > 0 ? (
                  headlines.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      isHeadline={true}
                      onClick={() => handleArticleClick(article.slug)}
                      onCategoryClick={setActiveCategory}
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
                        onCategoryClick={setActiveCategory}
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
                      onCategoryClick={setActiveCategory}
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
