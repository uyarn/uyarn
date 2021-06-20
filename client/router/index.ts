import { Home, AboutMe, Blog, Anniver, Article, Projects } from "../pages";

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
    path: "/blogs/:id",
    component: Article,
    exact: true,
  },
  {
    path: "/anniversary",
    component: Anniver,
    exact: true,
  },
  {
    path: "/projects",
    component: Projects,
    exact: true,
  },
];

export default routes;
