import React, { Suspense, memo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout, Loading } from 'tdesign-react';
import routers, { IRouter } from '@/routes/index';

const { Content } = Layout;

type TRenderRoutes = (routes: IRouter[], parentPath?: string, breadcrumbs?: string[]) => React.ReactNode[];

const renderRoutes: TRenderRoutes = (routes) =>
  routes.map((route, index: number) => {
    const { Component, children, redirect } = route;
    const currentPath = route.path;

    if (redirect) return <Route key={index} path={currentPath} element={<Navigate to={redirect} replace />} />;

    if (Component) {
      // 有路由菜单
      return <Route key={index} path={currentPath} element={<Component />} />;
    }
    return children ? renderRoutes(children, currentPath) : null;
  });

const AppRouter = () => (
  <Content>
    <Suspense
      fallback={
        <>
          <Loading />
        </>
      }
    >
      <Routes>{renderRoutes(routers)}</Routes>
    </Suspense>
  </Content>
);

export default memo(AppRouter);
