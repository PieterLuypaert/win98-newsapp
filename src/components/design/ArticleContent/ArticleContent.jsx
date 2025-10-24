import React from "react";
import { RelatedArticles } from "../RelatedArticles/RelatedArticles";
import "./ArticleContent.css";
import { ArticleHeader } from "../ArticleHeader/ArticleHeader";
import { ArticleBody } from "../ArticleBody/ArticleBody";
import { ArticleSidebar } from "../ArticleSidebar/ArticleSidebar";

export const ArticleContent = ({
  article,
  author,
  relatedArticles = [],
  scrollProgress = 0,
  onArticleClick = () => {},
  BookmarkComponent = null,
  CommentsComponent = null,
  contentRef = null,
}) => {
  if (!article) {
    return (
      <div className="article-error">
        Article not found. Please check the URL or return to the homepage.
      </div>
    );
  }

  return (
    <div className="article-content" ref={contentRef}>
      <div className="article-main">
        <ArticleHeader article={article} />
        <ArticleBody
          content={article.content}
          onArticleClick={onArticleClick}
        />
        <RelatedArticles
          articles={relatedArticles}
          onArticleClick={onArticleClick}
        />
      </div>

      {author && (
        <ArticleSidebar
          author={author}
          articleId={article.id}
          scrollProgress={scrollProgress}
          BookmarkComponent={BookmarkComponent}
        />
      )}

      {CommentsComponent && article && (
        <CommentsComponent postId={article.id} />
      )}
    </div>
  );
};

export default ArticleContent;
