import React from "react";
import "./Textarea.css";
import PropTypes from "prop-types";

export const Textarea = ({
  id,
  name,
  rows = 5,
  placeholder = "",
  className = "",
  value,
  onChange,
}) => {
  return (
    <textarea
      id={id}
      name={name}
      rows={rows}
      className={`win98-input ${className}`.trim()}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

Textarea.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  rows: PropTypes.number,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
