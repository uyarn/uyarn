import React, { useContext, useState, useMemo } from 'react';
import { Button, Divider, Dropdown, Layout, Menu, Switch } from 'tdesign-react';
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

  const { setLang, lang, currentLang, mode, setMode } = useContext(RootContext);

  const handleToggleLang = () => {
    const nextLang = lang === ELang.enUS ? ELang.zhCN : ELang.enUS;
    setLang(nextLang);
  };

  const handleOpenGithub = () => {
    window.open('https://github.com/uyarn', '_blank', 'noopener,noreferrer');
  };

  const githubButton = (
    <Button
      aria-label={currentLang.navigation.github}
      shape="square"
      theme="default"
      variant="text"
      icon={<LogoGithubFilledIcon />}
      onClick={handleOpenGithub}
    />
  );

  const languageButton = (
    <Button
      aria-label={currentLang.navigation.switchLanguage}
      shape="square"
      theme="default"
      variant="text"
      icon={<Translate1Icon />}
      onClick={handleToggleLang}
    />
  );

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {githubButton}
            {languageButton}
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
              <span>{route.titleKey ? currentLang.navigation[route.titleKey] : ''}</span>
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
                content: route.titleKey ? currentLang.navigation[route.titleKey] : '',
                onClick: () => navigateTo(route.path),
              }))}
              panelBottomContent={
                <div style={{ fontSize: '14px' }}>
                  <Divider />
                  <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {githubButton}
                    {languageButton}
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
