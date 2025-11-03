import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { fakeLogin } from "@core/auth/auth.api.js";
import useAuth from "@functional/Auth/UseAuth";
import { FormInput } from "@design/FormInput/FormInput";
import { FormCheckbox } from "@design/FormCheckbox/FormCheckbox";
import { Button } from "@design/Button/Button";

const schema = zod.object({
  email: zod.string().email("Invalid email address"),
  password: zod.string().min(1, "Password is required"),
  remember: zod.boolean().optional(),
});

export const LoginFormContainer = ({ onSuccessClose, onRegister }) => {
  const { setUser } = useAuth();

  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const { errors } = formState;

  const { mutate, isLoading, error, isError } = useMutation({
    mutationFn: ({ email, password }) => fakeLogin({ email, password }),
    onSuccess: (user) => {
      setUser(user);
      if (onSuccessClose) onSuccessClose();
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  const serverError = isError ? error?.message || "Login failed" : null;

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <FormInput
            type="email"
            label="Email:"
            {...field}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <FormInput
            type="password"
            label="Wachtwoord:"
            {...field}
            error={errors.password?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="remember"
        render={({ field }) => (
          <FormCheckbox
            checked={!!field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            label="Ingelogd blijven"
            name={field.name}
          />
        )}
      />

      <div className="login-actions">
        <Button type="submit" autoFocus disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
        <Button
          type="button"
          variant="win98"
          onClick={() => onRegister && onRegister()}
        >
          Register
        </Button>
      </div>

      {serverError && (
        <div style={{ color: "red", marginTop: 8 }}>{serverError}</div>
      )}
    </form>
  );
};

export default LoginFormContainer;
