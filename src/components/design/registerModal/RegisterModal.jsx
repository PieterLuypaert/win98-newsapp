import React from "react";
import "../loginModal/LoginModal.css"; 
import { Button } from "../button/Button";

export const RegisterModal = ({ onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="login-overlay" role="dialog" aria-modal="true">
      <div className="login-dialog" role="document">
        <div className="login-title">Create an Account</div>

        <div className="login-body">
          <div className="login-icon">
            <img src="/assets/apps/login.png" alt="" />
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label className="form-label">Email:</label>
              <input className="win98-input" type="email" name="email" required />
            </div>

            <div className="form-row">
              <label className="form-label">Wachtwoord:</label>
              <input className="win98-input" type="password" name="password" required />
            </div>

            <div className="form-row">
              <label className="form-label">Voornaam:</label>
              <input className="win98-input" type="text" name="firstname" required />
            </div>

            <div className="form-row">
              <label className="form-label">Achternaam:</label>
              <input className="win98-input" type="text" name="lastname" required />
            </div>

            <div className="form-row">
              <label className="form-label">Geslacht:</label>
              <select className="win98-input" name="gender" required>
                <option value="">Selecteer...</option>
                <option value="male">Man</option>
                <option value="female">Vrouw</option>
                <option value="other">Anders</option>
                <option value="prefer_not_to_say">Liever niet zeggen</option>
              </select>
            </div>

            <div className="form-row">
              <label className="form-label">
                <input type="checkbox" name="terms" required /> Akkoord met voorwaarden
              </label>
            </div>

            <div className="login-actions">
              <Button type="submit" autoFocus>
                Register
              </Button>
              <Button type="button" variant="win98" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
