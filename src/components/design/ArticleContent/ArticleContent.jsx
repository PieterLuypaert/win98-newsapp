import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { RelatedArticles } from "../RelatedArticles/RelatedArticles";
import { Comments } from "../Comments/Comments";
import authorsData from "../../../data/authors.json";
import "./ArticleContent.css";
import { ArticleHeader } from "../ArticleHeader/ArticleHeader";
import { ArticleBody } from "../ArticleBody/ArticleBody";
import { ArticleSidebar } from "../ArticleSidebar/ArticleSidebar";
import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "../../../core/modules/news/news.api";

export const ArticleContent = ({ articleSlug }) => {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef(null);

  const { data: news = [], isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
  });

  const article = news.find((a) => a.slug === articleSlug);
  const author = article
    ? authorsData.find((auth) => auth.id === article.authorId)
    : null;

  const relatedArticles = article
    ? news
        .filter((a) => {
          if (a.id === article.id) return false;
          return a.tags.some((tag) =>
            article.tags.some((aTag) => aTag.slug === tag.slug)
          );
        })
        .slice(0, 3)
    : [];

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const element = contentRef.current;
      const scrollTop = element.scrollTop;
      const scrollHeight = element.scrollHeight - element.clientHeight;
      const progress = (scrollTop / scrollHeight) * 100;

      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    };

    const element = contentRef.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
      return () => element.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
    setScrollProgress(0);
  }, [articleSlug]);

  if (isLoading) {
    return <div className="article-content">Loading article...</div>;
  }

  if (!article) {
    return (
      <div className="article-error">
        Article not found. Please check the URL or return to the homepage.
      </div>
    );
  }

  const handleArticleClick = (slug) => {
    navigate(`/article/${slug}`);
  };

  return (
    <div className="article-content" ref={contentRef}>
      <div className="article-main">
        <ArticleHeader article={article} />
        <ArticleBody
          content={article.content}
          onArticleClick={handleArticleClick}
        />
        <RelatedArticles
          articles={relatedArticles}
          onArticleClick={handleArticleClick}
        />
      </div>

      {author && (
        <ArticleSidebar
          author={author}
          articleId={article.id}
          scrollProgress={scrollProgress}
        />
      )}

      {article && <Comments postId={article.id} />}
    </div>
  );
};
