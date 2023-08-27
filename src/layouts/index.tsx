import React from 'react';
import { Layout } from 'tdesign-react';
import Content from './Content';
import Header from './Header';
import useLang from '@/hooks/useLang';
import useMode from '@/hooks/useMode';

import RootContext from './rootContext';

const { Footer } = Layout;

export default () => {
  const { lang, setLang, currentLang } = useLang();
  const { mode, setMode } = useMode();

  return (
    <RootContext.Provider value={{ lang, setLang, currentLang, mode, setMode }}>
      <Layout style={{ minHeight: '100%' }}>
        <Header />
        <Content />
        <Footer style={{ textAlign: 'center' }}>
          <p>Copyright Uyarn. Powered By TDesign & Notion.</p>
          <p>All Rights Reserved</p>
        </Footer>
      </Layout>
    </RootContext.Provider>
  );
};
