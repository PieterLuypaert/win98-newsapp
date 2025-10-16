import { useState } from "react";
import { Button } from "../button/Button";
import "./CommentForm.css";

export const CommentForm = () => {
  return (
    <form className="comment-form">
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
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">Comment:</label>
          <textarea
            id="body"
            name="body"
            rows="5"
            className="win98-input"
            placeholder="Write your comment here..."
          />
        </div>

        <div className="form-actions">
          <Button type="button" variant="win98">
            Cancel
          </Button>
          <Button type="submit" variant="win98">
            Post Comment
          </Button>
        </div>
      </div>
    </form>
  );
};
