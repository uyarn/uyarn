import React, { useContext } from 'react';
import { Tabs } from 'tdesign-react';
import RootContext from '@/layouts/rootContext';
import Style from './index.module.css';

const { TabPanel } = Tabs;

export default () => {
  const { currentLang } = useContext(RootContext);

  return (
    <div className={Style.pageProjects}>
      <Tabs placement="left" defaultValue={'TDesign'} theme={'normal'} disabled={false}>
        <TabPanel value={'TDesign'} label="TDesign">
          {currentLang.projects.inProgress}
        </TabPanel>
        <TabPanel value={'Use Animation'} label="Use Animation">
          {currentLang.projects.inProgress}
        </TabPanel>
        <TabPanel value={'Codesandbox'} label="Codesandbox">
          {currentLang.projects.inProgress}
        </TabPanel>
      </Tabs>
    </div>
  );
};
