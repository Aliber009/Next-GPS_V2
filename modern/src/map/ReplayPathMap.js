import mapboxgl from 'mapbox-gl';
import { useEffect } from 'react';
import { map } from './Map';



const ReplayPathMap = ({ positions }) => {
  const id = 'replay';

  useEffect(() => {
    if (!map.getSource(id)) {
      map.addSource(id, {
        'type': 'geojson',
        'data': {
          type: 'FeatureCollection',
          features: []
        }
      });
  }
  
  map.addLayer({
    'id': id,
    'type': 'line',
    'source': id,
    'filter': ['==', '$type', 'LineString'],
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': '#3cb2d0',
      'line-width': {
        'base': 1.5,
        'stops': [[1, 0.5], [8, 3], [15, 6], [22, 8]]
      }
    }
  });
 
    /* map.addLayer({
      'source': id,
      'id': id,
      'type': 'line',
      'layout': {
        'line-join': 'round',
        'line-cap': 'round',
      },
      'paint': {
         'line-color': '#333',
         'line-width': 5,
      },
    }); */
    /* map.loadImage('/arro.png', (err, image) => {
      if (err) { return; }
      map.addImage('arrow', image);
      map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'id',
        'layout': {
          'symbol-placement': 'line',
          'symbol-spacing': 1,
          'icon-allow-overlap': true,
          // 'icon-ignore-placement': true,
          'icon-image': 'arrow',
          'icon-size': 0.045,
          'visibility': 'visible'
        }
      });
    }); */
    
    map.loadImage('/Fichier 5.png', (err, image) => {
      if (err) { return; }
      map.addImage('cat', image);
    })

       map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': id , // reference the data source
        'layout': {
          'icon-allow-overlap': true,
          'symbol-placement': 'line',
          'symbol-spacing': 1,

        'icon-image': 'cat', // reference the image
        'icon-size': 0.11
        }
        });
        /*map.addLayer({
          'source': id,
          'id': "fill-line",
          'type': 'line',
          'layout': {
            'line-join': 'round',
            'line-cap': 'round',
          },
          'paint': {
             'line-color': '#3edbf0',
             'line-width': 4,
          },
        }); */
        

    return () => {
      map.removeLayer(id);
      map.removeLayer("fill-line");
      map.removeLayer("points");
      map.removeSource(id);
    };
  }, []);

  useEffect(() => {
    const coordinates = positions.map(item => [item.longitude, item.latitude]);
    
    map.getSource(id).setData({
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: coordinates,
      },
    });
    if (coordinates.length) {
      const bounds = coordinates.reduce((bounds, item) => bounds.extend(item), new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
      map.fitBounds(bounds, {
        padding: { top: 50, bottom: 250, left: 25, right: 25 },
      });
    }
  }, [positions]);

  return null;
}

export default ReplayPathMap;
