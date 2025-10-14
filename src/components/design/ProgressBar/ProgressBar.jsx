import React from "react";
import "./ProgressBar.css";

export const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-label">Reading Progress</div>
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="progress-bar-percentage">{Math.round(progress)}%</div>
    </div>
  );
};
