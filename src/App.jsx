import "@styles/index.css";
import React, { useState, useEffect } from "react";
import { Outlet, useLocation, matchPath, useNavigate } from "react-router";
import { TaskbarContainer } from "@functional/Taskbar/TaskbarContainer";
import { Desktop } from "@/components/Desktop";
import { Window } from "@design/window/window";
import { BootScreen } from "@/components/BootScreen/BootScreen";

export function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showBoot, setShowBoot] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

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
    {
      path: "/login",
      config: {
        open: true,
        type: "login",
        title: "Login",
        width: 360,
        height: 180,
      },
    },
    {
      path: "/register",
      config: {
        open: true,
        type: "register",
        title: "Register",
        width: 360,
        height: 180,
      },
    },
  ];

  const win = routes.find((route) =>
    matchPath({ path: route.path }, location.pathname)
  )?.config || { open: false };

  const handleCloseWindow = () => {
    navigate("/", { replace: true });
  };

  const handleBootFinish = () => {
    setShowBoot(false);
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

      <TaskbarContainer
        showFullscreenButton={true}
        onFullscreen={handleFullscreen}
      />

      {showBoot && <BootScreen onFinish={handleBootFinish} />}
    </div>
  );
}
