import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import { RelatedArticles } from "../RelatedArticles/RelatedArticles";
import newsData from "../../../data/news.json";
import authorsData from "../../../data/authors.json";
import "./ArticleContent.css";

export const ArticleContent = ({ articleSlug }) => {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef(null);

  const article = newsData.find((a) => a.slug === articleSlug);
  const author = article
    ? authorsData.find((auth) => auth.id === article.authorId)
    : null;

  // dit berekent artikels op basis van de category tags
  const relatedArticles = article
    ? newsData
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

  const renderContentBlock = (block, index) => {
    switch (block.type) {
      case "subtitle":
        return (
          <h3 key={index} className="article-subtitle">
            {block.content}
          </h3>
        );
      case "paragraph":
        return (
          <div
            key={index}
            className="article-paragraph"
            dangerouslySetInnerHTML={{ __html: block.content }}
          />
        );
      case "image":
        return (
          <figure key={index} className="article-figure">
            <img
              src={block.url}
              alt={block.caption}
              className="article-image"
            />
            {block.caption && (
              <figcaption className="article-caption">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );
      case "callout":
        return (
          <div key={index} className="article-callout">
            {block.content}
          </div>
        );
      case "quote":
        return (
          <blockquote key={index} className="article-quote">
            <p className="article-quote-text">"{block.quote}"</p>
            <cite className="article-quote-author">
              — {block.author}
              {block.position && `, ${block.position}`}
            </cite>
          </blockquote>
        );
      default:
        return null;
    }
  };

  return (
    <div className="article-content" ref={contentRef}>
      <div className="article-main">
        <article className="article-header">
          <h1 className="article-title">{article.title}</h1>
          <div className="article-meta">
            <span className="article-date">
              {new Date(article.timestamp).toLocaleDateString("nl-BE", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {article.categories && article.categories.length > 0 && (
              <div className="article-categories">
                {article.categories.map((cat) => (
                  <span key={cat.slug} className="article-category">
                    {cat.title}
                  </span>
                ))}
              </div>
            )}
          </div>
          {article.mainImage && (
            <img
              src={article.mainImage}
              alt={article.title}
              className="article-main-image"
            />
          )}
          <p className="article-intro">{article.intro}</p>
        </article>

        <div className="article-body">
          {article.content.map((block, index) =>
            renderContentBlock(block, index)
          )}
        </div>

        <RelatedArticles
          articles={relatedArticles}
          onArticleClick={handleArticleClick}
        />
      </div>

      {author && (
        <aside className="article-sidebar">
          <div className="author-card">
            <div className="author-card-header">About the Author</div>
            <div className="author-card-content">
              <img
                src={author.avatar}
                alt={`${author.firstName} ${author.lastName}`}
                className="author-avatar"
              />
              <h3 className="author-name">
                {author.firstName} {author.lastName}
              </h3>
              <p className="author-bio">{author.bio}</p>
              {author.social && (
                <div className="author-social">
                  {author.social.twitter && (
                    <a
                      href={author.social.twitter}
                      className="author-social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
                    </a>
                  )}
                  {author.social.linkedin && (
                    <a
                      href={author.social.linkedin}
                      className="author-social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <ProgressBar progress={scrollProgress} />
        </aside>
      )}
    </div>
  );
};
