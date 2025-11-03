import "../styles/layout/taskbar.css";
import { StartButton } from "./design/StartButton/StartButton";
import { LoginButton } from "./design/loginButton/LoginButton";
import { Separator } from "./design/Seperator/Separator";
import { FullscreenButton } from "./design/FullscreenButton/FullscreenButton";
import { TaskbarTabs } from "./design/TaskbarCredits/TaskbarCredits";
import { TaskbarTimeContainer } from "./functional/TaskbarTime/TaskbarTimeContainer";
import { Bookmark } from "./design/Bookmarks/Bookmarks";
import { useBookmarks } from "./functional/Bookmarks/BookmarksProvider";
import { BookmarkCount } from "./design/Bookmarks/BookmarkCount.jsx";

export const Taskbar = ({ showFullscreenButton = true, onFullscreen }) => {
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
      <TaskbarTimeContainer />
    </div>
  );
};

export default Taskbar;
