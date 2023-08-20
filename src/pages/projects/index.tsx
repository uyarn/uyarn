import React from 'react';
import { Tabs } from 'tdesign-react';
import Style from './index.module.css';

const { TabPanel } = Tabs;

export default () => (
  <div className={Style.pageProjects}>
    <Tabs placement="left" defaultValue={'TDesign'} theme={'normal'} disabled={false}>
      <TabPanel value={'TDesign'} label="TDesign">
        In Progress
      </TabPanel>
      <TabPanel value={'Use Animation'} label="Use Animation">
        In Progress
      </TabPanel>
      <TabPanel value={'Codesandbox'} label="Codesandbox">
        In Progress
      </TabPanel>
    </Tabs>
  </div>
);
