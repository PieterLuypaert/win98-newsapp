import React from "react";
import { useNavigate } from "react-router";
import { LoginModal } from "../components/design/loginModal/LoginModal";

export default function Login() {
  const navigate = useNavigate();

  return (
    <section className="page login-page">
      <LoginModal
        embedded
        onClose={() => navigate("/", { replace: true })}
        onRegister={() => navigate("/register", { replace: true })}
      />
    </section>
  );
}
