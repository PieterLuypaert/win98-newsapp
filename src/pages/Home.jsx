import React from "react";
import { Desktop } from "../components/Desktop";
import { Taskbar } from "../components/Taskbar";
import { useTime } from "../scripts/js/useTime";
import { toggleFullscreen } from "../scripts/js/fullscreen";

export default function Home() {
  const { formattedTime } = useTime();

  return (
    <>
      <Desktop />
      <Taskbar
        time={formattedTime}
        showFullscreenButton={true}
        onFullscreen={toggleFullscreen}
      />
    </>
  );
}
