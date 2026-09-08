import React, { useContext } from 'react';

import { ELang } from '@/hooks/useLang';
import RootContext from '@/layouts/rootContext';
import styles from './index.module.css';

export default () => {
  const { lang } = useContext(RootContext);
  const isChinese = lang === ELang.zhCN;

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <div className={styles.eyebrow}>
          <span />
          {isChinese ? '页面未找到' : 'PAGE NOT FOUND'}
        </div>
        <h1 aria-label="404">4<span className={styles.orbit}>0<i /></span>4</h1>
      </section>
      <aside className={styles.coordinate} aria-hidden="true">
        <span>404.000° N</span>
        <span>000.404° E</span>
      </aside>
    </main>
  );
};
