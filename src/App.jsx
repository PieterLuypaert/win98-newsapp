import "./styles/index.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
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
    const pathParts = location.pathname.split("/").filter(Boolean);

    if (pathParts[0] === "news") {
      return { openWindow: "news", showIcons: true };
    } else if (pathParts[0] === "category" && pathParts[1]) {
      return {
        openWindow: "category",
        categorySlug: pathParts[1],
        showIcons: true,
      };
    } else if (pathParts[0] === "article" && pathParts[1]) {
      return {
        openWindow: "article",
        articleSlug: pathParts[1],
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
