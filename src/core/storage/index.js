const AUTH_KEY = "app_user";

const BOOKMARKS_KEY = (userId) => `app_bookmarks_${userId ?? "guest"}`;

const ICON_POSITIONS_KEY = "app_icon_positions";

const CLIPPY_STATE_KEY = "app_clippy_dismissed";

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

export const saveIconPositions = (positions) => {
  localStorage.setItem(ICON_POSITIONS_KEY, JSON.stringify(positions));
};

export const getIconPositions = () => {
  const raw = localStorage.getItem(ICON_POSITIONS_KEY);
  return raw ? JSON.parse(raw) : {};
};

export const clearIconPositions = () => {
  localStorage.removeItem(ICON_POSITIONS_KEY);
};

export const saveClippyDismissed = (dismissed = true) => {
  localStorage.setItem(CLIPPY_STATE_KEY, JSON.stringify(dismissed));
};

export const isClippyDismissed = () => {
  const raw = localStorage.getItem(CLIPPY_STATE_KEY);
  return raw ? JSON.parse(raw) : false;
};

export const clearClippyState = () => {
  localStorage.removeItem(CLIPPY_STATE_KEY);
};
