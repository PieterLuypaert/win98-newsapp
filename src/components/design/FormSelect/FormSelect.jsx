import React from "react";
import PropTypes from "prop-types";
import "./FormSelect.css";

export const FormSelect = ({
  name,
  id,
  label,
  options = [],
  placeholder = "Selecteer...",
  className = "win98-input",
  required = false,
  value,
  onChange,
  error,
  ...rest
}) => {
  const inputId = id || `${name}-select`;

  return (
    <div className="form-row form-select">
      {label && (
        <label className="form-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <select
        id={inputId}
        name={name}
        className={className}
        required={required}
        value={value}
        onChange={onChange}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="form-error">{error}</div>}
    </div>
  );
};

FormSelect.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default FormSelect;
