import API from "../../networking/api";

export const fetchUsers = () => {
    return API.get("/user.json").then(({ data }) => data);
};

export const fetchUser = (id) => {
    return API.get(`/user/${id}.json`).then(({ data }) => data);
};
