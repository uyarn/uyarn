import React from 'react';
import { ConfigProvider, Layout } from 'tdesign-react';
import { Analytics } from '@vercel/analytics/react';
import enUS from 'tdesign-react/es/locale/en_US';
import zhCN from 'tdesign-react/es/locale/zh_CN';

import Content from './Content';
import Header from './Header';
import useLang, { ELang } from '@/hooks/useLang';
import useMode from '@/hooks/useMode';

import RootContext from './rootContext';

const { Footer } = Layout;

export default () => {
  const { lang, setLang, currentLang } = useLang();
  const { mode, setMode } = useMode();

  return (
    <ConfigProvider globalConfig={lang === ELang.zhCN ? zhCN : enUS}>
      <RootContext.Provider value={{ lang, setLang, currentLang, mode, setMode }}>
        <Layout style={{ minHeight: '100%' }}>
          <Header />
          <Content />
          <Footer style={{ textAlign: 'center' }}>
            <p>Copyright Uyarn. Powered By TDesign & Notion.</p>
            <p>{currentLang.footer.copyright}</p>
          </Footer>
          <Analytics />
        </Layout>
      </RootContext.Provider>
    </ConfigProvider>
  );
};
