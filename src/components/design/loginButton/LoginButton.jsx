import { useState } from "react";
import { LoginModal } from "../loginModal/LoginModal";
import { RegisterModal } from "../registerModal/RegisterModal";

export const LoginButton = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <>
      <button
        className="TaskbarButton"
        title="Login"
        onClick={() => setShowLogin(true)}
      >
        <img
          className="icon"
          src="/assets/apps/login.png"
          alt="windows 98 login logo"
        />
        <span className="label">Login</span>
      </button>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onRegister={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}

      {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
    </>
  );
};
