export const fakeLogin = async ({ email, password }) => {
  await new Promise((r) => setTimeout(r, 700));
  if (!email || !password) {
    const err = new Error("Invalid credentials");
    err.status = 400;
    throw err;
  }
  return {
    id: "user-1",
    email,
    name: email.split("@")[0],
    token: "fake-jwt-token",
  };
};

export const fakeRegister = async ({
  email,
  password,
  firstname,
  lastname,
  gender,
  terms,
}) => {
  await new Promise((r) => setTimeout(r, 900));
  if (!email || !password || !firstname || !lastname || !terms) {
    const err = new Error("Missing registration fields");
    err.status = 400;
    throw err;
  }
  return {
    id: `user-${Math.floor(Math.random() * 10000)}`,
    email,
    name: `${firstname} ${lastname}`,
    token: "fake-jwt-token",
    gender,
  };
};
