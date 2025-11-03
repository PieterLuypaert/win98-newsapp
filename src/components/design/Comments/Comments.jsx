import React from "react";
import { Button } from "@design/Button/Button";
import { Separator } from "@design/Seperator/Separator";
import useAuth from "@functional/Auth/UseAuth";
import "@design/Comments/Comments.css";

export const Comments = ({
  comments = [],
  showForm = false,
  onToggleForm,
  FormComponent = null,
}) => {
  const { user } = useAuth();

  return (
    <div className="comments-section">
      <div className="comments-header">
        <h3 className="comments-title">Comments ({comments.length})</h3>
        {user && (
          <Button
            variant="win98"
            onClick={() => onToggleForm && onToggleForm()}
            className="add-comment-btn"
          >
            {showForm ? "Cancel" : "+ Add Comment"}
          </Button>
        )}
      </div>

      <Separator />

      {showForm && FormComponent ? <FormComponent /> : null}

      {!user && (
        <p className="no-comments" style={{ marginTop: "1rem" }}>
          Log in om een comment toe te voegen.
        </p>
      )}

      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-header">
                <strong className="comment-author">
                  {comment.name || comment.email}
                </strong>
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
