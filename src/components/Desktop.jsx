import { useState, useEffect } from "react";
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
  const [windows, setWindows] = useState([]);

  const openWindowHandler = (type, data = {}) => {
    const newWindow = {
      id: Date.now(),
      type,
      ...data,
    };
    setWindows([...windows, newWindow]);
  };

  const closeWindow = (id) => {
    setWindows(windows.filter((w) => w.id !== id));
  };

  useEffect(() => {
    if (openWindow && windows.length === 0) {
      if (openWindow === "news") {
        openWindowHandler("news");
      } else if (openWindow === "category" && categorySlug) {
        openWindowHandler("category", { categorySlug });
      } else if (openWindow === "article" && articleSlug) {
        openWindowHandler("article", { articleSlug });
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
          {window.type === "news" && (
            <HomeContent openWindow={openWindowHandler} />
          )}
          {window.type === "category" && (
            <CategoryContent
              categorySlug={window.categorySlug}
              openWindow={openWindowHandler}
            />
          )}
          {window.type === "article" && (
            <ArticleContent articleSlug={window.articleSlug} />
          )}
        </Window>
      ))}
    </div>
  );
};
