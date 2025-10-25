import React, { useEffect, useState } from "react";
import Comments from "../../design/Comments/Comments";
import CommentFormContainer from "../Comments/CommentFormContainer";
import commentsData from "../../../data/comments.json";

export const CommentsContainer = ({
    postId,
    initialComments = null,
    onAdd,
}) => {
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

    const handleAddComment = (formData) => {
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

    const toggleForm = () => {
        setShowForm((s) => !s);
    };

    const FormComponent = () => (
        <CommentFormContainer onSubmit={handleAddComment} onCancel={handleCancel} />
    );

    return (
        <Comments
            comments={comments}
            showForm={showForm}
            onToggleForm={toggleForm}
            FormComponent={FormComponent}
        />
    );
};

export default CommentsContainer;
