import React from 'react';
import { Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import RouteReportPage from './reports/RouteReportPage';
import ServerPage from './admin/ServerPage';
import UsersPage from './admin/UsersPage';
import DevicePage from './DevicePage';
import UserPage from './UserPage';
import SocketController from './SocketController';
import NotificationsPage from './settings/NotificationsPage';
import NotificationPage from './settings/NotificationPage';
import GroupsPage from './settings/GroupsPage';
import GroupPage from './settings/GroupPage';
import PositionPage from './PositionPage';
import EventReportPage from './reports/EventReportPage';
import ReplayPage from './reports/ReplayPage';
import { useSelector } from 'react-redux';
import { LinearProgress } from '@material-ui/core';
import TripReportPage from './reports/TripReportPage';
import StopReportPage from './reports/StopReportPage';
import SummaryReportPage from './reports/SummaryReportPage';
import PrintReportPage from './reports/PrintReportPage';
import ChartReportPage from './reports/ChartReportPage';
import DriversPage from './settings/DriversPage';
import DriverPage from './settings/DriverPage';
import ComputedAttributesPage from './settings/ComputedAttributesPage';
import ComputedAttributePage from './settings/ComputedAttributePage';
import MaintenancesPage from './settings/MaintenancesPage';
import MaintenancePage from './settings/MaintenancePage';
import StatisticsPage from './admin/StatisticsPage';
import missionPage from './missionsPage'
import Mission from './mission'
import BasicTable from './missionSummary'
import CachingController from './CachingController';
import DashboardPage from './dashboard/DashboardPage'
import Parc from './parc'
import CardChart from './chartParc';
import Cost from './Cost';
import Seq from './settings/seq'
import SummarySeq from './settings/SummarySeq'
import CheckboxSelectionGrid from './checkSelection';
import SeqGroups from './settings/SeqGroups/SeqGroupsPage'

const App = () => {
  const initialized = useSelector(state => !!state.session.server && !!state.session.user);

  return (
    <>
      <CssBaseline />
      <SocketController />
      <CachingController />
      <Switch>
        <Route exact path='/login' component={LoginPage} />
        <Route>
          {!initialized ? (<LinearProgress />) : (
            <Switch>
              <Route exact path='/' component={MainPage} />
              <Route exact path='/replay' component={ReplayPage} />
              <Route exact path='/position/:id?' component={PositionPage} />
              <Route exact path='/user/:id?' component={UserPage} />
              <Route exact path='/device/:id?' component={DevicePage} />
              <Route exact path='/settings/notifications' component={NotificationsPage} />
              <Route exact path='/settings/notification/:id?' component={NotificationPage} />
              <Route exact path='/settings/groups' component={GroupsPage} />
              <Route exact path='/settings/groups-numero-sequence' component={SeqGroups} />
              <Route exact path='/settings/group/:id?' component={GroupPage} />
              <Route exact path='/settings/drivers' component={DriversPage} />
              <Route exact path='/settings/driver/:id?' component={DriverPage} />
              <Route exact path='/settings/Seq/:id?' component={Seq} />
              <Route exact path='/settings/SummarySeq' component={SummarySeq} />
              <Route exact path='/settings/attributes' component={ComputedAttributesPage} />
              <Route exact path='/settings/attribute/:id?' component={ComputedAttributePage} />
              <Route exact path='/settings/maintenances' component={MaintenancesPage} />
              <Route exact path='/settings/maintenance/:id?' component={MaintenancePage} />                                          
              <Route exact path='/admin/server' component={ServerPage} />
              <Route exact path='/admin/users' component={UsersPage} />
              <Route exact path='/admin/statistics' component={StatisticsPage} />
              <Route exact path='/reports/route' component={RouteReportPage} />              
              <Route exact path='/reports/event' component={EventReportPage} />
              <Route exact path='/reports/trip' component={TripReportPage} />
              <Route exact path='/reports/stop' component={StopReportPage} />
              <Route exact path='/reports/summary' component={SummaryReportPage} />
              <Route exact path='/reports/chart' component={ChartReportPage} />
              <Route exact path='/reports/missions' component={missionPage} />
              <Route exact path='/reports/mission' component={Mission} />
              <Route exact path='/reports/missionSummary' component={BasicTable} />
              <Route exact path='/reports/centre-de-rapport' component={PrintReportPage} />
              <Route exact path='/settings/parc' component={Parc} />
              <Route exact path='/settings/parc/auto' component={CardChart} />
              <Route exact path='/cout/:id?' component={Cost} />
              <Route exact path='/checkSelection' component={CheckboxSelectionGrid} />
              <Route exact path='/dashboard' component={DashboardPage} />
            </Switch>
          )}
        </Route>
      </Switch>
    </>
  );
}

export default App;
