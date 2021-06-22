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
    });

    map.loadImage(
      '/start.png',
      function (error, image) {
      if (error) throw error;
       
      // Add the image to the map style.
      map.addImage('cat', image);}
      )
      map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': id , // reference the data source
        'layout': {
        'icon-image': 'cat', // reference the image
        'icon-size': 0.1
        }
        });
        map.addLayer({
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
        });
        

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
