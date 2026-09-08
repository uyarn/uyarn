import React, { lazy } from 'react';
import { BrowserRouterProps } from 'react-router-dom';

export interface IRouter {
  path: string;
  redirect?: string;
  titleKey?: string;
  visibility?: boolean;
  Component?: React.FC<BrowserRouterProps>;
  children?: IRouter[];
}

const routes: IRouter[] = [
  {
    path: '/',
    redirect: '/posts',
    visibility: false,
  },
  {
    path: '/about',
    titleKey: 'about',
    Component: lazy(() => import('@/pages/about/index')),
  },
  {
    path: '/posts',
    titleKey: 'posts',
    Component: lazy(() => import('@/pages/posts/index')),
  },
  {
    path: '/posts/:id',
    Component: lazy(() => import('@/pages/post-content/index')),
    visibility: false,
  },
  {
    path: '/destinations',
    titleKey: 'destinations',
    Component: lazy(() => import('@/pages/destinations/index')),
  },
  {
    path: '/albums',
    titleKey: 'albums',
    Component: lazy(() => import('@/pages/albums/index')),
  },

  {
    path: '/albums/:id',
    Component: lazy(() => import('@/pages/album-content/index')),
    visibility: false,
  },
  {
    path: '/tools',
    titleKey: 'tools',
    visibility: false,
    Component: lazy(() => import('@/pages/tools/index')),
  },
  {
    path: '*',
    visibility: false,
    Component: lazy(() => import('@/pages/not-found/index')),
  },
];

export default routes;
