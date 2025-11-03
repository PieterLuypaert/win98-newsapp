import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/components/design/FormInput/FormInput";
import { Textarea } from "@/components/design/Textarea/Textarea";
import { Button } from "@/components/design/Button/Button";
import "@/components/design/CommentForm/CommentForm.css";

const schema = zod.object({
  name: zod.string().min(1, "Naam is vereist"),
  body: zod.string().min(1, "Commentaar mag niet leeg zijn"),
});

export const CommentFormContainer = ({ onSubmit, onCancel }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", body: "" },
  });

  const submit = async (data) => {
    if (onSubmit) await onSubmit(data);
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit(submit)}>
      <div className="comment-form-header">Add a Comment</div>
      <div className="comment-form-body">
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <FormInput
              label="Name:"
              placeholder="Your name"
              {...field}
              error={errors.name?.message}
            />
          )}
        />

        <div className="form-group">
          <label htmlFor="body">Comment:</label>
          <Controller
            control={control}
            name="body"
            render={({ field }) => (
              <Textarea
                id="body"
                placeholder="Write your comment here..."
                {...field}
              />
            )}
          />
          {errors.body && (
            <div style={{ color: "red", fontSize: 12 }}>
              {errors.body.message}
            </div>
          )}
        </div>

        <div className="form-actions">
          <Button
            type="button"
            variant="win98"
            onClick={() => onCancel && onCancel()}
          >
            Cancel
          </Button>
          <Button type="submit" variant="win98" disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CommentFormContainer;
