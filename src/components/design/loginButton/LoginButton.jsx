import { useNavigate } from "react-router";
import useAuth from "../../functional/Auth/UseAuth";

export const LoginButton = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  if (auth?.isAuthenticated) {
    return (
      <button
        className="TaskbarButton"
        title="Logout"
        onClick={() => auth.logout()}
      >
        <img className="icon" src="/assets/apps/login.png" alt="logout icon" />
        <span className="label">Logout</span>
      </button>
    );
  }

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
