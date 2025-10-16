import React from "react";
import "./Textarea.css";

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
