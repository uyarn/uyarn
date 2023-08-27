import React, { useContext } from 'react';
import { LocationParkingPlaceIcon, LogoQqIcon, City10Icon, TagIcon, SmileIcon, WorkIcon } from 'tdesign-icons-react';
import useTypewriter from '@/hooks/useTypewriter';
import Style from './index.module.css';
import RootContext from '@/layouts/rootContext';

export default () => {
  const { currentLang } = useContext(RootContext);
  const { printedStr } = useTypewriter(currentLang?.about.name);

  return (
    <div className={Style.pageAbout}>
      <p className={Style.pageAboutName}>{printedStr.length ? printedStr : '\u2000'}</p>
      <p>
        <City10Icon className={Style.prefixIcon} />
        {currentLang?.about.location}
      </p>
      <p>
        <LocationParkingPlaceIcon className={Style.prefixIcon} />
        {currentLang?.about.work}
        <LogoQqIcon />
      </p>
      <p>
        <WorkIcon className={Style.prefixIcon} />
        {currentLang?.about.major.join('/')}
      </p>
      <p>
        <TagIcon className={Style.prefixIcon} />
        {currentLang?.about.tags.join('/')}
        <SmileIcon />
      </p>
    </div>
  );
};
