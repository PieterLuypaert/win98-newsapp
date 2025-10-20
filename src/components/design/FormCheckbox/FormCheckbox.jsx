import React from "react";
import "./FormCheckbox.css";

export const FormCheckbox = ({
  name = "checkbox",
  id,
  label = "",
  required = false,
  className = "",
}) => {
  const inputId = id || `${name}-id`;

  return (
    <div className="form-row form-checkbox">
      <label className="form-label" htmlFor={inputId}>
        <input
          id={inputId}
          name={name}
          type="checkbox"
          className={`checkbox-input ${className}`.trim()}
          required={required}
        />{" "}
        {label}
      </label>
    </div>
  );
};

export default FormCheckbox;
