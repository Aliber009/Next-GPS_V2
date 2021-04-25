
import React from 'react';
import MapboxDraw from 'C:/Users/ALTERNATOR/Desktop/Rapport-PFE/PFE/Traccar/nextTrac/modern/node_modules/@mapbox/mapbox-gl-draw';
import theme from '@mapbox/mapbox-gl-draw/src/lib/theme';
import { map } from './Map';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import {useState,useEffect} from 'react';
import 'font-awesome/css/font-awesome.min.css';
import {
  CircleMode,
  DragCircleMode,
  DirectMode,
  SimpleSelectMode
} from 'mapbox-gl-draw-circle';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { useEffectAsync } from '../reactHelper';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { geofenceToFeature } from './mapUtil';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


function ParseJson(data){
  let arrayData=[];
  var dat=data["features"];
  
  for(var i=0;i< dat.length;i++){
     if(Object.keys(dat[i]["properties"]).length==0){
       if(dat[i]["geometry"]["type"]=="Polygon"){
        var stri="POLYGON(("
        for(var j=0;j<dat[i]["geometry"]["coordinates"][0].length;j++){
          stri+=dat[i]["geometry"]["coordinates"][0][j][1]+" "+dat[i]["geometry"]["coordinates"][0][j][0]+","
    }
    stri=stri.substring(0,stri.length-1)+"))"
      arrayData.push(stri)
       }
       if(dat[i]["geometry"]["type"]=="LineString"){
        var striline="LINESTRING (";
        if(dat[i]["geometry"]["coordinates"].length==2){
          for(var k=0;k<dat[i]["geometry"]["coordinates"].length;k++){
            striline+=dat[i]["geometry"]["coordinates"][k][0]+" "+dat[i]["geometry"]["coordinates"][k][1]+","
          }
        }
        else{
        for(var k=0;k<dat[i]["geometry"]["coordinates"].length;k++){
          striline+=dat[i]["geometry"]["coordinates"][k][1]+" "+dat[i]["geometry"]["coordinates"][k][0]+","
        }
        }

    striline=striline.substring(0,striline.length-1)+")"
      arrayData.push(striline)


       }

      
    }
    else{ 
      arrayData.push("CIRCLE ("+dat[i]["properties"]["center"][1]+" "+dat[i]["properties"]["center"][0]+","+dat[i]["properties"]["radiusInKm"]*1000+")")
    }
  }
  return arrayData
}

class extendDrawBar {
  constructor(opt) {
    let ctrl = this;
    ctrl.draw = opt.draw;
    ctrl.buttons = opt.buttons || [];
    ctrl.onAddOrig = opt.draw.onAdd;
    ctrl.onRemoveOrig = opt.draw.onRemove;
  }
  onAdd(map) {
    let ctrl = this;
    ctrl.map = map;
    ctrl.elContainer = ctrl.onAddOrig(map);
    ctrl.buttons.forEach((b) => {
      ctrl.addButton(b);
    });
    return ctrl.elContainer;
  }
  onRemove(map) {
    let ctrl = this;
    ctrl.buttons.forEach((b) => {
      ctrl.removeButton(b);
    });
    ctrl.onRemoveOrig(map);
  }
  addButton(opt) {
    let ctrl = this;
    var elButton = document.createElement('button');
    elButton.className = 'fa fa-circle-o';
    if (opt.classes instanceof Array) {
      opt.classes.forEach((c) => {
        elButton.classList.add(c);
      });
    }
    elButton.addEventListener(opt.on, opt.action);
    ctrl.elContainer.appendChild(elButton);
    opt.elButton = elButton;
  }
  removeButton(opt) {
    opt.elButton.removeEventListener(opt.on, opt.action);
    opt.elButton.remove();
  }
}



const draw = new MapboxDraw({
 displayControlsDefault: false,
  controls: {
    point: true,
    line_string: true,
    polygon: true,
    trash: true,
  
  },
 
  styles: theme,
  
 
  modes: {
   ...MapboxDraw.modes,
    draw_circle  : CircleMode,
    drag_circle  : DragCircleMode,
    direct_select: DirectMode,
    simple_select: SimpleSelectMode
  },
    
  
  defaultMode: "simple_select",
  userProperties: true
});
var drawBar = new extendDrawBar({
  draw: draw,
  
  buttons: [
    {
      on: 'click',
      action: function circle(){
        
      draw.changeMode('draw_circle');
      },
      classes: []
    }
  ] 
}); 
var n=new Map();

const GeofenceEditMap = () => {

 const [geo, setGeo] = useState([]);
 
  useEffectAsync(async () => {
    const response = await fetch('/api/geofences');
    if (response.ok) {
      //setGeofences(await response.json());
      const geojson=await response.json();
      console.log(geofenceToFeature(geojson[0]))
      setGeo(geofenceToFeature(geojson[0]));
      
    }
    
  
  }, []);
  
   var m=new Map() // The idea is to affect to every id in map , the id in data base
   // the data name is saved with id and Name as a map
  useEffect(() => {
    map.addControl(drawBar, 'top-left');
    return () => map.removeControl(drawBar);
  }, []);
   

  const [open, setOpen] = React.useState(false);
  const [txt,settxt] = React.useState(""); 
  const [btntxt,setbtntxt] = React.useState(""); 
  const [id,setid] = React.useState("");
  const [idmap,setidmap] = React.useState("");
  const [area,setarea]=React.useState("");

  const handleClickOpen = () => {
    setOpen(true);  
  };
  
  const handleClose = (e,methode) => {  
    setbtntxt(txt);
    setOpen(false);
    geofenceName()
  };
  

  const geofenceName=()=>{
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
      
       "name": txt,
       "description": "string",
       "area": area,
       "calendarId": 0,
       "attributes": { } 
      })
    }
 
  fetch('/api/geofences/', requestOptions)
      .then(response => response.json())  
      .then(response => {
        setid(response.id);
        n.set(response.id,response.name);
        m.set(idmap,response.id);
        
        })
  
}
//draw.add(geo);

 
  map.on('draw.create', function (e) {
    handleClickOpen();
    setarea(ParseJson(e).toString());       
            //m.set(e.features[0].id, response.id  );
          setidmap(e.features[0].id);
              
            }) ;

 
  
  map.on('draw.update',function (e) {
       const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
 "id" :  m.get(e.features[0].id),   
  "name": n.get(m.get(e.features[0].id)),
"description": "string",
"area": ParseJson(e).toString(),
"calendarId": 0,
"attributes": { } 
      })
  };
  fetch('/api/geofences/'+(m.get(e.features[0].id)), requestOptions)
      .then(response => response.json())      
  } );


  map.on('draw.delete', function (e) {
  fetch('/api/geofences/'+(m.get(e.features[0].id)), {method : "DELETE"})
      .then(response => response.json())  
  
  });
  return(
    <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-labelledby="alert-dialog-slide-title"
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle id="alert-dialog-slide-title" align="center">   Geofence Name</DialogTitle>
    <DialogContent>
    <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Name"
        type="text"
        fullWidth
        onChange={e=> settxt(e.target.value)}
      />
    </DialogContent>
    <DialogActions style={{alignItems: "center", justifyContent: "center"}}>
      <Button onClick={handleClose} color="primary">
        Enter
      </Button>
    </DialogActions>
  </Dialog>

  );
  
  
}

export default GeofenceEditMap;