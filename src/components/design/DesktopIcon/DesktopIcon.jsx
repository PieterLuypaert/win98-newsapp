import React, { forwardRef } from "react";
import "./DesktopIcon.css";

export const DesktopIcon = forwardRef(
  (
    { icon, label, isImage = false, isDragging = false, onMouseDown, onClick },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`desktop-icon ${isDragging ? "dragging" : ""}`}
        onMouseDown={onMouseDown}
        onClick={onClick}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <div className="desktop-icon-image">
          {isImage ? (
            <img src={icon} alt={label} className="desktop-icon-img" />
          ) : (
            <span>{icon}</span>
          )}
        </div>
        <span className="desktop-icon-label">{label}</span>
      </div>
    );
  }
);

DesktopIcon.displayName = "DesktopIcon";
