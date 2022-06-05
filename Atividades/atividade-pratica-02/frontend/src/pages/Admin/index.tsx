import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import EquipmentList from './Equipment/List';
import RegisterList from './Registers/List';
import { AdminPageContainer, AdminPageTabs } from './styles';
import UsersList from './Users/List';

function a11yProps(index: number) {
  return {
    id: `admin-tab-${index}`,
    'aria-controls': `admin-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const AdminPage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <AdminPageContainer>
      <AdminPageTabs>
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          aria-label='admin tabs'
        >
          <Tab label='Equipamentos' {...a11yProps(0)} />
          <Tab label='Manutenções' {...a11yProps(1)} />
          <Tab label='Usuários' {...a11yProps(2)} />
        </Tabs>
      </AdminPageTabs>
      <TabPanel value={tabValue} index={0}>
        <EquipmentList />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <RegisterList />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <UsersList />
      </TabPanel>
    </AdminPageContainer>
  );
};
export default AdminPage;
