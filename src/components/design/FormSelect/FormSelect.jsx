import React from "react";
import PropTypes from "prop-types";
import "./FormSelect.css";

export const FormSelect = React.forwardRef(
  (
    {
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
    },
    ref
  ) => {
    const inputId = id || `${name}-select`;

    return (
      <div className="form-row form-select">
        {label && (
          <label className="form-label" htmlFor={inputId}>
            {label}
          </label>
        )}
        <select
          ref={ref}
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
  }
);

FormSelect.displayName = "FormSelect";

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
