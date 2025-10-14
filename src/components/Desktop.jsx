import { useState, useEffect, useRef, useCallback } from "react";
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

  const openWindowHandler = (type, data = {}) => {
    const newWindow = {
      id: Date.now(),
      type,
      ...data,
    };
    setWindows((prev) => [...prev, newWindow]);
  };

  const closeWindow = useCallback(
    (id) => {
      setWindows((prev) => {
        const windowToClose = prev.find((w) => w.id === id);
        const filtered = prev.filter((w) => w.id !== id);

        // Alleen navigeren als dit het laatste venster van dat type is
        if (windowToClose) {
          const hasOtherSameType = filtered.some(
            (w) => w.type === windowToClose.type
          );
          if (!hasOtherSameType) {
            if (
              windowToClose.type === "article" ||
              windowToClose.type === "category"
            ) {
              setTimeout(() => navigate("/news"), 0);
            }
          }
        }

        return filtered;
      });
    },
    [navigate]
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

        // Filter oude article vensters en voeg nieuwe toe
        const filtered = prevWindows.filter((w) => w.type !== "article");
        return [...filtered, { id: Date.now(), type: "article", articleSlug }];
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
