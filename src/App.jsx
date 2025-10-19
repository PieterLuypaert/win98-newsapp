import "./styles/index.css";
import React, { useState, useEffect } from "react";
import { useLocation, matchPath } from "react-router";
import { Taskbar } from "./components/Taskbar";
import { Desktop } from "./components/Desktop";

function App() {
  const [time, setTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formattedTime = time.toLocaleTimeString("nl-BE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const getRouteInfo = () => {
    const categoryMatch = matchPath(
      { path: "/category/:categorySlug" },
      location.pathname
    );
    const articleMatch = matchPath(
      { path: "/article/:articleSlug" },
      location.pathname
    );

    if (location.pathname === "/news") {
      return { openWindow: "news", showIcons: true };
    } else if (location.pathname === "/bookmarks") {
      return { openWindow: "bookmarks", showIcons: true };
    } else if (categoryMatch) {
      return {
        openWindow: "category",
        categorySlug: categoryMatch.params.categorySlug,
        showIcons: true,
      };
    } else if (articleMatch) {
      return {
        openWindow: "article",
        articleSlug: articleMatch.params.articleSlug,
        showIcons: true,
      };
    } else {
      return { showIcons: true };
    }
  };

  const routeInfo = getRouteInfo();

  return (
    <div className="app">
      <Desktop {...routeInfo} />
      <Taskbar
        time={formattedTime}
        showFullscreenButton={true}
        onFullscreen={handleFullscreen}
      />
    </div>
  );
}

export default App;
