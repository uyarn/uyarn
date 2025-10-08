import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export default () => {
  const { pathname } = useLocation();

  const albums: string = useMemo(() => pathname.split('/').pop(), [pathname]) || '';
  return data ? <div className={Style.pagePostContent}></div> : null;
};
