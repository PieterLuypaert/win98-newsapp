import React from "react";
import "./LoadingDialog.css";

const LoadingDialog = ({ message = "Loading...", onCancel }) => {
  return (
    <div className="ld-overlay" role="dialog" aria-live="polite">
      <div className="ld-window">
        <div className="ld-title">Loading</div>

        <div className="ld-body">
          <div className="ld-message">{message}</div>

          <div className="ld-progress-outer" aria-hidden>
            <div className="ld-progress">
              {[...Array(8)].map((_, i) => (
                <span
                  key={i}
                  className="ld-block"
                  style={{ animationDelay: `${i * 0.12}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingDialog;
