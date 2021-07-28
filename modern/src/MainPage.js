import React,{useState, useEffect} from 'react';
import { isWidthUp, makeStyles, withWidth } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import ContainerDimensions from 'react-container-dimensions';
import DevicesList from './DevicesList';
import MainToolbar from './MainToolbar';
import Map from './map/Map';
import SelectedDeviceMap from './map/SelectedDeviceMap';
import AccuracyMap from './map/AccuracyMap';
import GeofenceMap from './map/GeofenceMap';
import Draw from'./map/GeofenceEditMap';
import CurrentPositionsMap from './map/CurrentPositionsMap';
import CurrentLocationMap from './map/CurrentLocationMap';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import GeofenceEditMap from './map/geoEdit'
import FullWidthTabs from './buttomNav'
import Notif from './notifAlert'







const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flexGrow: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    }
  },
  drawerPaper: {
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      width: 350,
    },
    [theme.breakpoints.down('xs')]: {
      height: 250,
    }
  },
  mapContainer: {
    flexGrow: 1,
  },
}));

const MainPage = ({ width }) => {
  const [position, setPosition] = useState('top-left');
  const [data, setData] = useState({
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          coordinates: [-122.41411987304815, 37.792209769935084],
          type: 'Point'
        }
      }
    ]
  });
  
  const classes = useStyles();
  //cette fonction c'est pour traiter les data et les organiser de façon à avoir la forme general des API call (comme dans ma database)
  
  //ParseJson Ends here
  
  return (
    <div className={classes.root}>
      <MainToolbar />
      <Notif />
      <div className={classes.content}>
        <Drawer
          anchor={isWidthUp('sm', width) ? 'left' : 'bottom'}
          variant='permanent'
          classes={{ paper: classes.drawerPaper }}>
          <FullWidthTabs />
          
         
        </Drawer>
        
        <div className={classes.mapContainer}>
      
         <GeofenceEditMap/> 
          <ContainerDimensions>
       
            <Map>
              <CurrentLocationMap />
              <AccuracyMap />
              <CurrentPositionsMap />
              <SelectedDeviceMap /> 
            </Map>
          </ContainerDimensions>
        </div>
        
        
        
        
        
      </div>
    </div>
  );
}

export default withWidth()(MainPage);
