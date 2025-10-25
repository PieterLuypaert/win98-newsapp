import React, { useState } from "react";
import { motion } from "framer-motion";
import "./BootScreen.css";

export default function BootScreen({ onFinish }) {
  const [exiting, setExiting] = useState(false);

  const handleComplete = () => {
    setExiting(true);
    setTimeout(() => {
      if (typeof onFinish === "function") onFinish();
    }, 600);
  };

  return (
    <motion.div
      className="bootscreen"
      initial={{ opacity: 1 }}
      animate={exiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.55 }}
      aria-hidden={exiting}
    >
      <div className="bootscreen-outer">
        <div className="bootscreen-title">Web5 - News Application - Pieter Luypaert</div>

        <div className="bootscreen-body">
          <motion.img
            src="/assets/bootscreen.png"
            alt="Start logo"
            className="bootscreen-logo"
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          <div className="bootscreen-caption">News Application — Starting up...</div>

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
