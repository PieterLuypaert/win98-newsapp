import React from "react";
import "../BookmarkButton/BookmarkButton.css";

export function BookmarkCount({ count = 0 }) {
  if (!count || count <= 0) return null;
  return (
    <span className="bookmark-count" aria-hidden="false">
      {count}
    </span>
  );
}

