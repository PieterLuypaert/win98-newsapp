import "../styles/layout/taskbar.css";
import { StartButton } from "./taskbar/StartButton";
import { Separator } from "./taskbar/Separator";
import { FullscreenButton } from "./taskbar/FullscreenButton";
import { TaskbarTabs } from "./taskbar/TaskbarTabs";
import { TaskbarTime } from "./taskbar/TaskbarTime";

export const Taskbar = ({
  time,
  showFullscreenButton = true,
  onFullscreen,
}) => {
  return (
    <div className="taskbar">
      <StartButton />
      <Separator />
      {showFullscreenButton && <FullscreenButton onClick={onFullscreen} />}
      <TaskbarTabs />
      <TaskbarTime time={time} />
    </div>
  );
};
