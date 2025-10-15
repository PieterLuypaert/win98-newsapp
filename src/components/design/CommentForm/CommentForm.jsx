import { useState } from "react";
import { Button } from "../button/Button";
import "./CommentForm.css";

export const CommentForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    body: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", body: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <div className="comment-form-header">Add a Comment</div>
      <div className="comment-form-body">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="win98-input"
            placeholder="Your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">Comment:</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
            rows="5"
            className="win98-input"
            placeholder="Write your comment here..."
          />
        </div>

        <div className="form-actions">
          {onCancel && (
            <Button type="button" variant="win98" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" variant="win98">
            Post Comment
          </Button>
        </div>
      </div>
    </form>
  );
};
