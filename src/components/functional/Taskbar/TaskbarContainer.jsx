import React from "react";
import Taskbar from "../../Taskbar";
import { useBookmarks } from "../Bookmarks/BookmarksProvider";

const TaskbarContainer = ({
  time,
  showFullscreenButton = true,
  onFullscreen,
}) => {
  const { count = 0 } = useBookmarks() || {};
  return (
    <Taskbar
      time={time}
      showFullscreenButton={showFullscreenButton}
      onFullscreen={onFullscreen}
      bookmarkCount={count}
    />
  );
};

export default TaskbarContainer;
