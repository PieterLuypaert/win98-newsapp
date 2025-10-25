import React from "react";
import { Button } from "../Button/Button";
import "./LoginForm.css";
import PropTypes from "prop-types";

export const LoginForm = ({
  onSubmit,
  onRegister,
  email = "",
  password = "",
  remember = false,
  onChangeEmail,
  onChangePassword,
  onChangeRemember,
  isLoading = false,
  error = null,

  emailFieldProps = null,
  passwordFieldProps = null,
  rememberFieldProps = null,
}) => {
  const emailValue = emailFieldProps?.value ?? email;
  const emailOnChange =
    emailFieldProps?.onChange ??
    ((e) => onChangeEmail && onChangeEmail(e.target.value));

  const passwordValue = passwordFieldProps?.value ?? password;
  const passwordOnChange =
    passwordFieldProps?.onChange ??
    ((e) => onChangePassword && onChangePassword(e.target.value));

  const rememberValue = rememberFieldProps?.value ?? remember;
  const rememberOnChange =
    rememberFieldProps?.onChange ??
    ((v) => {
      if (onChangeRemember)
        onChangeRemember(typeof v === "boolean" ? v : v.target.checked);
    });

  return (
    <form
      className="login-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit)
          onSubmit({
            email: emailValue,
            password: passwordValue,
            remember: rememberValue,
          });
      }}
    >
      <div className="form-row">
        <label className="form-label">Email:</label>
        <input
          className="win98-input"
          type="email"
          value={emailValue}
          onChange={emailOnChange}
        />
      </div>

      <div className="form-row">
        <label className="form-label">Wachtwoord:</label>
        <input
          className="win98-input"
          type="password"
          value={passwordValue}
          onChange={passwordOnChange}
        />
      </div>

      <div className="form-row">
        <label className="form-label">
          <input
            type="checkbox"
            checked={!!rememberValue}
            onChange={(e) => rememberOnChange(e.target.checked)}
          />{" "}
          Ingelogd blijven
        </label>
      </div>

      <div className="login-actions">
        <Button type="submit" autoFocus disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
        <Button
          type="button"
          variant="win98"
          onClick={() => onRegister && onRegister()}
          title="Create a new account"
        >
          Register
        </Button>
      </div>

      {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
    </form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  onRegister: PropTypes.func,
  email: PropTypes.string,
  password: PropTypes.string,
  remember: PropTypes.bool,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
  onChangeRemember: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  emailFieldProps: PropTypes.object,
  passwordFieldProps: PropTypes.object,
  rememberFieldProps: PropTypes.object,
};

export default LoginForm;
