import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useMutation } from "@tanstack/react-query";
import { fakeRegister } from "../../../core/auth/auth.api.js";
import useAuth from "../Auth/UseAuth";
import { Button } from "../../design/Button/Button";
import { FormInput } from "../../design/FormInput/FormInput";
import { FormSelect } from "../../design/FormSelect/FormSelect";
import { FormCheckbox } from "../../design/FormCheckbox/FormCheckbox";

const schema = zod.object({
  email: zod.string().email("Invalid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters"),
  firstname: zod.string().min(1, "Voornaam is required"),
  lastname: zod.string().min(1, "Achternaam is required"),
  gender: zod.string().optional(),
  terms: zod
    .boolean()
    .refine((v) => v === true, { message: "Je moet akkoord gaan" }),
});

const genderOptions = [
  { value: "male", label: "Man" },
  { value: "female", label: "Vrouw" },
  { value: "other", label: "Anders" },
  { value: "prefer_not_to_say", label: "Liever niet zeggen" },
];

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
        name="firstname"
        render={({ field }) => (
          <FormInput
            type="text"
            label="Voornaam:"
            placeholder="Voornaam"
            {...field}
            error={errors.firstname?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="lastname"
        render={({ field }) => (
          <FormInput
            type="text"
            label="Achternaam:"
            placeholder="Achternaam"
            {...field}
            error={errors.lastname?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="gender"
        render={({ field }) => (
          <FormSelect
            label="Geslacht:"
            options={genderOptions}
            {...field}
            onChange={(e) => field.onChange(e.target.value)}
            error={errors.gender?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="terms"
        render={({ field }) => (
          <FormCheckbox
            checked={!!field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            label="Akkoord met voorwaarden"
            name={field.name}
          />
        )}
      />
      {errors.terms && (
        <div style={{ color: "red", fontSize: 12 }}>{errors.terms.message}</div>
      )}

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
    </form>
  );
};

export default RegisterFormContainer;
