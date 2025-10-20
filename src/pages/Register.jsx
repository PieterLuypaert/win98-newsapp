import React from "react";
import { useNavigate } from "react-router";
import { RegisterModal } from "../components/design/registerModal/RegisterModal";

export default function Register() {
  const navigate = useNavigate();

  return (
    <section className="page register-page">
      <RegisterModal
        embedded
        onClose={() => navigate("/", { replace: true })}
      />
    </section>
  );
}
