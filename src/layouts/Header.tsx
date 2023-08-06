import React from 'react';
import { Layout, Menu, Switch } from 'tdesign-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MoonIcon, SunRisingIcon, Translate1Icon } from 'tdesign-icons-react';

import routes from '@/routes/index';
import useMode, { EThemes } from '@/hooks/useMode';
import useLang, { ELang } from '@/hooks/useLang';

import { ReactComponent as UyarnProfile } from '@/assets/uyarn.svg';

const { HeadMenu, MenuItem } = Menu;

const { Header } = Layout;

export default () => {
  const navigateTo = useNavigate();
  const { pathname: currentPath } = useLocation();

  const { mode, setMode } = useMode();
  const handleChangeMode = (currentMode: EThemes) => {
    setMode(currentMode);
  };

  const { setLang, lang } = useLang();

  const handleToggleLang = () => {
    if (lang === ELang.enUS) setLang(ELang.zhCN);
    else setLang(ELang.enUS);
  };

  return (
    <Header>
      <HeadMenu
        theme={mode}
        value={currentPath}
        logo={<UyarnProfile style={{ fontSize: '50px' }} />}
        operations={
          <div style={{ fontSize: '20px' }}>
            <Translate1Icon style={{ marginRight: '10px' }} onClick={handleToggleLang} />
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
        {routes.map((route) => (
          <MenuItem value={route.path} key={route.path} onClick={() => navigateTo(route.path)}>
            <span>{route.title}</span>
          </MenuItem>
        ))}
      </HeadMenu>
    </Header>
  );
};
