import React, { lazy } from 'react';
import { BrowserRouterProps } from 'react-router-dom';

export interface IRouter {
  path: string;
  redirect?: string;
  title?: string;
  Component?: React.FC<BrowserRouterProps>;
  children?: IRouter[];
}

const routes: IRouter[] = [
  {
    path: '/',
    redirect: '/about',
  },
  {
    path: '/about',
    title: 'About',
    Component: lazy(() => import('@/pages/about/index')),
  },
  {
    path: '/projects',
    title: 'Projects',
    Component: lazy(() => import('@/pages/projects/index')),
  },
  {
    path: '/blogs',
    title: 'Blogs',
    Component: lazy(() => import('@/pages/blogs/index')),
  },
];

export default routes;
