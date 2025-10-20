import React from "react";
import "./FormEmail.css";

export const FormEmail = ({
  name = "email",
  id,
  className = "win98-input",
  required = false,
  placeholder = "",
}) => {
  const inputId = id || `${name}-id`;

  return (
    <div className="form-row form-email">
      <label className="form-label" htmlFor={inputId}>
        Email:
      </label>
      <input
        id={inputId}
        name={name}
        type="email"
        className={className}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default FormEmail;
