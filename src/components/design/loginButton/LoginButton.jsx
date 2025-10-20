import { useNavigate } from "react-router";

export const LoginButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="TaskbarButton"
      title="Login"
      onClick={() => navigate("/login")}
    >
      <img
        className="icon"
        src="/assets/apps/login.png"
        alt="windows 98 login logo"
      />
      <span className="label">Login</span>
    </button>
  );
};
