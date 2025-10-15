import { useEffect, useState } from "react";
import { Separator } from "../seperator/Separator";
import commentsData from "../../../data/comments.json";
import "./Comments.css";

export const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const articleComments = commentsData.filter(
            (comment) => comment.postId === postId
        );
        setComments(articleComments);
    }, [postId]);

    return (
        <div className="comments-section">
            <div className="comments-header">
                <h3 className="comments-title">Comments ({comments.length})</h3>
            </div>

            <Separator />

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
