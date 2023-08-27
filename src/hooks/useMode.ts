import { useEffect, useState } from 'react';

const THEME_MODE = 'theme-mode';

// eslint-disable-next-line no-shadow
export enum EThemes {
  dark = 'dark',
  light = 'light',
}

function useMode() {
  const [mode, setMode] = useState<EThemes | undefined>(undefined);

  useEffect(() => {
    const preMode = (localStorage.getItem(THEME_MODE) as EThemes) || EThemes.dark;
    if (preMode) {
      setMode(preMode || EThemes.dark);
      document.documentElement.setAttribute('theme-mode', preMode || EThemes.dark);
    }
  }, []);

  useEffect(() => {
    const newMode = mode || EThemes.dark;
    document.documentElement.setAttribute('theme-mode', newMode);
    localStorage.setItem(THEME_MODE, newMode);
  }, [mode]);

  return {
    mode,
    setMode,
  };
}

export default useMode;

export type TModeType = ReturnType<typeof useMode>;
