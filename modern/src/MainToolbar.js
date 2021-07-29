import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { sessionActions } from './store';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MapIcon from '@material-ui/icons/Map';
import BarChartIcon from '@material-ui/icons/BarChart';
import PeopleIcon from '@material-ui/icons/People';
import StorageIcon from '@material-ui/icons/Storage';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import TimelineIcon from '@material-ui/icons/Timeline';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import FolderIcon from '@material-ui/icons/Folder';
import ReplayIcon from '@material-ui/icons/Replay';
import BuildIcon from '@material-ui/icons/Build';
import PrintIcon from '@material-ui/icons/Print';
import t from './common/localization';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useEffectAsync } from './reactHelper';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import Collapse from '@material-ui/core/Collapse';
import EcoIcon from '@material-ui/icons/Eco';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LinkOutlinedIcon from '@material-ui/icons/LinkOutlined';



const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color:"#FFF"
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

const MainToolbar = () => {
  const dispatch = useDispatch();
  const [drawer, setDrawer] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const adminEnabled = useSelector(state => state.session.user && state.session.user.administrator);
  const ActualUser = useSelector(state => state.session.user)
  const userId = useSelector(state => state.session.user && state.session.user.id);
  const [notifCount, setnotifCount] = useState(0)

  const [openParc, setOpenParc] = useState(true);

  const { REACT_APP_FLASK } = process.env

  useEffectAsync(async () => {
    var miss = []
    const resUser = await fetch(REACT_APP_FLASK+'/mission_users', { method: 'GET' })
    if (resUser.ok) {
      const jsonUser = await resUser.json();
      miss = jsonUser.filter(i => i.nameUser == ActualUser.name)

    }
    setnotifCount(miss.length)
  }, []);





  const openDrawer = () => { setDrawer(true) }
  const closeDrawer = () => { setDrawer(false) }
  const OpenCloseParc = () => { setOpenParc(!openParc) };

  const handleLogout = async () => {
    const response = await fetch('/api/session', { method: 'DELETE' });
    if (response.ok) {
      dispatch(sessionActions.updateUser(null));
      history.push('/login');
    }
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);


  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };



  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >

      <MenuItem onClick={() => history.push('/reports/missions')}>
        <IconButton aria-label="show notifications" color="inherit" >
          <Badge badgeContent={notifCount} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );




  return (
    <>

      <AppBar style={{ backgroundColor: "#c64756" }} position="static">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            onClick={openDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            N E X T R A C K E R
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>

            <IconButton aria-label="show notifications" color="inherit" onClick={() => history.push('/reports/missions')}>
              <Badge badgeContent={notifCount} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              disabled={!userId}
              onClick={() => history.push(`/user/${userId}`)}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
          <Button style={{ marginLeft: 30 }} color="inherit" onClick={handleLogout}>DECONNEXION</Button>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}

      <Drawer open={drawer} onClose={closeDrawer}>
        <div
          tabIndex={0}
          className={classes.list}
          role="button"
          /* onClick={closeDrawer} */
          onKeyDown={closeDrawer}>
          <List>
            <ListItem button onClick={() => history.push('/')}>
              <ListItemIcon>
                <MapIcon />
              </ListItemIcon>
              <ListItemText primary={t('mapTitle')} />
            </ListItem>
            <ListItem button onClick={() => history.push('/replay')}>
              <ListItemIcon>
                <ReplayIcon />
              </ListItemIcon>
              <ListItemText primary={t('reportReplay')} />
            </ListItem>
            <ListItem button onClick={() => history.push('/dashboard')}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary={'Dashboard'} />
            </ListItem>
          </List>
          <Divider />
          <List
            subheader={
              <ListSubheader>
                {t('reportTitle')}
              </ListSubheader>
            }>
            <ListItem button onClick={() => history.push('/reports/route')}>
              <ListItemIcon>
                <TimelineIcon />
              </ListItemIcon>
              <ListItemText primary={t('reportRoute')} />
            </ListItem>
            <ListItem button onClick={() => history.push('/reports/event')}>
              <ListItemIcon>
                <NotificationsActiveIcon />
              </ListItemIcon>
              <ListItemText primary={t('reportEvents')} />
            </ListItem>
            <ListItem button onClick={() => history.push('/reports/trip')}>
              <ListItemIcon>
                <PlayCircleFilledIcon />
              </ListItemIcon>
              <ListItemText primary={t('reportTrips')} />
            </ListItem>
            <ListItem button onClick={() => history.push('/reports/stop')}>
              <ListItemIcon>
                <PauseCircleFilledIcon />
              </ListItemIcon>
              <ListItemText primary={t('reportStops')} />
            </ListItem>
            <ListItem button onClick={() => history.push('/reports/summary')}>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary={t('reportSummary')} />
            </ListItem>
            <ListItem button onClick={() => history.push('/reports/chart')}>
              <ListItemIcon>
                <TrendingUpIcon />
              </ListItemIcon>
              <ListItemText primary={t('reportChart')} />
            </ListItem>
            <ListItem button onClick={() => history.push('/reports/centre-de-rapport')}>
              <ListItemIcon>
                <PrintIcon  />
              </ListItemIcon>
              <ListItemText primary={'Centre de Rapport'} />
            </ListItem>
          </List>
          <Divider />
          <List
            subheader={
              <ListSubheader>
                {t('settingsTitle')}
              </ListSubheader>
            }>
            <ListItem button disabled={!userId} onClick={() => history.push(`/user/${userId}`)}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={t('settingsUser')} />
            </ListItem>
            <ListItem button onClick={() => history.push('/settings/notifications')}>
              <ListItemIcon>
                <NotificationsIcon />
              </ListItemIcon>
              <ListItemText primary={t('sharedNotifications')} />
            </ListItem>
            <ListItem button onClick={() => history.push('/settings/groups')}>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary={t('settingsGroups')} />
            </ListItem>
            <ListItem button onClick={() => history.push('/settings/groups-numero-sequence')}>
              <ListItemIcon>
                <FolderIcon />
              </ListItemIcon>
              <ListItemText primary={'Groups en numéro de séquence'} />
            </ListItem>
            <ListItem button onClick={() => history.push('/settings/drivers')}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={t('sharedDrivers')} />
            </ListItem>
            <ListItem button onClick={() => history.push('/settings/SummarySeq')}>
              <ListItemIcon>
                <LinkOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={'Numéro Séquentiel'} />
            </ListItem>
            <ListItem button onClick={() => history.push('/reports/missions')}>
              <ListItemIcon>
                <AssignmentTurnedInIcon />
              </ListItemIcon>
              <ListItemText primary="Missions" />
            </ListItem>
            <ListItem button onClick={() => history.push('/settings/maintenances')}>
              <ListItemIcon>
                <BuildIcon />
              </ListItemIcon>
              <ListItemText primary={t('sharedMaintenance')} />
            </ListItem>
            <ListItem button onClick={OpenCloseParc}>
              <ListItemIcon>
                <DriveEtaIcon />
              </ListItemIcon>
              <ListItemText primary="Parc Auto" />
              {openParc ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openParc} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested} onClick={() => history.push('/settings/parc/auto')}>
                  <ListItemIcon>
                    <AccountBalanceWalletIcon />
                  </ListItemIcon>
                  <ListItemText primary="Gestion des couts" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon>
                    <EcoIcon />
                  </ListItemIcon>
                  <ListItemText primary="Eco-Conduite" />
                </ListItem>
              </List>
            </Collapse>


            {/*
            <ListItem button onClick={() => history.push('/settings/maintenances')}>
              <ListItemIcon>
                <BuildIcon />
              </ListItemIcon>
              <ListItemText primary={t('sharedMaintenance')} />
            </ListItem> */}
          </List>
          {adminEnabled && (
            <>
              <Divider />
              <List
                subheader={
                  <ListSubheader>
                    {t('userAdmin')}
                  </ListSubheader>
                }>
                <ListItem button onClick={() => history.push('/admin/server')}>
                  <ListItemIcon>
                    <StorageIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('settingsServer')} />
                </ListItem>
                <ListItem button onClick={() => history.push('/admin/users')}>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('settingsUsers')} />
                </ListItem>
                <ListItem button onClick={() => history.push('/admin/statistics')}>
                  <ListItemIcon>
                    <BarChartIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('statisticsTitle')} />
                </ListItem>
              </List>
            </>
          )}
        </div>
      </Drawer>
    </>
  );
}

export default MainToolbar;
