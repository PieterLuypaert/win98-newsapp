import React from "react";
import { Button } from "@/components/design/Button/Button";
import { Separator } from "@/components/design/Seperator/Separator";
import "@/components/design/Comments/Comments.css";

export const Comments = ({
  comments = [],
  showForm = false,
  onToggleForm,
  FormComponent = null,
}) => {
  return (
    <div className="comments-section">
      <div className="comments-header">
        <h3 className="comments-title">Comments ({comments.length})</h3>
        <Button
          variant="win98"
          onClick={() => onToggleForm && onToggleForm()}
          className="add-comment-btn"
        >
          {showForm ? "Cancel" : "+ Add Comment"}
        </Button>
      </div>

      <Separator />

      {showForm && FormComponent ? <FormComponent /> : null}

      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <strong className="comment-author">{comment.name}</strong>
              </div>
              <div className="comment-body">{comment.body}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comments;
