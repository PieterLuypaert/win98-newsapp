import React, { useState } from "react";
import { Button } from "../button/Button";
import "./LoginForm.css";

export const LoginForm = ({ onSubmit, onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit({ email, password, remember });
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label className="form-label">Email:</label>
        <input
          className="win98-input"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-row">
        <label className="form-label">Wachtwoord:</label>
        <input
          className="win98-input"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="form-row">
        <label className="form-label">
          <input
            type="checkbox"
            name="terms"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />{" "}
          Ingelogd blijven
        </label>
      </div>

      <div className="login-actions">
        <Button type="submit" autoFocus>
          Login
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
    </form>
  );
};
