import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CommentForm from "@/components/design/CommentForm/CommentForm";

const schema = zod.object({
  name: zod.string().min(1, "Naam is vereist"),
  body: zod.string().min(1, "Commentaar mag niet leeg zijn"),
  email: zod
    .string()
    .email("Ongeldig emailadres")
    .optional()
    .or(zod.literal("")),
});

export const CommentFormContainer = ({ onSubmit, onCancel }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", body: "", email: "" },
  });

  const submit = async (data) => {
    if (onSubmit)
      await onSubmit({
        name: data.name,
        body: data.body,
        email: data.email || undefined,
      });
  };

  return (
    <Controller
      control={control}
      name="name"
      render={({ field: nameField }) => (
        <Controller
          control={control}
          name="body"
          render={({ field: bodyField }) => (
            <CommentForm
              name={nameField.value}
              body={bodyField.value}
              onChangeName={(v) => nameField.onChange(v)}
              onChangeBody={(v) => bodyField.onChange(v)}
              onSubmit={handleSubmit(submit)}
              onCancel={onCancel}
              isSubmitting={isSubmitting}
              errors={{
                name: errors.name?.message,
                body: errors.body?.message,
              }}
            />
          )}
        />
      )}
    />
  );
};

export default CommentFormContainer;
