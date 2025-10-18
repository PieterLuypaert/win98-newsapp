import React from "react";
import "./ArticleBody.css";

export const ArticleBody = ({ content = [], onArticleClick }) => {
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

  return <div className="article-body">{content.map(renderContentBlock)}</div>;
};
