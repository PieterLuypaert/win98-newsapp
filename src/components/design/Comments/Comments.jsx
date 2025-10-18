import { useEffect, useState } from "react";
import { Button } from "../Button/Button";
import { Separator } from "../Seperator/Separator";
import { CommentForm } from "../CommentForm/CommentForm";
import commentsData from "../../../data/comments.json";
import "./Comments.css";

export const Comments = ({ postId, initialComments = null, onAdd }) => {
  const [comments, setComments] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (Array.isArray(initialComments)) {
      setComments(initialComments);
    } else {
      const articleComments = commentsData.filter(
        (comment) => comment.postId === postId
      );
      setComments(articleComments);
    }
  }, [postId, initialComments]);

  const handleSubmit = (formData) => {
    const comment = {
      postId,
      id: Date.now(),
      ...formData,
    };

    setComments((prev) => [comment, ...prev]);
    setShowForm(false);
    if (onAdd) onAdd(comment);
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="comments-section">
      <div className="comments-header">
        <h3 className="comments-title">Comments ({comments.length})</h3>
        <Button
          variant="win98"
          onClick={() => setShowForm(!showForm)}
          className="add-comment-btn"
        >
          {showForm ? "Cancel" : "+ Add Comment"}
        </Button>
      </div>

      <Separator />

      {showForm && (
        <CommentForm onSubmit={handleSubmit} onCancel={handleCancel} />
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
