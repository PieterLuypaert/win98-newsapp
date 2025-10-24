import React from "react";
import "./FormEmail.css";
import PropTypes from "prop-types";

export const FormEmail = ({
  name = "email",
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
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

FormEmail.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default FormEmail;
