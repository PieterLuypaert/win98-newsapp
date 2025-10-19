import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import "../styles/layout/programs.css";
import { DesktopIcon } from "./design/DesktopIcon/DesktopIcon";
import { Window } from "./design/Window/Window";
import { HomeContent } from "./design/HomeContent/HomeContent";
import { CategoryContent } from "./design/CategoryContent/CategoryContent";
import { ArticleContent } from "./design/ArticleContent/ArticleContent";
import BookmarksContent from "./design/Bookmarks/BookmarksContent";
import categoriesData from "../data/categories.json";

export const Desktop = ({
  openWindow,
  categorySlug,
  articleSlug,
  showIcons = false,
}) => {
  const navigate = useNavigate();
  const [windows, setWindows] = useState([]);

  // memoized opener so we can call it from an external event listener
  const openWindowHandler = useCallback((type, data = {}) => {
    const newWindow = {
      id: Date.now(),
      type,
      ...data,
    };
    setWindows((prev) => [...prev, newWindow]);
  }, []);

  // listen for global requests to open an app window (e.g. taskbar buttons)
  useEffect(() => {
    const handler = (e) => {
      const type = e?.detail?.type;
      const data = e?.detail?.data || {};
      if (type) {
        openWindowHandler(type, data);
      }
    };
    window.addEventListener("openAppWindow", handler);
    return () => window.removeEventListener("openAppWindow", handler);
  }, [openWindowHandler]);

  const closeWindow = useCallback(
    (id) => {
      setWindows((prev) => prev.filter((w) => w.id !== id));

      setWindows((prev) => {
        const windowToClose = prev.find((w) => w.id === id);
        if (!windowToClose) {
          const currentWindows = prev;
          const hasArticle = currentWindows.some((w) => w.type === "article");
          const hasCategory = currentWindows.some((w) => w.type === "category");

          if (!hasArticle && !hasCategory && articleSlug) {
            setTimeout(() => navigate("/news"), 0);
          } else if (
            !hasCategory &&
            categorySlug &&
            openWindow === "category"
          ) {
            setTimeout(() => navigate("/news"), 0);
          }
        }
        return prev;
      });
    },
    [navigate, articleSlug, categorySlug, openWindow]
  );

  useEffect(() => {
    if (!openWindow) return;

    setWindows((prevWindows) => {
      if (openWindow === "news") {
        const hasNewsWindow = prevWindows.some((w) => w.type === "news");
        if (hasNewsWindow) return prevWindows;
        return [...prevWindows, { id: Date.now(), type: "news" }];
      } else if (openWindow === "category" && categorySlug) {
        const hasMatchingWindow = prevWindows.some(
          (w) => w.type === "category" && w.categorySlug === categorySlug
        );
        if (hasMatchingWindow) return prevWindows;

        const filtered = prevWindows.filter((w) => w.type !== "category");
        return [
          ...filtered,
          { id: Date.now(), type: "category", categorySlug },
        ];
      } else if (openWindow === "article" && articleSlug) {
        const hasMatchingWindow = prevWindows.some(
          (w) => w.type === "article" && w.articleSlug === articleSlug
        );
        if (hasMatchingWindow) return prevWindows;

        const filtered = prevWindows.filter((w) => w.type !== "article");
        return [...filtered, { id: Date.now(), type: "article", articleSlug }];
      } else if (openWindow === "bookmarks") {
        const hasBookmarks = prevWindows.some((w) => w.type === "bookmarks");
        if (hasBookmarks) return prevWindows;
        return [...prevWindows, { id: Date.now(), type: "bookmarks" }];
      }

      return prevWindows;
    });
  }, [openWindow, categorySlug, articleSlug]);

  return (
    <div className="desktop">
      {showIcons && (
        <div className="desktop-icons">
          <DesktopIcon
            icon="/assets/apps/newspaper.png"
            label="News"
            onClick={() => openWindowHandler("news")}
            isImage={true}
          />
        </div>
      )}

      {windows.map((window) => (
        <Window
          key={`${window.type}-${window.id}`}
          title={
            window.type === "news"
              ? "News Explorer - Home"
              : window.type === "category"
              ? `News Explorer - ${
                  categoriesData.find((c) => c.slug === window.categorySlug)
                    ?.title || "Category"
                }`
              : window.type === "article"
              ? "News Explorer - Article"
              : window.type === "bookmarks"
              ? "Bookmarks"
              : "News Explorer"
          }
          onClose={() => closeWindow(window.id)}
          width={
            window.type === "article"
              ? 900
              : window.type === "bookmarks"
              ? 800
              : 1000
          }
          height={window.type === "bookmarks" ? 560 : 600}
        >
          {window.type === "news" && <HomeContent />}
          {window.type === "category" && (
            <CategoryContent categorySlug={window.categorySlug} />
          )}
          {window.type === "article" && (
            <ArticleContent articleSlug={window.articleSlug} />
          )}
          {window.type === "bookmarks" && <BookmarksContent />}
        </Window>
      ))}
    </div>
  );
};
