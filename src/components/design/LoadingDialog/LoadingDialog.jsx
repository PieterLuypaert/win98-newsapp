import React from "react";
import "./LoadingDialog.css";

const LoadingDialog = ({ message = "Loading...", onCancel }) => {
  return (
    <div className="ld-inline" role="status" aria-live="polite">
      <div className="ld-window ld-window--embedded">
        <div className="ld-body">
          <div className="ld-message">{message}</div>

          <div className="ld-progress-outer" aria-hidden="true">
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
