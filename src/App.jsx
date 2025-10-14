import "./styles/index.css";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { Taskbar } from "./components/Taskbar";

function App() {
  const [time, setTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  return (
    <div className="app">
      <Outlet />
      <Taskbar
        time={formattedTime}
        showFullscreenButton={true}
        onFullscreen={handleFullscreen}
      />
    </div>
  );
}

export default App;
