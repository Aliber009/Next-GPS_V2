import React,{ useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import MainToolbar from './MainToolbar';
import Typography from '@material-ui/core/Typography';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useEffectAsync } from './reactHelper';
import { useSelector } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useHistory, useParams } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import NavigationIcon from '@material-ui/icons/Navigation';



const useStyles = makeStyles((theme) => ({
  
  fab: {
    position: 'absolute',
     
     top: theme.spacing(10)+"%",
    
    right: theme.spacing(5.5)+"%",
    marginRight:-30 
   
  },
  fab2: {
    position: 'absolute',
     
     top: theme.spacing(10)+"%",
    
    right: theme.spacing(6.2)+"%", 
    
  },
 
    rot: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      },
  root: {
    width:'auto',
    marginTop:theme.spacing(10),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(600 + theme.spacing(3 * 2))]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'},
    backgroundColor: theme.palette.background.paper,
    
}}));
const PurpleSwitch = withStyles({
    switchBase: {
      color:"#fafafa",
      '&$checked': {
        color: "#64dd17",
      },
      '&$checked + $track': {
        backgroundColor: "#64dd17",
      },
    },
    checked: {},
    track: {},
  })(Switch);

export default function SwitchListSecondary() {
  const history = useHistory();
  const adminEnabled = useSelector(state => state.session.user && state.session.user.administrator);
  const ActualUser = useSelector(state => state.session.user)
  const [mission,setmission]=useState([]);
  const classes = useStyles();
  const[ch,setch]=useState([]);
  const [missisonOfUsers,setmissionOfUsers]=useState([])

  
  useEffectAsync(async () => {
     var listmission=[]
     var listIds=[]
     var miss=[]
     
     
     

     const resUser = await fetch('http://127.0.0.1:5000/mission_users',{method:'GET'})
     if(resUser.ok){
     const jsonUser = await resUser.json();
     setmissionOfUsers(jsonUser)
     jsonUser.forEach(item=> {if(item.nameUser==ActualUser.name){listIds.push(item.missionID)}})
     miss=jsonUser.filter(i=>i.nameUser==ActualUser.name)
     }

    
     const res= await fetch('http://127.0.0.1:5000/missions',{method:'GET'})
     if(res.ok){
     const json= await res.json();
     

     
     listmission = json.filter(i=>listIds.includes(i.id))
    
     //console.log(listmission,listIds)
     setmission(listmission);
     setch(miss);
     
      }
      
     
  }, []);
  
  
  const switcher =(element)=>{
    fetch('http://127.0.0.1:5000/mission_users/'+element.id,{
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        element
       )
      })
    .then(response=>response.json())
  } 


  const deleter=(element)=>{
      fetch('http://127.0.0.1:5000/missions/'+element,{method:'DELETE'})
    .then(response => response.json())  
     
    missisonOfUsers.forEach(i=>{if(i.missionID==element){
      fetch('http://127.0.0.1:5000/mission_users/'+i.id,{method:'DELETE'})
      .then(response=>response.json)
    }})
     /*     
     
     */
    
  }

  const handleAdd = () => {
    history.push('/reports/mission');
  }
  function x(index){
    var x="";
    mission.forEach(i=>{if(i.id==ch[index].missionID){x=i.Description}})
    return x
    
  }
 
  

  return (
    <div className={classes.rot}>
    <MainToolbar />
    <List subheader={<ListSubheader align='center'> 
    <Typography variant="h5" gutterBottom>
        Missions
      </Typography>
      </ListSubheader>} className={classes.root}>
        {ch.map((item,index)=>(
         
         <ListItem button >
           
           
         <ListItemIcon>
           <AssignmentOutlinedIcon />
         </ListItemIcon>
         <ListItemText id={item.id} primary={x(index)} />
         <ListItemSecondaryAction>
         <FormControlLabel
         control={<PurpleSwitch checked={ch[index].notified} onChange={(e)=>{
           
           
            setch(()=>{
           const list=ch.map((j,k)=>{if(k==index){ j={...j, "notified" : e.target.checked};console.log(j);switcher(j) ;return j }else{return j}}); return list})

            } 
          }
           name={item.id} />}
         />
         {adminEnabled&&
         <IconButton aria-label="delete">
          <CloseIcon onClick={()=>{
            deleter(ch[index].missionID);
            setch(ch.filter((item,j)=> j != index));
            setmissionOfUsers(missisonOfUsers.filter(i=> i.missionID != ch[index].missionID ))
                   
            }} />
          </IconButton> 
            }     
         </ListItemSecondaryAction>
       </ListItem>
        ))}
    </List>
    {adminEnabled &&
    <>
      <Fab variant="extended" className={classes.fab2} onClick={() => history.push('/reports/missionSummary')}>
       <NavigationIcon className={classes.extendedIcon} />
         SOMMAIRE
        </Fab>
      <Fab  size="medium" color="primary" className={classes.fab} onClick={handleAdd} >
          <AddIcon />
        </Fab>
        </>
            }
    </div>
  );
}
