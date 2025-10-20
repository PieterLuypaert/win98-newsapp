import "./styles/index.css";
import React, { useState, useEffect } from "react";
import { Outlet, useLocation, matchPath, useNavigate } from "react-router";
import { Taskbar } from "./components/Taskbar";
import { Desktop } from "./components/Desktop";
import { Window } from "./components/design/window/window";

function App() {
  const [time, setTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

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
  
  const routes = [
    {
      path: "/news",
      config: {
        open: true,
        type: "news",
        title: "News Explorer - Home",
        width: 1000,
        height: 600,
      },
    },
    {
      path: "/bookmarks",
      config: {
        open: true,
        type: "bookmarks",
        title: "Bookmarks",
        width: 800,
        height: 560,
      },
    },
    {
      path: "/category/:categorySlug",
      config: {
        open: true,
        type: "category",
        title: "News Explorer - Category",
        width: 1000,
        height: 600,
      },
    },
    {
      path: "/article/:articleSlug",
      config: {
        open: true,
        type: "article",
        title: "News Explorer - Article",
        width: 1000,
        height: 600,
      },
    },
  ];

  const win = routes.find((route) =>
    matchPath({ path: route.path }, location.pathname)
  )?.config || { open: false };

  const handleCloseWindow = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="app">
      <Desktop showIcons={true} />

      <main className="page-content">
        {win.open ? (
          <Window
            title={win.title}
            onClose={handleCloseWindow}
            width={win.width}
            height={win.height}
          >
            <Outlet />
          </Window>
        ) : null}
      </main>

      <Taskbar
        time={formattedTime}
        showFullscreenButton={true}
        onFullscreen={handleFullscreen}
      />
    </div>
  );
}

export default App;
