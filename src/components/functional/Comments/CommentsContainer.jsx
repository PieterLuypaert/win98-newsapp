import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Comments } from "@design/Comments/Comments";
import { CommentFormContainer } from "@functional/Comments/CommentFormContainer";
import { fetchComments, postComment, } from "@core/modules/comments/comments.api";
import useAuth from "@functional/Auth/UseAuth";
import LoadingDialog from "@design/LoadingDialog/LoadingDialog";

export const CommentsContainer = ({ postId }) => {
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: comments = [], isLoading } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId,
  });

  const mutation = useMutation({
    mutationFn: (commentData) => postComment(postId, commentData),
    onSuccess: (newComment) => {
      queryClient.setQueryData(["comments", postId], (old = []) => [
        { ...newComment, id: Date.now(), name: user?.username || "Test" },
        ...old,
      ]);
      setShowForm(false);
    },
  });

  const handleAddComment = (formData) => {
    if (!user) {
      alert("You must be logged in to comment");
      return;
    }
    mutation.mutate(formData);
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

  if (isLoading) {
    return (
      <LoadingDialog
        message="Loading comments..."
        onCancel={() => queryClient.cancelQueries(["comments", postId])}
      />
    );
  }

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
