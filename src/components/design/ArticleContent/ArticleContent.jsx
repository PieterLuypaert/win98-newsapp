import React from "react";
import { RelatedArticles } from "@/components/design/RelatedArticles/RelatedArticles";
import "@/components/design/ArticleContent/ArticleContent.css";
import { ArticleHeader } from "@/components/design/ArticleHeader/ArticleHeader";
import { ArticleBody } from "@/components/design/ArticleBody/ArticleBody";
import { ArticleSidebar } from "@/components/design/ArticleSidebar/ArticleSidebar";

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

      <ArticleSidebar
        author={author}
        articleId={article.id}
        scrollProgress={scrollProgress}
        BookmarkComponent={BookmarkComponent}
      />

      {CommentsComponent && article && (
        <CommentsComponent postId={article.id} />
      )}
    </div>
  );
};

export default ArticleContent;
