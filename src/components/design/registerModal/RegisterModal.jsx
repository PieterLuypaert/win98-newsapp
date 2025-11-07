import React from "react";
import "./../loginModal/LoginModal.css";

export const RegisterModal = ({
  embedded = false,
  onClose,
  FormComponent = null,
}) => {
  const inner = (
    <>
      <div className="login-icon">
        <img src="/assets/apps/inlog.png" alt="" />
      </div>
      {FormComponent ? <FormComponent onClose={onClose} /> : null}
    </>
  );

  if (embedded) {
    return <div className="login-body embedded">{inner}</div>;
  }

  return null;
};

