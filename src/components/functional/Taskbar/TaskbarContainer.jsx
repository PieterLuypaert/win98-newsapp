import React from "react";
import Taskbar from "@/components/Taskbar";
import { useBookmarks } from "@functional/Bookmarks/BookmarksProvider";

const TaskbarContainer = ({ showFullscreenButton = true, onFullscreen }) => {
  const { count = 0 } = useBookmarks() || {};
  return (
    <Taskbar
      showFullscreenButton={showFullscreenButton}
      onFullscreen={onFullscreen}
      bookmarkCount={count}
    />
  );
};

export default TaskbarContainer;
