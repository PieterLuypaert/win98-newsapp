import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useMutation } from "@tanstack/react-query";
import { fakeRegister } from "../../../core/auth/auth.api.js";
import useAuth from "../Auth/UseAuth";
import { Button } from "../../design/Button/Button";
import { FormEmail } from "../../design/FormEmail/FormEmail";
import { FormPassword } from "../../design/FormPassword/FormPassword";
import { FormName } from "../../design/FormName/FormName";
import { FormGender } from "../../design/FormGender/FormGender";
import { FormCheckbox } from "../../design/FormCheckbox/FormCheckbox";

const schema = zod.object({
  email: zod.email(),
  password: zod.string().min(6, "Password must be at least 6 characters"),
  firstname: zod.string().min(1, "Voornaam is required"),
  lastname: zod.string().min(1, "Achternaam is required"),
  gender: zod.string().optional(),
  terms: zod
    .boolean()
    .refine((v) => v === true, { message: "Je moet akkoord gaan" }),
});

export const RegisterFormContainer = ({ onClose }) => {
  const { setUser } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      gender: "",
      terms: false,
    },
  });

  const { mutate, isLoading, error, isError } = useMutation({
    mutationFn: (data) => fakeRegister(data),
    onSuccess: (user) => {
      setUser(user);
      if (onClose) onClose();
    },
  });

  const onSubmit = (data) => mutate(data);

  const serverError = isError ? error?.message || "Registration failed" : null;

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-row">
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <FormEmail
              className="win98-input"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
            />
          )}
        />
        {errors.email && (
          <div style={{ color: "red", fontSize: 12 }}>
            {errors.email.message}
          </div>
        )}
      </div>

      <div className="form-row">
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <FormPassword
              className="win98-input"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
            />
          )}
        />
        {errors.password && (
          <div style={{ color: "red", fontSize: 12 }}>
            {errors.password.message}
          </div>
        )}
      </div>

      <div className="form-row">
        <Controller
          control={control}
          name="firstname"
          render={({ field }) => (
            <Controller
              control={control}
              name="lastname"
              render={({ field: lastField }) => (
                <FormName
                  firstFieldProps={{
                    value: field.value,
                    onChange: field.onChange,
                    onBlur: field.onBlur,
                    name: field.name,
                  }}
                  lastFieldProps={{
                    value: lastField.value,
                    onChange: lastField.onChange,
                    onBlur: lastField.onBlur,
                    name: lastField.name,
                  }}
                  className="win98-input"
                />
              )}
            />
          )}
        />
        {(errors.firstname || errors.lastname) && (
          <div style={{ color: "red", fontSize: 12 }}>
            {errors.firstname?.message || errors.lastname?.message}
          </div>
        )}
      </div>

      <div className="form-row">
        <Controller
          control={control}
          name="gender"
          render={({ field }) => (
            <FormGender
              className="win98-input"
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              onBlur={field.onBlur}
              name={field.name}
            />
          )}
        />
      </div>

      <div className="form-row">
        <Controller
          control={control}
          name="terms"
          render={({ field }) => (
            <FormCheckbox
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              onBlur={field.onBlur}
              label="Akkoord met voorwaarden"
              name={field.name}
            />
          )}
        />
        {errors.terms && (
          <div style={{ color: "red", fontSize: 12 }}>
            {errors.terms.message}
          </div>
        )}
      </div>

      <div className="login-actions">
        <Button type="submit" autoFocus disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </Button>
        <Button type="button" variant="win98" onClick={onClose}>
          Cancel
        </Button>
      </div>

      {serverError && (
        <div style={{ color: "red", marginTop: 8 }}>{serverError}</div>
      )}
      {isError && !serverError && (
        <div style={{ color: "red", marginTop: 8 }}>{error?.message}</div>
      )}
    </form>
  );
};

export default RegisterFormContainer;
