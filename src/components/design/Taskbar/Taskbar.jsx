import React from "react";
import "./Taskbar.css";
import { TaskbarCredits } from "@/components/design/TaskbarCredits/TaskbarCredits";
import { TaskbarTime } from "@/components/design/TaskbarTime/TaskbarTime";
import { Separator } from "@/components/design/Seperator/Separator";
import { FullscreenButton } from "@/components/design/FullscreenButton/FullscreenButton";

export const Taskbar = ({ time, onFullscreen, showFullscreenButton }) => {
  return (
    <div className="taskbar">
      <TaskbarCredits />
      <Separator />
      <TaskbarTime time={time} />
      {showFullscreenButton && <FullscreenButton onClick={onFullscreen} />}
    </div>
  );
};
