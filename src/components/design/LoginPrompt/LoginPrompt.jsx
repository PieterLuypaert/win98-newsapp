import React, { useEffect } from "react";
import { Button } from "../Button/Button";
import "./LoginPrompt.css";

export const LoginPrompt = ({
  onClose = () => {},
  onLogin = () => {},
  onRegister = () => {},
  title = "Login required",
  children = null,
}) => {
  useEffect(() => {
    document.body.setAttribute("data-has-modal", "login-prompt");
    return () => document.body.removeAttribute("data-has-modal");
  }, []);

  const stop = (e) => {
    try {
      const target = e.target;
      if (
        target &&
        (target.closest?.(".login-prompt-close") ||
          target.closest?.("[data-allow-propagation]"))
      ) {
        return;
      }
    } catch (err) {
    }
    e.stopPropagation();
  };

  return (
    <div
      className="login-prompt"
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onClickCapture={stop}
      onMouseDownCapture={stop}
      onPointerDownCapture={stop}
      onTouchStartCapture={stop}
      onTouchMoveCapture={stop}
      onWheelCapture={stop}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={stop}
      onTouchStart={stop}
      onTouchMove={stop}
      onWheel={stop}
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
