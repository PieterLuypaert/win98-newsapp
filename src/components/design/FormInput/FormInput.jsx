import React from "react";
import "./FormInput.css";
import PropTypes from "prop-types";

export const FormInput = ({
  type = "text",
  name,
  id,
  label,
  className = "win98-input",
  placeholder = "",
  required = false,
  value,
  onChange,
  error,
  ...rest
}) => {
  const inputId = id || `${name}-id`;

  return (
    <div className="form-row form-input">
      {label && (
        <label className="form-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        className={className}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {error && <div className="form-error">{error}</div>}
    </div>
  );
};

FormInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
};

export default FormInput;
