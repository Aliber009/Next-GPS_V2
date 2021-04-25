import { useEffect, useState} from 'react';
import { map } from './Map';
import { useEffectAsync } from '../reactHelper';
import { geofenceToFeature } from './mapUtil';



const GeofenceMap = () => {
  const id = 'geofences';
  
  const [geofences, setGeofences] = useState([]);
  const [countgeo,setcountgeo]=useState(false)

 
  useEffectAsync(async () => {
    const response = await fetch('/api/geofences');
    if (response.ok) {
      setGeofences(await response.json());
    }
    
  
  }, [countgeo]);
  

  useEffect(() => {
    map.addSource(id, {
      'type': 'geojson',
      'data': {
        type: 'FeatureCollection',
        features: []
      }
    });
    map.addLayer({
      'source': id,
      'id': 'geofences-fill',
      'type': 'fill',
      'filter': [
         'all',
         ['==', '$type', 'Polygon'],
      ],
      'paint': {
         'fill-color':'#25ABFF',
         'fill-outline-color':'#25ABFF',
         'fill-opacity':0.1,
      },
    });
    map.addLayer({
      'source': id,
      'id': 'geofences-line',
      'type': 'line',
      'paint': {
         'line-color': '#25ABFF',
         'line-width': 2,
      },
    });
    map.addLayer({
      'source': "geofences",
      'id': 'geofences-title',
      'type': 'symbol',
      'layout': {
        'text-field': '{name}',
        'text-font': ['Roboto Regular'],
        'text-size': 12,
      },
      'paint': {
        'text-halo-color': 'white',
        'text-halo-width': 1,
      },
    });
  

    return () => {
      map.removeLayer('geofences-fill');
      map.removeLayer('geofences-line');
      map.removeLayer('geofences-title');
      map.removeSource(id);
    };
  }, []);

  useEffect(() => {
    map.getSource(id).setData({
      type: 'FeatureCollection',
      features: geofences.map(geofenceToFeature)
    });
  }, [geofences]);

  return null;
}

export default GeofenceMap;