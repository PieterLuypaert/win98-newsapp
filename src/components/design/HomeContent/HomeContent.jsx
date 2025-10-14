import React, { useState } from "react";
import { useNavigate } from "react-router";
import { NewsNavigation } from "../NewsNavigation/NewsNavigation";
import { ArticleCard } from "../ArticleCard/ArticleCard";
import { TrendingList } from "../TrendingList/TrendingList";
import newsData from "../../../data/news.json";
import trendingData from "../../../data/trending.json";
import "./HomeContent.css";

export const HomeContent = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);

  const filteredNews = activeCategory
    ? newsData.filter((article) =>
        article.categories.some((cat) => cat.slug === activeCategory)
      )
    : newsData;

  const headlines = filteredNews.filter((article) => article.isHeadline);
  const regularNews = filteredNews.filter((article) => !article.isHeadline);

  const handleArticleClick = (slug) => {
    navigate(`/article/${slug}`);
  };

  const handleCategoryClick = (slug) => {
    navigate(`/category/${slug}`);
  };

  return (
    <div className="home-content-wrapper">
      <NewsNavigation
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
      />
      <div className="home-content">
        <div className="home-content-main">
          <section className="home-section">
            <h2 className="home-section-title">
              {activeCategory ? "Featured" : "Breaking News"}
            </h2>
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
            ) : (
              <p>No headline articles available.</p>
            )}
          </section>

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
        </div>

        <aside className="home-content-sidebar">
          <TrendingList
            items={trendingData}
            onArticleClick={handleArticleClick}
          />
        </aside>
      </div>
    </div>
  );
};
