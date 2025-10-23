const AUTH_KEY = "app_user";

export const saveUser = (user) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem(AUTH_KEY);
  return user ? JSON.parse(user) : null;
};