import React from "react";
import "./LoginModal.css";
import { Button } from "../button/Button";
import { Window } from "../Window/Window";

export const LoginModal = ({ onClose, onRegister }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="login-overlay" role="dialog" aria-modal="true">
      <div className="login-dialog" role="document">
        <div className="login-title">Welcome to Windows</div>

        <div className="login-body">
          <div className="login-icon">
            <img src="/assets/apps/login.png" alt="" />
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label className="form-label">Email:</label>
              <input className="win98-input" type="email" name="email" />
            </div>

            <div className="form-row">
              <label className="form-label">Wachtwoord:</label>
              <input className="win98-input" type="password" name="password" />
            </div>

            <div className="form-row">
              <label className="form-label">
                <input type="checkbox" name="terms"  /> Ingelogd blijven
              </label>
            </div>

            <div className="login-actions">
              <Button type="submit" autoFocus>
                Login
              </Button>
              <Button
                type="button"
                variant="win98"
                onClick={onRegister}
                title="Create a new account"
              >
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
