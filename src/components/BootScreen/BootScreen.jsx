import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./BootScreen.css";

export function BootScreen({ onFinish }) {
  const [exiting, setExiting] = useState(false);
  const [started, setStarted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!started) return;

    audioRef.current = new Audio("/assets/sounds/boot.mp3");
    audioRef.current.volume = 0.5;

    audioRef.current.play().catch((error) => {
      console.error("Audio playback failed:", error);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [started]);

  const handleComplete = () => {
    setExiting(true);

    if (audioRef.current) {
      audioRef.current.pause();
    }

    setTimeout(() => {
      if (typeof onFinish === "function") onFinish();
    }, 600);
  };

  const handleStart = () => {
    setStarted(true);
  };

  if (!started) {
    return (
      <div className="bootscreen">
        <div className="bootscreen-outer">
          <div className="bootscreen-title">
            Web5 - News Application - Pieter Luypaert
          </div>
          <div className="bootscreen-body bootscreen-start-screen">
            <img
              src="/assets/bootscreen.png"
              alt="Start logo"
              className="bootscreen-logo-static"
            />
            <button className="bootscreen-start-button" onClick={handleStart}>
              Click to Start
            </button>
            <div className="bootscreen-hint">Press any key to continue...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="bootscreen"
      initial={{ opacity: 1 }}
      animate={exiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.55 }}
      aria-hidden={exiting}
    >
      <div className="bootscreen-outer">
        <div className="bootscreen-title">
          Web5 - News Application - Pieter Luypaert
        </div>

        <div className="bootscreen-body">
          <motion.img
            src="/assets/bootscreen.png"
            alt="Start logo"
            className="bootscreen-logo"
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          <div className="bootscreen-caption">
            News Application — Starting up...
          </div>

          <div
            className="bootscreen-progress-wrap"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <motion.div
              className="bootscreen-progress"
              initial={{ width: "4%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3.2, ease: [0.2, 0.8, 0.2, 1] }}
              onAnimationComplete={handleComplete}
            />
          </div>

          <div className="bootscreen-subtext">Loading system files...</div>
        </div>
      </div>
    </motion.div>
  );
}
