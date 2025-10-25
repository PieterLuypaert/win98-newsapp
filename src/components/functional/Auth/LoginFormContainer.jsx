import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { fakeLogin } from "../../../core/auth/auth.api.js";
import useAuth from "./UseAuth";
import LoginForm from "../../design/LoginForm/LoginForm";

const schema = zod.object({
  email: zod.email(),
  password: zod.string().min(1,),
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

  const onSubmitFromDesign = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <Controller
      control={control}
      name="email"
      render={({ field: emailField }) => (
        <Controller
          control={control}
          name="password"
          render={({ field: passwordField }) => (
            <Controller
              control={control}
              name="remember"
              render={({ field: rememberField }) => (
                <LoginForm
                  emailFieldProps={emailField}
                  passwordFieldProps={passwordField}
                  rememberFieldProps={rememberField}
                  onSubmit={onSubmitFromDesign}
                  onRegister={onRegister}
                  isLoading={isLoading}
                  error={
                    isError
                      ? error?.message || null
                      : errors.email?.message ||
                        errors.password?.message ||
                        null
                  }
                />
              )}
            />
          )}
        />
      )}
    />
  );
};

export default LoginFormContainer;
