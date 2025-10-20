import React from "react";
import "../loginModal/LoginModal.css";
import { Button } from "../Button/Button";
import { FormGender } from "../FormGender/FormGender"; // <-- toegevoegd

export const RegisterModal = ({ onClose, embedded = false }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  const inner = (
    <>
      <div className="login-icon">
        <img src="/assets/apps/inlog.png" alt="" />
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="form-label">Email:</label>
          <input className="win98-input" type="email" name="email" required />
        </div>

        <div className="form-row">
          <label className="form-label">Wachtwoord:</label>
          <input
            className="win98-input"
            type="password"
            name="password"
            required
          />
        </div>

        <div className="form-row">
          <label className="form-label">Voornaam:</label>
          <input
            className="win98-input"
            type="text"
            name="firstname"
            required
          />
        </div>

        <div className="form-row">
          <label className="form-label">Achternaam:</label>
          <input className="win98-input" type="text" name="lastname" required />
        </div>

        <div className="form-row">
          <FormGender name="gender" required className="win98-input" />
        </div>

        <div className="form-row">
          <label className="form-label">
            <input type="checkbox" name="terms" required /> Akkoord met
            voorwaarden
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
    </>
  );

  if (embedded) {
    return <div className="login-body embedded">{inner}</div>;
  }
};
