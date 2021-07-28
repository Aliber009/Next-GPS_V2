import 'mapbox-gl/dist/mapbox-gl.css';
import './switcher/switcher.css';
import mapboxgl from 'mapbox-gl';
import { SwitcherControl } from './switcher/switcher';
import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { deviceCategories } from '../common/deviceCategories';
import { loadIcon, loadImage } from './mapUtil';
import { styleCarto, styleMapbox, styleOsm } from './mapStyles';
import t from '../common/localization';
import { useAttributePreference } from '../common/preferences';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import RoomIcon from '@material-ui/icons/Room';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import WhereToVoteIcon from '@material-ui/icons/WhereToVote';
import OpenRoute from './openRoute.js'
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));
const element = document.createElement('div');
element.style.width = '100%';
element.style.height = '100%';

//mapboxgl.accessToken="pk.eyJ1IjoiYWxpYmVybzAwOSIsImEiOiJja240ZGZvcngwNXBqMndvZnF1MThjZHVnIn0.3HjoQt279wR8tla2b2OHiA"
export const map = new mapboxgl.Map({
  container: element,
  style: styleOsm(),
});

let ready = false;
const readyListeners = new Set();

const addReadyListener = listener => {
  readyListeners.add(listener);
  listener(ready);
};

const removeReadyListener = listener => {
  readyListeners.delete(listener);
};

const updateReadyValue = value => {
  ready = value;
  readyListeners.forEach(listener => listener(value));
};

const initMap = async () => {
  const background = await loadImage('images/background.svg');
  await Promise.all(deviceCategories.map(async category => {
    if (!map.hasImage(category)) {
      const imageData = await loadIcon(category, background, `images/icon/${category}.svg`);
      map.addImage(category, imageData, { pixelRatio: window.devicePixelRatio });
    }
  }));
  updateReadyValue(true);
};

map.on('load', initMap);

map.addControl(new mapboxgl.NavigationControl({
  showCompass: false,
}));

map.addControl(new SwitcherControl(
  [
    { title: t('mapOsm'), uri: styleOsm() },
    { title: t('mapCarto'), uri: styleCarto() },
    { title: t('mapMapboxStreets'), uri: styleMapbox('streets-v11') },
    { title: t('mapMapboxOutdoors'), uri: styleMapbox('outdoors-v11') },
    { title: t('mapMapboxSatellite'), uri: styleMapbox('satellite-v9') },
  ],
  t('mapOsm'),
  () => updateReadyValue(false),
  () => {
    const waiting = () => {
      if (!map.loaded()) {
        setTimeout(waiting, 100);
      } else {
        initMap();
      }
    };
    waiting();
  },
));
var textoChild=""

const Map = ({ children }) => {
  const containerEl = useRef(null);
  const classes = useStyles();

  const [mapReady, setMapReady] = useState(false);
  const [mouseCoor,setmouseCoor] =useState({})
  const [mousePlace1,setmousePlace1]=useState("")
  const [mousePlace2,setmousePlace2]=useState("")
  const [mouseCoor2,setmouseCoor2] =useState({})
  const [time,settime] =useState("")
  const [dist,setdist] =useState("")


  const topass=(data)=>{
    settime(data);
    }
    const topass2=(data)=>{
      setdist(data);
      }

  
  
  
  

  const mapboxAccessToken = useAttributePreference('mapboxAccessToken');

  const geocode=(lat,lon,setmouse)=>{
    var place=""
     fetch("https://api.openrouteservice.org/geocode/reverse?api_key=5b3ce3597851110001cf624803d896806f2544b6a95312df342a12d7&point.lon="+lon+"&point.lat="+lat)
    .then(response=>response.json())
    .then(response=>setmouse(response.features[0].properties.label))
    
  
}

  function havecoor(e){
    setmouseCoor(e.lngLat)
    geocode(e.lngLat.lat,e.lngLat.lng,setmousePlace1)
    //console.log(e.lngLat.lat,e.lngLat.lng)
     var marker = new mapboxgl.Marker({
      color: "#1eae98",
      draggable: false
      }).setLngLat([e.lngLat.lng,e.lngLat.lat])
      .addTo(map); 
  }
  const detectPoint1=()=>{
    
      map.once('click',havecoor)
     
      
    }

  const detectPoint2=()=>{    
  
    map.once('click',function(e){
      geocode(e.lngLat.lat,e.lngLat.lng,setmousePlace2)
      setmouseCoor2(e.lngLat)
      var marker2 = new mapboxgl.Marker({
        color: "#f54748",
        draggable: false
        }).setLngLat([e.lngLat.lng,e.lngLat.lat])
        .addTo(map);
    })
  
 
  }

  

  useEffect(() => {
    mapboxgl.accessToken = mapboxAccessToken;
  }, [mapboxAccessToken]);

  
  useEffect(() => {
    
    const listener = ready => setMapReady(ready);
    addReadyListener(listener);
    return () => {
      removeReadyListener(listener);
    };
  }, []);

  useLayoutEffect(() => {
    const currentEl = containerEl.current;
    currentEl.appendChild(element);
    if (map) {
      map.resize();
    }
    return () => {
      currentEl.removeChild(element);
    };
  }, [containerEl]);
/*   useEffectAsync(async() => {
    const res=await fetch('https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf624803d896806f2544b6a95312df342a12d7&start={props.start}&end={props.end}')
    if (res.ok){
        const directs=await res.json()
        waypoints=directs.features[0].geometry
        
    }
    console.log(waypoints)
    map.getSource(id).setData({
      type: 'Feature',
      geometry:waypoints,
    });
}, []); */

  const [startpoint,setstartpoint]=useState(false)
  const [endpoint,setendpoint]=useState(false)

  return (
    <div style={{ width: '100%', height: '100%' }} ref={containerEl}>
      <div style={{position: 'absolute', bottom: '10px', left: '10px',zIndex:1}}>
      <ButtonGroup
        orientation="vertical"
        color="primary"
        aria-label="vertical outlined primary button group"
        variant="contained"
      >
        <Button startIcon={<RoomIcon />} onClick={()=>{detectPoint1();setstartpoint(true)}}>{mousePlace1.length>5?mousePlace1.toString():"Départ"}</Button>
        <Button  startIcon={<WhereToVoteIcon />} onClick={()=>{detectPoint2();setendpoint(true)}} >{mousePlace2.length>5?mousePlace2.toString():"Arrivée"}</Button>
        <Button  startIcon={<SettingsEthernetIcon />} onClick={()=>{detectPoint2()}} >{time.length>2?time:"DISTANCE"}</Button>
        <Button  startIcon={<AccessTimeIcon />} onClick={()=>{detectPoint2()}} >{dist.length>2?dist:"TIME"}</Button>
      </ButtonGroup>
      <IconButton color="primary" style={{ marginBottom:-25 }}>
       < SendIcon />
      </IconButton>
      {startpoint & endpoint  &&
      <OpenRoute 
     distance={topass}  time={topass2} start={mouseCoor.toString().substring(7,mouseCoor.toString().length-1)} end={mouseCoor2.toString().substring(7,mouseCoor2.toString().length-1)} />
      }
     </div>

      {mapReady && children}
    </div>
  );
};

export default Map;