import React from "react";
import "./LoginModal.css";

export const LoginModal = ({
  embedded,
  onClose,
  onRegister,
  FormComponent = null,
}) => {
  const inner = (
    <>
      <div className="login-icon">
        <img src="/assets/apps/inlog.png" alt="" />
      </div>
      {FormComponent ? (
        <FormComponent onRegister={onRegister} onClose={onClose} />
      ) : null}
    </>
  );

  if (embedded) {
    return <div className="login-body embedded">{inner}</div>;
  }

  return null;
};

