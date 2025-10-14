import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import "../styles/layout/programs.css";
import { DesktopIcon } from "./design/DesktopIcon/DesktopIcon";
import { Window } from "./design/Window/Window";
import { HomeContent } from "./design/HomeContent/HomeContent";
import { CategoryContent } from "./design/CategoryContent/CategoryContent";
import { ArticleContent } from "./design/ArticleContent/ArticleContent";
import categoriesData from "../data/categories.json";

export const Desktop = ({
  openWindow,
  categorySlug,
  articleSlug,
  showIcons = false,
}) => {
  const navigate = useNavigate();
  const [windows, setWindows] = useState([]);
  const prevCategorySlugRef = useRef(null);
  const prevArticleSlugRef = useRef(null);
  const isInitialMount = useRef(true);

  const openWindowHandler = (type, data = {}) => {
    const newWindow = {
      id: Date.now(),
      type,
      ...data,
    };
    setWindows((prev) => [...prev, newWindow]);
  };

  const closeWindow = (id, shouldNavigate = true) => {
    const windowToClose = windows.find((w) => w.id === id);
    setWindows(windows.filter((w) => w.id !== id));

    if (shouldNavigate && windowToClose) {
      if (windowToClose.type === "article" && articleSlug) {
        navigate("/news");
      } else if (windowToClose.type === "category" && categorySlug) {
        navigate("/news");
      }
    }
  };

  useEffect(() => {
    if (!openWindow) return;

    if (openWindow === "news" && !windows.some((w) => w.type === "news")) {
      openWindowHandler("news");
    } else if (openWindow === "category" && categorySlug) {
      const hasExistingWindow = windows.some(
        (w) => w.type === "category" && w.categorySlug === categorySlug
      );

      if (!hasExistingWindow) {
        const slugChanged =
          prevCategorySlugRef.current !== null &&
          prevCategorySlugRef.current !== categorySlug;

        // Sluit oude category window en open nieuwe in één update
        setWindows((prev) => {
          const filtered = slugChanged
            ? prev.filter((w) => w.type !== "category")
            : prev;
          return [
            ...filtered,
            {
              id: Date.now(),
              type: "category",
              categorySlug,
            },
          ];
        });

        prevCategorySlugRef.current = categorySlug;
      }
    } else if (openWindow === "article" && articleSlug) {
      const hasExistingWindow = windows.some(
        (w) => w.type === "article" && w.articleSlug === articleSlug
      );

      if (!hasExistingWindow) {
        const slugChanged =
          prevArticleSlugRef.current !== null &&
          prevArticleSlugRef.current !== articleSlug;

        // Sluit oude article window en open nieuwe in één update
        setWindows((prev) => {
          const filtered = slugChanged
            ? prev.filter((w) => w.type !== "article")
            : prev;
          return [
            ...filtered,
            {
              id: Date.now(),
              type: "article",
              articleSlug,
            },
          ];
        });

        prevArticleSlugRef.current = articleSlug;
      }
    }
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
          key={window.id}
          title={
            window.type === "news"
              ? "News Explorer - Home"
              : window.type === "category"
              ? `News Explorer - ${
                  categoriesData.find((c) => c.slug === window.categorySlug)
                    ?.title || "Category"
                }`
              : "News Explorer - Article"
          }
          onClose={() => closeWindow(window.id)}
          width={window.type === "article" ? 900 : 1000}
          height={600}
        >
          {window.type === "news" && <HomeContent />}
          {window.type === "category" && (
            <CategoryContent categorySlug={window.categorySlug} />
          )}
          {window.type === "article" && (
            <ArticleContent articleSlug={window.articleSlug} />
          )}
        </Window>
      ))}
    </div>
  );
};
