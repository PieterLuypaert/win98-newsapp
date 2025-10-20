import "../styles/layout/taskbar.css";
// gebruik juiste mapnaam 'StartButton' (case-sensitive filesystems)
import { StartButton } from "./design/StartButton/StartButton";
import { LoginButton } from "./design/loginButton/LoginButton";
import { Separator } from "./design/Seperator/Separator";
import { FullscreenButton } from "./design/FullscreenButton/FullscreenButton";
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
