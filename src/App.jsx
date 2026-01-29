import "@styles/index.css";
import React, { useState } from "react";
import { Outlet, useLocation, matchPath, useNavigate } from "react-router";
import { TaskbarContainer } from "@functional/Taskbar/TaskbarContainer";
import { Desktop } from "@/components/Desktop";
import { Window } from "@design/window/window";
import { BootScreen } from "@/components/BootScreen/BootScreen";
import { CRTOverlay } from "@/components/Effects/CRTOverlay";
import { routes } from "./config/routes";
import { useWindowMaximize } from "./hooks/useWindowMaximize";

export function App() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showBoot, setShowBoot] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const win = routes.find((route) =>
    matchPath({ path: route.path }, location.pathname),
  )?.config || { open: false };

  const {
    isWindowMaximized,
    toggle: toggleWindowMaximize,
    reset,
  } = useWindowMaximize(win);

  const handleFullscreen = () => {
    const allowed = ["news", "article", "category", "bookmarks"];
    if (win.open && allowed.includes(win.type)) {
      toggleWindowMaximize();
      return;
    }

    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleCloseWindow = () => {
    reset();
    navigate("/", { replace: true });
  };

  const handleToggleWindowMaximize = () => {
    const allowed = ["news", "article", "category", "bookmarks"];
    if (win.open && allowed.includes(win.type)) {
      toggleWindowMaximize();
    }
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
            maximized={isWindowMaximized}
            onToggleMaximize={handleToggleWindowMaximize}
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
      <CRTOverlay />
    </div>
  );
}
