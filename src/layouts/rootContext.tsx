import { createContext } from 'react';
import type { TLangType } from '@/hooks/useLang';
import type { TModeType } from '@/hooks/useMode';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default createContext<TLangType & TModeType>(null);
