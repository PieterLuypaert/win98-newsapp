import React, { useState, useEffect } from "react";
import { playSound } from "@core/utils/playSound";
import "./Clippy.css";

export const Clippy = ({
  message = "Welcome to my News App!",
  autoShow = true,
  soundEnabled = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (autoShow && !hasShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasShown(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [autoShow, hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleClippyClick = () => {
    if (soundEnabled) {
      playSound("/assets/sounds/clippy.mp3");
    }
  };

  if (!isVisible) return null;

  return (
    <div className="clippy-container">
      <div className="clippy-speech-bubble">
        <div className="clippy-speech-header">
          <span>Clippy says...</span>
          <button
            className="clippy-close"
            onClick={handleClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="clippy-speech-content">{message}</div>
      </div>
      <div
        className="clippy-character"
        onClick={handleClippyClick}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleClippyClick();
          }
        }}
        title="Klik op mij voor een geluidje!"
      >
        <img src="/assets/clippy.gif" alt="Clippy" />
      </div>
    </div>
  );
};
