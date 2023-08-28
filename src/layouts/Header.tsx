import React, { useContext, useState, useMemo } from 'react';
import { Layout, Menu, Switch, Dropdown, Divider } from 'tdesign-react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MoonIcon,
  SunRisingIcon,
  Translate1Icon,
  LogoGithubFilledIcon,
  MenuFoldIcon,
  MenuUnfoldIcon,
} from 'tdesign-icons-react';

import routes from '@/routes/index';
import { EThemes } from '@/hooks/useMode';
import { ELang } from '@/hooks/useLang';
import RootContext from '@/layouts/rootContext';

import { ReactComponent as UyarnProfile } from '@/assets/uyarn.svg';

const { HeadMenu, MenuItem } = Menu;

const { Header } = Layout;

export default () => {
  const navigateTo = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const { pathname: currentPath } = useLocation();

  const { setLang, lang, mode, setMode } = useContext(RootContext);

  const handleToggleLang = () => {
    if (lang === ELang.enUS) setLang(ELang.zhCN);
    else setLang(ELang.enUS);
  };

  const handleChangeMode = (currentMode: EThemes) => {
    setMode(currentMode);
  };

  const handleVisibleChange = (visible: boolean) => {
    setMenuVisible(visible);
  };

  const visibleRouter = useMemo(() => routes.filter((route) => !route.meta?.hidden), []);
  return (
    <Header>
      <HeadMenu
        theme={mode}
        value={currentPath}
        className="desktop-view"
        logo={<UyarnProfile style={{ fontSize: '50px' }} onClick={() => navigateTo('/')} />}
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
      <HeadMenu
        theme={mode}
        value={currentPath}
        className="mobile-view"
        logo={<UyarnProfile style={{ fontSize: '50px' }} />}
        operations={
          <div className="mobile-view" style={{ fontSize: '20px' }}>
            <Switch
              style={{ margin: '0 16px' }}
              customValue={[EThemes.light, EThemes.dark]}
              value={(mode || EThemes.dark) as any}
              label={[<SunRisingIcon key={EThemes.light} />, <MoonIcon key={EThemes.dark} />]}
              onChange={handleChangeMode}
            />
            <Dropdown
              popupProps={{ visible: menuVisible, onVisibleChange: handleVisibleChange }}
              options={visibleRouter.map((route) => ({
                content: route.title,
                onClick: () => navigateTo(route.path),
              }))}
              panelBottomContent={
                <div style={{ fontSize: '14px' }}>
                  <Divider />
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <LogoGithubFilledIcon onClick={() => window.open('https://github.com/uyarn', '_blank')} />
                    <Translate1Icon onClick={handleToggleLang} />
                  </div>
                </div>
              }
            >
              {menuVisible ? <MenuFoldIcon /> : <MenuUnfoldIcon />}
            </Dropdown>
          </div>
        }
        style={{ padding: '0 10px' }}
      ></HeadMenu>
    </Header>
  );
};
