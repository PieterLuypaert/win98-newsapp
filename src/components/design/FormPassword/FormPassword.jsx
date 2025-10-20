import React from "react";
import "./FormPassword.css";

export const FormPassword = ({
  name = "password",
  id,
  className = "win98-input",
  required = false,
  placeholder = "",
}) => {
  const inputId = id || `${name}-id`;

  return (
    <div className="form-row form-password">
      <label className="form-label" htmlFor={inputId}>
        Wachtwoord:
      </label>
      <input
        id={inputId}
        name={name}
        type="password"
        className={className}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default FormPassword;
