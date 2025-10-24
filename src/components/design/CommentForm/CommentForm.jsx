import React from "react";
import { Button } from "../Button/Button";
import { Textarea } from "../Textarea/Textarea";
import "./CommentForm.css";
import PropTypes from "prop-types";

export const CommentForm = ({
  name = "",
  body = "",
  onChangeName,
  onChangeBody,
  onSubmit,
  onCancel,
  isSubmitting = false,
  errors = {},
}) => {
  return (
    <form
      className="comment-form"
      onSubmit={(e) => {
        e.preventDefault();
        if (onSubmit) onSubmit();
      }}
    >
      <div className="comment-form-header">Add a Comment</div>
      <div className="comment-form-body">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="win98-input"
            placeholder="Your name"
            value={name}
            onChange={(e) => onChangeName && onChangeName(e.target.value)}
          />
          {errors.name && (
            <div style={{ color: "red", fontSize: 12 }}>{errors.name}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="body">Comment:</label>
          <Textarea
            id="body"
            name="body"
            placeholder="Write your comment here..."
            value={body}
            onChange={(e) => onChangeBody && onChangeBody(e.target.value)}
          />
          {errors.body && (
            <div style={{ color: "red", fontSize: 12 }}>{errors.body}</div>
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

CommentForm.propTypes = {
  name: PropTypes.string,
  body: PropTypes.string,
  onChangeName: PropTypes.func,
  onChangeBody: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  isSubmitting: PropTypes.bool,
  errors: PropTypes.object,
};

export default CommentForm;
