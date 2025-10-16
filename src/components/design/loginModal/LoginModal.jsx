import React from "react";
import "./LoginModal.css";
import { LoginForm } from "../LoginForm/LoginForm";

export const LoginModal = ({ onClose, onRegister }) => {
  const handleFormSubmit = (formData) => {
    onClose();
  };

  return (
    <div className="login-overlay" role="dialog" aria-modal="true">
      <div className="login-dialog" role="document">
        <div className="login-title">Welcome to Windows</div>

        <div className="login-body">
          <div className="login-icon">
            <img src="/assets/apps/inlog.png" alt="" />
          </div>
          <LoginForm onSubmit={handleFormSubmit} onRegister={onRegister} />
        </div>
      </div>
    </div>
    
  );
};
