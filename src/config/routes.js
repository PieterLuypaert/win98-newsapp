export const routes = [
  {
    path: "/news",
    config: {
      open: true,
      type: "news",
      title: "News Explorer - Home",
      width: 1000,
      height: 600,
    },
  },
  {
    path: "/bookmarks",
    config: {
      open: true,
      type: "bookmarks",
      title: "Bookmarks",
      width: 800,
      height: 560,
    },
  },
  {
    path: "/category/:categorySlug",
    config: {
      open: true,
      type: "category",
      title: "News Explorer - Category",
      width: 1000,
      height: 600,
    },
  },
  {
    path: "/article/:articleSlug",
    config: {
      open: true,
      type: "article",
      title: "News Explorer - Article",
      width: 1000,
      height: 600,
    },
  },
  {
    path: "/login",
    config: {
      open: true,
      type: "login",
      title: "Login",
      width: 360,
      height: 180,
    },
  },
  {
    path: "/register",
    config: {
      open: true,
      type: "register",
      title: "Register",
      width: 360,
      height: 180,
    },
  },
];
