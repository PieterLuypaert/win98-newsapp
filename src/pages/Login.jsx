import React from "react";
import { useNavigate } from "react-router";
import { LoginModal } from "@/components/design/loginModal/LoginModal";
import { LoginFormContainer } from "@/components/functional/Auth/LoginFormContainer";

export function Login() {
  const navigate = useNavigate();

  return (
    <section className="page login-page">
      <LoginModal
        embedded
        onClose={() => navigate("/", { replace: true })}
        onRegister={() => navigate("/register", { replace: true })}
        FormComponent={(props) => (
          <LoginFormContainer
            onSuccessClose={() => navigate("/", { replace: true })}
            onRegister={() => navigate("/register", { replace: true })}
            {...props}
          />
        )}
      />
    </section>
  );
}
