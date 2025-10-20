import React from "react";
import "./LoginModal.css";
import { LoginForm } from "../LoginForm/LoginForm";

export const LoginModal = ({ onClose, onRegister, embedded = false }) => {
  const handleFormSubmit = (formData) => {
    onClose();
  };

  const inner = (
    <>
      <div className="login-icon">
        <img src="/assets/apps/inlog.png" alt="" />
      </div>
      <LoginForm onSubmit={handleFormSubmit} onRegister={onRegister} />
    </>
  );

  if (embedded) {
    // Alleen de body renderen wanneer we al in een Window zitten
    return <div className="login-body embedded">{inner}</div>;
  }

  // Normale standalone modal (overlay + dialog)
  return (
    <div className="login-overlay" role="dialog" aria-modal="true">
      <div className="login-dialog" role="document">
        <div className="login-title">Welcome to Windows</div>

        <div className="login-body">{inner}</div>
      </div>
    </div>
  );
};
