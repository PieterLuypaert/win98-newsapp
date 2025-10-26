import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useNavigate } from "react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ArticleContent from "../../design/ArticleContent/ArticleContent";
import { fetchNews } from "../../../core/modules/news/news.api";
import { fetchAuthors } from "../../../core/modules/authors/authors.api";
import BookmarkButtonContainer from "../../functional/Bookmarks/BookmarkButtonContainer";
import CommentsContainer from "../Comments/CommentsContainer";
import LoadingDialog from "../../design/LoadingDialog/LoadingDialog";

const ArticleContainer = ({ articleSlug }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const contentRef = useRef(null);
  const [contentNode, setContentNode] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { data: news = [], isLoading: newsLoading } = useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
  });

  const { data: authors = [], isLoading: authorsLoading } = useQuery({
    queryKey: ["authors"],
    queryFn: fetchAuthors,
  });

  const isLoading = newsLoading || authorsLoading;

  const article = useMemo(
    () => news.find((a) => a.slug === articleSlug),
    [news, articleSlug]
  );
  const author = useMemo(
    () =>
      article ? authors.find((auth) => auth.id === article.authorId) : null,
    [article, authors]
  );

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return news
      .filter((a) => {
        if (a.id === article.id) return false;
        return a.tags.some((tag) =>
          article.tags.some((aTag) => aTag.slug === tag.slug)
        );
      })
      .slice(0, 3);
  }, [news, article]);

  const setContentRef = useCallback((node) => {
    contentRef.current = node;
    setContentNode(node);
  }, []);

  const handleScroll = useCallback(() => {
    const el = contentRef.current;
    if (!el) return;
    const scrollTop = el.scrollTop;
    const scrollHeight = el.scrollHeight - el.clientHeight;
    const progress = (scrollTop / Math.max(scrollHeight, 1)) * 100;
    setScrollProgress(Math.min(Math.max(progress, 0), 100));
  }, []);

  useEffect(() => {
    if (!contentNode) return undefined;
    contentNode.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => contentNode.removeEventListener("scroll", handleScroll);
  }, [contentNode, handleScroll]);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
    setScrollProgress(0);
  }, [articleSlug]);

  const handleArticleClick = useCallback(
    (slug) => {
      navigate(`/article/${slug}`);
    },
    [navigate]
  );

  if (isLoading) {
    return (
      <div className="article-content">
        <LoadingDialog
          message="Loading article..."
          onCancel={() => {
            queryClient.cancelQueries(["news"]);
            queryClient.cancelQueries(["authors"]);
          }}
        />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="article-error">
        Article not found. Please check the URL or return to the homepage.
      </div>
    );
  }

  return (
    <ArticleContent
      article={article}
      author={author}
      relatedArticles={relatedArticles}
      scrollProgress={scrollProgress}
      onArticleClick={handleArticleClick}
      BookmarkComponent={(props) => (
        <BookmarkButtonContainer
          articleSlug={article.slug}
          articleId={article.id}
          {...props}
        />
      )}
      CommentsComponent={CommentsContainer}
      contentRef={setContentRef}
    />
  );
};

export default ArticleContainer;
