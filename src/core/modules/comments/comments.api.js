import axios from "axios";

const JSONPLACEHOLDER_BASE = "https://jsonplaceholder.typicode.com";

export const fetchComments = (postId) => {
  return axios
    .get(`${JSONPLACEHOLDER_BASE}/posts/${postId}/comments`)
    .then(({ data }) => data);
};

export const postComment = (postId, commentData) => {
  return axios
    .post(`${JSONPLACEHOLDER_BASE}/posts/${postId}/comments`, commentData)
    .then(({ data }) => data);
};
