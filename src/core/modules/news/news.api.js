import API from "../../networking/api";

export const fetchNews = () => {
  return API.get("/news/news.json").then(({ data }) => data);
};

export const fetchNewsItem = (id) => {
  return API.get(`/news/${id}.json`).then(({ data }) => data);
};
