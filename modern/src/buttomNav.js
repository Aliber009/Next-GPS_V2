import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import ChangeHistoryOutlinedIcon from '@material-ui/icons/ChangeHistoryOutlined';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DevicesList from './DevicesList';
import SimpleList from './listgeo';
import Tree from './tree'
import CreateNewFolderOutlinedIcon from '@material-ui/icons/CreateNewFolderOutlined';
import LocationOffOutlinedIcon from '@material-ui/icons/LocationOffOutlined';
import DevicesListgpsonly from './deviceGPSonly'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function FullWidthTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
        
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          
        >
          <Tab icon={<RoomOutlinedIcon />} label="DEVICES" {...a11yProps(0)} />
          <Tab icon={<LocationOffOutlinedIcon />} label="Devices Sans N seq" {...a11yProps(1)} />
          <Tab icon={< CreateNewFolderOutlinedIcon/>} label="GROUPES" {...a11yProps(2)} />
          <Tab icon={< ChangeHistoryOutlinedIcon />} label="GEOFENCES" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel style={{ height:'80vh' }} value={value} index={0} dir={theme.direction}>
        <DevicesList />
        </TabPanel>
        <TabPanel style={{ height:'80vh'}} value={value} index={1} dir={theme.direction}>
          <DevicesListgpsonly/>
        </TabPanel>
        <TabPanel style={{ height:'80vh'}} value={value} index={2} dir={theme.direction}>
          <Tree />
        </TabPanel>
        <TabPanel style={{ height:'80vh'}} value={value} index={3} dir={theme.direction}>
          <SimpleList />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
