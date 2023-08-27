import { useEffect, useState } from 'react';

import cn from '../i18n/zh-cn';
import en from '../i18n/en-us';

// eslint-disable-next-line no-shadow
export enum ELang {
  zhCN = 'zh-cn',
  enUS = 'en-us',
}

function useLang() {
  const [lang, setLang] = useState<ELang | undefined>(ELang.zhCN);
  const [currentText, setCurrentText] = useState<Record<string, any>>(cn);

  useEffect(() => {
    const text = lang === ELang.zhCN ? cn : en;
    setCurrentText(text);
  }, [lang]);

  return {
    lang,
    setLang,
    currentLang: currentText,
  };
}

export default useLang;

export type TLangType = ReturnType<typeof useLang>;
