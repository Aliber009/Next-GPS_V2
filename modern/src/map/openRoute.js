import React,{useEffect, useState} from 'react'
import { map } from './Map';
import { useEffectAsync } from '../reactHelper';

var openrouteservice = require("openrouteservice-js");
var waypoints={};
const OpenRoute=(props)=>{
//const [waypoints,setwaypoints]= useState({})
const id="route";
var Directions = new openrouteservice.Directions({
  api_key: "5b3ce3597851110001cf624803d896806f2544b6a95312df342a12d7"
});

// function to save the geofence Route in the server but be aware of the kb size
// since it save thousands of waypoints as a layer 

function ParseJson(data){
  let arrayData=[];
  var dat=data.features[0].geometry["coordinates"]
  var striline="LINESTRING (";
      if(dat.length==2){
        for(var k=0;k<dat.length;k++){
          striline+=dat[k][0]+" "+dat[k][1]+","
        }
      }
      else{
        for(var k=0;k<dat.length;k++){
          striline+="("+dat[k][1]+","+dat[k][0]+"),"
        }
      }
  striline=striline.substring(0,striline.length-1)+")"
  arrayData.push(striline)    
    return arrayData
  }


useEffect(() => {

 fetch("http://api.carmd.com/v3.0/decode?vin=VNKKL3D330A261601",{
  method: "GET",
  headers: new Headers({
  "content-type":"application/json",
  "authorization":"Basic ZWQxMjE1OTMtZTAyYy00ZTE0LWE5NGYtOTFiNDYxNDY2NTQ2",
  "partner-token":"ab78e34e671046d4b0f0f16ac14310be"
  })})
 .then(response=>response.json())
 .then(response=> console.log(response))


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
      map.addLayer({
        'source': id,
        'id': "fill-line2",
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
          return ()=>{map.removeLayer(id);
            map.removeLayer("fill-line2"); 
            map.removeLayer(id);
            map.removeSource(id);
          };
   
}, [])


useEffectAsync(async() => {
  
  const link="https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf624803d896806f2544b6a95312df342a12d7&start="+props.start+"&end="+props.end
    const res=await fetch(link)
    if (res.ok){
        const directs=await res.json()
        waypoints=directs.features[0].geometry
        props.distance((directs.features[0].properties.summary.distance/1000).toFixed(2)+" KM")
        props.time((directs.features[0].properties.summary.duration/60).toFixed(2)+ " min")
       
    }
    
   
    map.getSource(id).setData({
      type: 'Feature',
      geometry:waypoints,
    });
  
}, [props.start,props.end]);
return null;

}
export default OpenRoute;