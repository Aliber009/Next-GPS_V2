import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { devicesActions } from './store';
import EditCollectionView from './EditCollectionView';
import { useEffectAsync } from './reactHelper';
import WifiIcon from '@material-ui/icons/Wifi';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SpeedIcon from '@material-ui/icons/Speed';
import HeightIcon from '@material-ui/icons/Height';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import SearchBar from "material-ui-search-bar";
import { useState,useEffect } from 'react';



const useStyles = makeStyles((theme) => ({
  list: {
    maxHeight: '100%',
    overflow: 'auto',
  },
  icon: {
    width: '25px',
    height: '25px',
    filter: 'brightness(0) invert(1)',
    
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(3),
  },
}));

const DeviceView = ({ deviceId,updateTimestamp, onMenuClick }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const items = useSelector(state => Object.values(state.devices.items));
  const device = useSelector(state => state.devices.items);
  const position = useSelector(state => Object.values(state.positions.items));


 



 var mm={}
  const drivors = async (id) => {
    
    let i=0;
    let urllist=[]
    //for(i;i< items.length;i++){
        const response = await fetch('/api/drivers?deviceId='+id)
        const json = await response.json()
        if(json!=[]){
          json.forEach(i=>{
            if(i!=undefined && i.name.substring(0,2)=="S*")
            { mm={...mm,[id]:i.name.substring(2)} }
          })   
        }
     return mm;
   } 
 
 
  

  function findspeed(item){
    var text="0"
    position.forEach(i=>{if(i.deviceId==item.id){text=i.speed}})
    return text
  }

  function findDistance(item){
    var text="0"
    position.forEach(i=>{if(i.deviceId==item.id){text=i.attributes.totalDistance}})
    return text
  }
  //popover section
   
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  //end of popever section
  
  //ignit function
  const colorignit=(i)=>{
    var col=""
    if(i.status=="online"){col="green"}
    else if(i.status=="unknown"){col= "#FF7600"}
    return col
  }

  const [rows, setRows] = useState([]);
  const [constantItems,setconst] =useState([])
  var M=new Map()
  const [xx,setxx]=useState({})
  useEffectAsync(async () => {
    var x={}
    const response = await fetch('/api/devices');
    if (response.ok) {
      const ro=await response.json()
      dispatch(devicesActions.refresh(ro));
      setRows(ro)
      setconst(ro)
    for(var i=0;i<ro.length;i++){  
    x= await drivors(ro[i].id)
      }
      setxx(x)
    }
  }, [updateTimestamp]);

    

  
  //Search filter
  
  const [searched, setSearched] = useState("");

  const requestSearch = (searchedVal) => {
   
    const filteredRows = constantItems.filter((row) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
  setRows(filteredRows);
};

const cancelSearch = () => {
  setSearched("");
  requestSearch(searched);
};

  //end of search filter

  return (
    <div style={{maxHeight:'100%'}}>
  <SearchBar
    value={searched}
    onChange={(searchVal) => requestSearch(searchVal)}
    onCancelSearch={() => cancelSearch()}
  />
    <List className={classes.list} >
      {rows.map((item, index, list) => (
        
        <Fragment key={item.id}>
          
         {xx[item.id] == undefined  &&
          <>
          
          <ListItem button key={item.id} onClick={() => dispatch(devicesActions.select(item))}>
            
            <ListItemAvatar>
              <Avatar color="primary">
                <img className={classes.icon} src={`images/icon/${item.category || 'default'}.svg`} alt="" />
              </Avatar>
            </ListItemAvatar>
            
            <div>
            <ListItem  style={{marginBottom:"20px"}}>
            <ListItemText   
            primary={<Typography variant="subtitle2" style={{ marginTop:'-15px' ,color: '#000000' }}>{item.name.toUpperCase()}</Typography> }
            
            ></ListItemText>
            
            
            </ListItem >
            <TextField
            disabled
            style={{marginTop:"-20px"}}
            id="outlined-size-normal"
            value={''}
            variant="outlined"
            size="small"
            label="№ sequentiel"
        />
            <Tooltip title={item.status} arrow>
            <IconButton style={{marginLeft:-5, width:"20px",height:"20px"}}>
            <WifiIcon
            style={{fill: `${colorignit(item)}`, width:"20px",height:"20px"}}/>
            </IconButton>
            </Tooltip>
            <Tooltip title={"Vitesse: " +findspeed(item)+" Km"} arrow>
            <IconButton  style={{marginLeft:17, width:"20px",height:"20px"}}>
            <SpeedIcon color="primary" style={{width:"20px",height:"20px"}} />
            </IconButton>
            </Tooltip>
            <Tooltip title={"Distance:"+(findDistance(item)/1000).toString().split(".")[0]+" Km" } arrow>
            <IconButton  style={{marginLeft:12, width:"20px",height:"20px"}}>
             <HeightIcon color="primary" style={{width:"20px",height:"20px"}} />
             </IconButton>
             </Tooltip>
             <Tooltip title={"Carburant: " } arrow>
             <IconButton  style={{marginLeft:15, width:"20px",height:"20px"}}>
            <LocalGasStationIcon color="primary" style={{width:"20px",height:"20px"}}  /> 
            </IconButton>
            </Tooltip>
            <Tooltip title={"Ajouter Facture"} arrow>
            <IconButton  style={{marginLeft:18, width:"20px",height:"20px"}} onClick={()=>history.push('/cout/'+item.id)} >
            <AttachMoneyIcon color="primary" style={{width:"20px",height:"20px"}} /> 
            </IconButton>
            </Tooltip>
            </div>
            
            <ListItemSecondaryAction>
              <IconButton style={{marginRight:"-10px"}} onClick={(event) => onMenuClick(event.currentTarget, item.id)}>
                <MoreVertIcon />
              </IconButton>
            </ListItemSecondaryAction>
           
          </ListItem>
           
          
          {index < list.length - 1 ? <Divider /> : null}
          </>
      }
        </Fragment>
    
      
      ))}
    </List>
    
    
    </div>
  );
}

const DevicesListgpsonly = () => {
  return (
    <EditCollectionView content={DeviceView} editPath="/device" endpoint="devices" />
  );
}

export default DevicesListgpsonly;
