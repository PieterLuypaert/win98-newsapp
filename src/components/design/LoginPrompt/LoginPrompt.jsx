import React from "react";
import { Button } from "../Button/Button";
import "./LoginPrompt.css";

export const LoginPrompt = ({
  onClose = () => {},
  onLogin = () => {},
  onRegister = () => {},
  title = "Login required",
  children = null,
}) => {
  return (
    <div
      className="login-prompt"
      role="dialog"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      onWheel={(e) => e.stopPropagation()}
    >
      <div className="login-prompt-header">
        <div className="login-prompt-title">{title}</div>
        <button
          className="login-prompt-close"
          aria-label="Close"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <div className="login-prompt-body">
        {children ? (
          children
        ) : (
          <>
            <p>
              Je moet ingelogd zijn om artikelen op te slaan als bladwijzer.
            </p>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <Button variant="win98" onClick={onLogin}>
                Login
              </Button>
              <Button variant="win98" onClick={onRegister}>
                Register
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPrompt;
