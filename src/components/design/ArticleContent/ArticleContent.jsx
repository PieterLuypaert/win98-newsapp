import React from "react";
import newsData from "../../../data/news.json";
import authorsData from "../../../data/authors.json";
import "./ArticleContent.css";

export const ArticleContent = ({ articleSlug }) => {
  const article = newsData.find((a) => a.slug === articleSlug);

  if (!article) {
    return <div className="article-error">Article not found</div>;
  }

  const author = authorsData.find((a) => a.id === article.authorId);
  const date = new Date(article.timestamp).toLocaleDateString("nl-BE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="article-content">
      <article className="article-main">
        <header className="article-header">
          <h1 className="article-title">{article.title}</h1>
          <div className="article-meta">
            <span className="article-date">{date}</span>
            {article.categories && (
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
        </header>

        <div className="article-body">
          {article.content.map((block, index) => {
            switch (block.type) {
              case "subtitle":
                return (
                  <h2 key={index} className="article-subtitle">
                    {block.content}
                  </h2>
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
                    <footer className="article-quote-author">
                      — {block.author}, {block.position}
                    </footer>
                  </blockquote>
                );
              default:
                return null;
            }
          })}
        </div>
      </article>

      {author && (
        <aside className="article-sidebar">
          <div className="author-card">
            <div className="author-card-header">About the Author</div>
            <div className="author-card-content">
              <img
                src={author.avatar}
                alt={author.firstName}
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
                      target="_blank"
                      rel="noopener noreferrer"
                      className="author-social-link"
                    >
                      Twitter
                    </a>
                  )}
                  {author.social.linkedin && (
                    <a
                      href={author.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="author-social-link"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </aside>
      )}
    </div>
  );
};
