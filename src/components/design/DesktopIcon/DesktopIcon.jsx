import React from "react";
import "./DesktopIcon.css";

export const DesktopIcon = ({ icon, label, onClick, isImage = false }) => {
  return (
    <div className="desktop-icon" onClick={onClick}>
      <div className="desktop-icon-image">
        {isImage ? (
          <img src={icon} alt={label} className="desktop-icon-img" />
        ) : (
          icon
        )}
      </div>
      <div className="desktop-icon-label">{label}</div>
    </div>
  );
};
