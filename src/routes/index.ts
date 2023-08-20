import React, { lazy } from 'react';
import { BrowserRouterProps } from 'react-router-dom';

export interface IRouter {
  path: string;
  redirect?: string;
  title?: string;
  Component?: React.FC<BrowserRouterProps>;
  children?: IRouter[];
  meta?: {
    hidden?: boolean;
  };
}

const routes: IRouter[] = [
  {
    path: '/',
    redirect: '/posts',
  },
  {
    path: '/about',
    title: 'About',
    Component: lazy(() => import('@/pages/about/index')),
  },
  {
    path: '/posts',
    title: 'Posts',
    Component: lazy(() => import('@/pages/posts/index')),
  },
  {
    path: '/posts/:id',
    Component: lazy(() => import('@/pages/post-content/index')),
    meta: { hidden: true },
  },
  // {
  //   path: '/projects',
  //   title: 'Projects',
  //   Component: lazy(() => import('@/pages/projects/index')),
  // },
  // {
  //   path: '/resume',
  //   title: 'Resume',
  //   Component: lazy(() => import('@/pages/resume/index')),
  // },
];

export default routes;
