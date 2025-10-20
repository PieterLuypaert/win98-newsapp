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
    return <div className="login-body embedded">{inner}</div>;
  }
};
