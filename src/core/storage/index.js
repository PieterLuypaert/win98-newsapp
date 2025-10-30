const AUTH_KEY = "app_user";

const BOOKMARKS_KEY = (userId) => `app_bookmarks_${userId ?? "guest"}`;

export const saveUser = (user) => {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem(AUTH_KEY);
  return user ? JSON.parse(user) : null;
};

export const saveBookmarks = (userId, bookmarks) => {
  localStorage.setItem(BOOKMARKS_KEY(userId), JSON.stringify(bookmarks || []));
};
  
export const getBookmarks = (userId) => {
  const raw = localStorage.getItem(BOOKMARKS_KEY(userId));
  return raw ? JSON.parse(raw) : [];
};

export const clearBookmarks = (userId) => {
  localStorage.removeItem(BOOKMARKS_KEY(userId));
};
