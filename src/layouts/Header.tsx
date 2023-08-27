import React, { useContext } from 'react';
import { Layout, Menu, Switch } from 'tdesign-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MoonIcon, SunRisingIcon, Translate1Icon, LogoGithubFilledIcon } from 'tdesign-icons-react';

import routes from '@/routes/index';
import { EThemes } from '@/hooks/useMode';
import { ELang } from '@/hooks/useLang';
import RootContext from '@/layouts/rootContext';

import { ReactComponent as UyarnProfile } from '@/assets/uyarn.svg';

const { HeadMenu, MenuItem } = Menu;

const { Header } = Layout;

export default () => {
  const navigateTo = useNavigate();
  const { pathname: currentPath } = useLocation();

  const { setLang, lang, mode, setMode } = useContext(RootContext);

  const handleToggleLang = () => {
    if (lang === ELang.enUS) setLang(ELang.zhCN);
    else setLang(ELang.enUS);
  };

  const handleChangeMode = (currentMode: EThemes) => {
    setMode(currentMode);
  };

  return (
    <Header>
      <HeadMenu
        theme={mode}
        value={currentPath}
        logo={<UyarnProfile style={{ fontSize: '50px' }} />}
        operations={
          <div style={{ fontSize: '20px' }}>
            <LogoGithubFilledIcon onClick={() => window.open('https://github.com/uyarn', '_blank')} />
            <Translate1Icon style={{ margin: '0 20px' }} onClick={handleToggleLang} />
            <Switch
              customValue={[EThemes.light, EThemes.dark]}
              value={(mode || EThemes.dark) as any}
              label={[<SunRisingIcon key={EThemes.light} />, <MoonIcon key={EThemes.dark} />]}
              onChange={handleChangeMode}
            />
          </div>
        }
        style={{ padding: '0 10px' }}
      >
        {routes
          .filter((route) => !route.meta?.hidden)
          .map((route) => (
            <MenuItem value={route.path} key={route.path} onClick={() => navigateTo(route.path)}>
              <span>{route.title}</span>
            </MenuItem>
          ))}
      </HeadMenu>
    </Header>
  );
};
