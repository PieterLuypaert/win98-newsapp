import React from "react";
import "./FormPassword.css";
import PropTypes from "prop-types";

export const FormPassword = ({
  name = "password",
  id,
  className = "win98-input",
  required = false,
  placeholder = "",
  value,
  onChange,
  ...rest
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
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

FormPassword.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default FormPassword;
