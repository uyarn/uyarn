import React, { useMemo, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { NotionRenderer } from 'react-notion-x';
import { Code } from 'react-notion-x/build/third-party/code';
import { Collection } from 'react-notion-x/build/third-party/collection';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { Modal } from 'react-notion-x/build/third-party/modal';
import { Pdf } from 'react-notion-x/build/third-party/pdf';

import queryPostDetail from '@/requests/query-post-detail';
import RootContext from '@/layouts/rootContext';
import { EThemes } from '@/hooks/useMode';

import Style from './index.module.css';

import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';

export default () => {
  const { pathname } = useLocation();

  const { mode } = useContext(RootContext);

  const postId: string = useMemo(() => pathname.split('/').pop(), [pathname]) || '';
  const data = queryPostDetail(postId);
  return data ? (
    <div className={Style.pagePostContent}>
      <NotionRenderer
        recordMap={data.data as any}
        fullPage={true}
        darkMode={mode === EThemes.dark}
        components={{
          Code,
          Collection,
          Equation,
          Pdf,
          Modal,
        }}
      />
    </div>
  ) : null;
};
