import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import axios from 'axios';
import ChangeHistoryOutlinedIcon from '@material-ui/icons/ChangeHistoryOutlined';
//import 'font-awesome/css/font-awesome.min.css';
import Divider from '@material-ui/core/Divider';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


//import { StreetviewIcon } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function SimpleList() {
  const [dataPos, setdataPos] = useState([])
  const [deleted, setdeleted] = useState(false)
  
  useEffect( () => {
     axios
      .get('/api/geofences')
      .then(res => setdataPos(res.data))
      .catch(err=>{console.log(err)})
       setdeleted(false)
       
    
  },[deleted]);
  


  function deletegeo(id){
  fetch('/api/geofences/'+id,  {method: 'DELETE'})
      .then(response => {response.json();setdeleted(true)})
    
  }
  const classes = useStyles();

  return (
    
    <div > 
     <List >
  {dataPos.map(item=>( <> <Divider /> <ListItem button id={item.id} ><ListItemIcon> <ChangeHistoryOutlinedIcon /> </ListItemIcon> 
    <ListItemText  primary={item.name}></ListItemText>
    <IconButton  style={{ marginRight:-5}} aria-label="delete" className={classes.margin} onClick={()=>{deletegeo(item.id) ;console.log("yes")}}>
          <CloseIcon />
        </IconButton>
    </ListItem> 
       </>
    ))}  
  </List>
    </div>
    
  );
}