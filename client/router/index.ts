import { Home, AboutMe, Blog, Anniver, Article } from "../pages";

const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/aboutme",
    component: AboutMe,
    exact: true,
  },
  {
    path: "/blogs",
    component: Blog,
    exact: true,
  },
  {
    path: "/article/:id",
    component: Article,
    exact: true,
  },
  {
    path: "/anniversary",
    component: Anniver,
    exact: true,
  },
  // {
  //   path: "/gadgets",
  //   component: TableVis,
  //   exact: true,
  // },
];

export default routes;
