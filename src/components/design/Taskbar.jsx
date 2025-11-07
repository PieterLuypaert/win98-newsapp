import "../styles/layout/taskbar.css";
import { StartButton } from "./design/StartButton/StartButton";
import { LoginButton } from "./design/loginButton/LoginButton";
import { Separator } from "./design/Seperator/Separator";
import { FullscreenButton } from "./design/FullscreenButton/FullscreenButton";
import { TaskbarTabs } from "./design/TaskbarCredits/TaskbarCredits";
import { TaskbarTime } from "./design/TaskbarTime/TaskbarTime";
import { Bookmark } from "./design/Bookmarks/Bookmarks";
import { BookmarkCount } from "./design/Bookmarks/BookmarkCount";

export const Taskbar = ({
  time,
  showFullscreenButton = true,
  onFullscreen,
  bookmarkCount = 0,
}) => {
  return (
    <div className="taskbar">
      <StartButton />
      <Separator />
      <LoginButton />
      <div
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        <Bookmark />
        <BookmarkCount count={bookmarkCount} />
      </div>
      {showFullscreenButton && <FullscreenButton onClick={onFullscreen} />}
      <TaskbarTabs />
      <TaskbarTime time={time} />
    </div>
  );
};

export default Taskbar;
