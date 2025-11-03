import React, { useState } from "react";
import "./Clippy.css";

export const Clippy = ({ message = "Welcome to my News App!" }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="clippy-container">
      <div className="clippy-speech-bubble">
        <div className="clippy-speech-header">
          <span>Welcome to my News App!</span>
          <button
            className="clippy-close"
            onClick={() => setIsVisible(false)}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="clippy-speech-content">{message}</div>
      </div>
      <div className="clippy-character">
        <img src="/assets/clippy.gif" alt="Clippy" />
      </div>
    </div>
  );
};
