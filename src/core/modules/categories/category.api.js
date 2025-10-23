import API from "../../networking/api";

export const fetchCategories = () => {
    return API.get("/news/categories.json").then(({ data }) => data);
};

export const fetchCategoryItem = (id) => {
    return API.get(`/news/categories/${id}.json`).then(({ data }) => data);
};
