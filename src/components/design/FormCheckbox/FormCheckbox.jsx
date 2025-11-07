import React from "react";
import "./FormCheckbox.css";
import PropTypes from "prop-types";

export const FormCheckbox = ({
  name = "checkbox",
  id,
  label = "",
  required = false,
  className = "",
  checked = false,
  onChange,
  ...rest
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
          checked={!!checked}
          onChange={onChange}
          {...rest}
        />{" "}
        {label}
      </label>
    </div>
  );
};

FormCheckbox.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default FormCheckbox;
