import API from "../../networking/api";

export const fetchTrending = () => {
  return API.get("/news/trending.json").then(({ data }) => data);
};

export const fetchTrendingItem = (id) => {
  return API.get(`/news/${id}.json`).then(({ data }) => data);
};
