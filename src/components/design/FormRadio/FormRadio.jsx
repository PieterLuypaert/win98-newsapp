import React from "react";
import PropTypes from "prop-types";
import "./FormRadio.css";

export const FormRadio = ({
  name,
  label,
  options = [],
  value,
  onChange,
  error,
  required = false,
}) => {
  return (
    <div className={`form-row form-radio ${className}`.trim()}>
      {label && <label className="form-label">{label}</label>}
      <div className="radio-options">
        {options.map((option) => (
          <label key={option.value} className="radio-option">
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange && onChange(e.target.value)}
              required={required}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {error && <div className="form-error">{error}</div>}
    </div>
  );
};

FormRadio.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
};
