
  
  export const styleCustom = (url, attribution) => ({
    version: 8,
    sources: {
      osm: {
        type: 'raster',
        tiles: [url],
        attribution: attribution,
        tileSize: 256,
      },
    },
    glyphs: "mapbox://fonts/openmaptiles/{fontstack}/{range}.pbf",
    layers: [{
      id: 'osm',
      type: 'raster',
      source: 'osm',
    }],
  });
  
  export const styleOsm = () => styleCustom(
    "https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&s=Ga",
    /* "https://2.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?apiKey=5a-xmj8r0AieqdXFVlApxIfR8dG67llYZlF_ixmjMls&pois" */
    '© <a target="_top" rel="noopener" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  );
  
  export const styleCarto = () => ({
    'version': 8,
    'sources': {
      'raster-tiles': {
        'type': 'raster',
        'tiles': [
            'https://a.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png',
            'https://b.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png',
            'https://c.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png',
            'https://d.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png'
        ],
        'tileSize': 256,
        'attribution': '© <a target="_top" rel="noopener" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, © <a target="_top" rel="noopener" href="https://carto.com/attribution">CARTO</a>'
      }
    },
    'glyphs': 'https://cdn.traccar.com/map/fonts/{fontstack}/{range}.pbf',
    'layers': [
      {
        'id': 'simple-tiles',
        'type': 'raster',
        'source': 'raster-tiles',
        'minzoom': 0,
        'maxzoom': 22,
      }
    ]
  });
  
  export const styleMapbox = (style) => `mapbox://styles/mapbox/${style}`;
  
  export const styleMapTiler = (style, key) => `https://api.maptiler.com/maps/${style}/style.json?key=${key}`;