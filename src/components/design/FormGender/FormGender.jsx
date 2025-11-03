import React from "react";
import "./FormGender.css";
import PropTypes from "prop-types";

export const FormGender = ({
  name = "gender",
  required = false,
  id,
  value,
  onChange,
  ...rest
}) => {
  const inputId = id || `${name}-select`;

  return (
    <div className="form-row form-gender">
      <label className="form-label" htmlFor={inputId}>
        Geslacht:
      </label>
      <select
        id={inputId}
        name={name}
        className={`${className}`.trim()}
        required={required}
        value={value}
        onChange={onChange}
        {...rest}
      >
      </select>
    </div>
  );
};

FormGender.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
  id: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default FormGender;
