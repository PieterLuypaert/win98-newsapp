import React from "react";
import "../loginModal/LoginModal.css";
import { Button } from "../Button/Button";
import { FormGender } from "../FormGender/FormGender";
import { FormName } from "../FormName/FormName";
import { FormPassword } from "../FormPassword/FormPassword";
import { FormEmail } from "../FormEmail/FormEmail";
import { FormCheckbox } from "../FormCheckbox/FormCheckbox"; 

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
          <FormEmail name="email" required className="win98-input" />
        </div>

        <div className="form-row">
          <div className="form-row">
            <FormPassword name="password" required className="win98-input" />
          </div>
        </div>

        <div className="form-row">
          <FormName
            firstNameName="firstname"
            lastNameName="lastname"
            required
            className="win98-input"
          />
        </div>

        <div className="form-row">
          <FormGender name="gender" required className="win98-input" />
        </div>

        <div className="form-row">
          <FormCheckbox name="terms" label="Akkoord met voorwaarden" required />
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
