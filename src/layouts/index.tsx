import React, { createContext } from 'react';
import { Layout } from 'tdesign-react';
import Content from './Content';
import Header from './Header';
import useLang from '@/hooks/useLang';

const { Footer } = Layout;

const LangContext = createContext(null);

export default () => {
  const { lang, setLang, currentLang } = useLang();
  return (
    <LangContext.Provider value={{ lang, setLang, currentLang } as any}>
      <Layout style={{ height: '100%' }}>
        <Header />
        <Content />
        <Footer style={{ textAlign: 'center' }}>Copyright Uyarn. All Rights Reserved</Footer>
      </Layout>
    </LangContext.Provider>
  );
};
