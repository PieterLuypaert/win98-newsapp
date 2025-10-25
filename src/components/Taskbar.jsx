import "../styles/layout/taskbar.css";
import { StartButton } from "./design/StartButton/StartButton";
import { LoginButton } from "./design/loginButton/LoginButton";
import { Separator } from "./design/Seperator/Separator";
import { FullscreenButton } from "./design/FullscreenButton/FullscreenButton";
import { TaskbarTabs } from "./design/TaskbarCredits/TaskbarCredits";
import { TaskbarTime } from "./design/TaskbarTime/TaskbarTime";
import { Bookmark } from "./design/Bookmarks/Bookmarks";
import { useBookmarks } from "./functional/Bookmarks/BookmarksProvider";
import { BookmarkCount } from "./design/Bookmarks/BookmarkCount.jsx";

export const Taskbar = ({
  time,
  showFullscreenButton = true,
  onFullscreen,
}) => {
  const { count: bookmarkCount } = useBookmarks();
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
