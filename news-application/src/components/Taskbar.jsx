import "../styles/layout/taskbar.css";
import { StartButton } from "./design/startButton/StartButton";
import { Separator } from "./design/seperator/Separator";
import { FullscreenButton } from "./design/fullscreenButton/FullscreenButton";
import { TaskbarTabs } from "./design/taskbar/TaskbarCredits";
import { TaskbarTime } from "./design/TaskbarTime/TaskbarTime";

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
