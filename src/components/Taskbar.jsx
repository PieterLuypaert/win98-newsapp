import "../styles/layout/taskbar.css";
import { StartButton } from "./design/startButton/StartButton";
import { LoginButton } from "./design/loginButton/LoginButton";
import { Separator } from "./design/seperator/Separator";
import { FullscreenButton } from "./design/fullscreenButton/FullscreenButton";
import { TaskbarTabs } from "./design/TaskbarCredits/TaskbarCredits";
import { TaskbarTime } from "./design/TaskbarTime/TaskbarTime";
import { Bookmark } from "./design/Bookmarks/Bookmarks";

export const Taskbar = ({
  time,
  showFullscreenButton = true,
  onFullscreen,
}) => {
  return (
    <div className="taskbar">
      <StartButton />
      <Separator /> 
      <LoginButton />
      <Bookmark />
      {showFullscreenButton && <FullscreenButton onClick={onFullscreen} />}
      <TaskbarTabs />
      <TaskbarTime time={time} />
    </div>
  );
};
