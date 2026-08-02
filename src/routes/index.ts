import React, { lazy } from 'react';
import { BrowserRouterProps } from 'react-router-dom';

export interface IRouter {
  path: string;
  redirect?: string;
  titleKey?: string;
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
    meta: { hidden: true },
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
    meta: { hidden: true },
  },
  {
    path: '/albums',
    titleKey: 'albums',
    Component: lazy(() => import('@/pages/albums/index')),
  },
  {
    path: '/albums/:id',
    Component: lazy(() => import('@/pages/album-content/index')),
    meta: { hidden: true },
  },
  {
    path: '/tools',
    titleKey: 'tools',
    Component: lazy(() => import('@/pages/tools/index')),
  },
];

export default routes;
