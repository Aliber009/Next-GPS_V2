import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import { Provider, useSelector } from 'react-redux';

import { map } from './Map';
import store from '../store';
import { useHistory } from 'react-router-dom';
import StatusView from './StatusView';

const PositionsMap = ({ positions }) => {
  const id = 'positions';

  const history = useHistory();
  const devices = useSelector(state => state.devices.items);

  const createFeature = (devices, position) => {
    const device = devices[position.deviceId] || null;
    return {
      deviceId: position.deviceId,
      name: device ? device.name : '',
      category: device && (device.category || 'default'),
    }
  };

  const onMouseEnter = () => map.getCanvas().style.cursor = 'pointer';
  const onMouseLeave = () => map.getCanvas().style.cursor = '';

  const onClickCallback = useCallback(event => {
    const feature = event.features[0];
    let coordinates = feature.geometry.coordinates.slice();
    while (Math.abs(event.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += event.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    const placeholder = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <StatusView deviceId={feature.properties.deviceId} onShowDetails={positionId => history.push(`/position/${positionId}`)} />
      </Provider>,
      placeholder
    );

    new mapboxgl.Popup({
      offset: 25,
      anchor: 'top'
    })
      .setDOMContent(placeholder)
      .setLngLat(coordinates)
      .addTo(map);
  }, [history]);

  useEffect(() => {
    if (!map.getSource(id)){
    map.addSource(id, {
      'type': 'geojson',
      'data': {
        type: 'FeatureCollection',
        features: [],
      },
      'cluster': true,
      'clusterMaxZoom': 14, // Max zoom to cluster points on
      'clusterRadius': 50 
    });
  }
    var layers = [
      [20, '#f28cb1'],
      [10, '#f1f075'],
      [0, '#51bbd6']
  ];
  
  
    layers.forEach(function (layer, i) {
      map.addLayer({
          "id": "cluster-" + i,
          "type": "circle",
          "source": id,
          "paint": {
              "circle-color": layer[1],
              "circle-radius": 18
          },
          
          "filter": i === 0 ?
              [">=", "point_count", layer[0]] :
              ["all",
                  [">=", "point_count", layer[0]],
                  ["<", "point_count", layers[i - 1][0]]]
      });
      
  });
 
  map.addLayer({
    'source': id,
    'id': 'cluster-count',
    'type': 'symbol',
    
    'layout': {
      'text-field': '{point_count}',
      'text-font': ['Roboto Regular'],
      'text-size': 16,
    },
    'paint': {
      'text-color': "#FFFFFF"
    },
  });
        
    
    map.addLayer({
      'id': id,
      'type': 'symbol',
      'source': id,
      'layout': {
        'icon-image': '{category}',
        'icon-allow-overlap': true,
        'text-field': '{name}',
        'text-allow-overlap': true,
        'text-anchor': 'bottom',
        'text-offset': [0, -2],
        'text-font': ['Roboto Regular'],
        'text-size': 12,
      },
      
      'paint': {
        'text-halo-color': 'white',
        'text-halo-width': 1,
      },
    });
    
       
    /*   map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: id,
      filter: ['!', ['has', 'point_count']],
      paint: {
      'circle-color': '#11b4da',
      'circle-radius': 4,
      'circle-stroke-width': 1,
      'circle-stroke-color': '#fff'
      }
      }); */

    map.on('mouseenter', id, onMouseEnter);
    map.on('mouseleave', id, onMouseLeave);
    map.on('click', id, onClickCallback);

    return () => {
      Array.from(map.getContainer().getElementsByClassName('mapboxgl-popup')).forEach(el => el.remove());

      map.off('mouseenter', id, onMouseEnter);
      map.off('mouseleave', id, onMouseLeave);
      map.off('click', id, onClickCallback);


      //map.removeLayer("clusters");
      //map.removeLayer("cluster-count");
      //map.removeLayer("unclustered-point");
      map.removeLayer(id);
      map.removeSource(id);
    };
  }, [onClickCallback]);

  useEffect(() => {
    
    map.getSource(id).setData({
      type: 'FeatureCollection',
      features: positions.map(position => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [position.longitude, position.latitude],
        },
        properties: createFeature(devices, position),
      }))
    });
  }, [devices, positions]);

  return null;
}

export default PositionsMap;
