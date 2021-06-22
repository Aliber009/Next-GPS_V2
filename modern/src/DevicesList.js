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


const useStyles = makeStyles(() => ({
  list: {
    maxHeight: '100%',
    overflow: 'auto',
  },
  icon: {
    width: '25px',
    height: '25px',
    filter: 'brightness(0) invert(1)',
    
  },
}));

const DeviceView = ({ deviceId,updateTimestamp, onMenuClick }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const items = useSelector(state => Object.values(state.devices.items));
  const device = useSelector(state => state.devices.items);
  
  const position = useSelector(state => Object.values(state.positions.items));

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

  useEffectAsync(async () => {
    const response = await fetch('/api/devices');
    if (response.ok) {
      dispatch(devicesActions.refresh(await response.json()));
    }
  }, [updateTimestamp]);

  return (
    <div style={{maxHeight:'100%'}}>
      
    <List className={classes.list} >
      {items.map((item, index, list) => (
        <Fragment key={item.id}>
          <ListItem button key={item.id} onClick={() => dispatch(devicesActions.select(item))}>
            <ListItemAvatar>
              <Avatar color="primary">
                <img className={classes.icon} src={`images/icon/${item.category || 'default'}.svg`} alt="" />
              </Avatar>
            </ListItemAvatar>
            
            <div>
            <ListItem >
            <ListItemText   primary={<Typography variant="subtitle2" style={{ color: '#000000' }}>{item.name.toUpperCase()}</Typography> } ></ListItemText>
            </ListItem >

            <ListItem >
            <ListItemIcon >
            <WifiIcon  style={{marginLeft:-20, width:"20px",height:"20px"}}/>
            </ListItemIcon>
            <ListItemText   style={{marginLeft:-40}} secondary={"Statut: "+item.status }></ListItemText>
            </ListItem>

            <ListItem >
            <ListItemIcon >
            <SpeedIcon color="primary" style={{marginLeft:-20, width:"20px",height:"20px"}} />
            </ListItemIcon>
            <ListItemText style={{marginLeft:-40}} secondary={"Vitesse: " +findspeed(item)+" Km"} ></ListItemText>
            </ListItem>

            <ListItem>
            <ListItemIcon >
            <HeightIcon color="secondary" style={{marginLeft:-20, width:"20px",height:"20px"}} />
            </ListItemIcon>
            <ListItemText  style={{marginLeft:-40}} secondary={"Distance:"+(findDistance(item)/1000).toString().split(".")[0]+" Km" }></ListItemText>
            </ListItem>

            <ListItem>
            <ListItemIcon >
            <LocalGasStationIcon color="primary" style={{marginLeft:-20, width:"20px",height:"20px"}} />
            </ListItemIcon>
            <ListItemText style={{marginLeft:-40}}  secondary={"Carburant: " }></ListItemText>
            </ListItem>
            <Button   variant="outlined" size="small"  color="primary" onClick={()=>history.push('/cout/'+item.id)}>
               <Typography variant="button" >Ajouter Facture</Typography>
            </Button>

    
            </div>
            
            <ListItemSecondaryAction>
              <IconButton  onClick={(event) => onMenuClick(event.currentTarget, item.id)}>
                <MoreVertIcon />
              </IconButton>
            </ListItemSecondaryAction>
            
          </ListItem>
          {index < list.length - 1 ? <Divider /> : null}
        </Fragment>
      ))}
    </List>
    

    </div>
  );
}

const DevicesList = () => {
  return (
    <EditCollectionView content={DeviceView} editPath="/device" endpoint="devices" />
  );
}

export default DevicesList;
