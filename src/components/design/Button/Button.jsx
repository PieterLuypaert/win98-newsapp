import React from "react";
import "@design/Button/Button.css";

export const Button = ({
  children,
  onClick,
  className = "",
  autoFocus = false,
  variant = "default",
  ...props
}) => {
  const baseClass = variant === "win98" ? "win98-button" : "button";

  return (
    <button
      className={`${baseClass} ${className}`}
      onClick={onClick}
      autoFocus={autoFocus}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
