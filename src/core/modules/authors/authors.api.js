import API from "@core/networking/api";

export const fetchAuthors = () => {
  return API.get("/news/authors.json").then(({ data }) => data);
};

export const fetchAuthorItem = (id) => {
  return API.get(`/news/authors/${id}.json`).then(({ data }) => data);
};
