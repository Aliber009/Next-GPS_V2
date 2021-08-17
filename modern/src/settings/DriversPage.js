import React, { useEffect, useState } from 'react';
import MainToolbar from '../MainToolbar';
import { TableContainer, Table, TableRow, TableCell, TableHead, TableBody, makeStyles, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import t from '../common/localization';
import { useEffectAsync } from '../reactHelper';
import EditCollectionView from '../EditCollectionView';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import HistoryDrawer from './Historydrawer';
import VerticalLinearStepper from './historyStepper';
import { Select} from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';



const useStyles = makeStyles(theme => ({
  columnAction: {
    width: theme.spacing(1),
    padding: theme.spacing(0, 1),
  },
}));

const DriversView = ({ updateTimestamp, onMenuClick }) => {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [histodriver, sethistodriver] = useState([]);
  const [histocenter, sethistocenter] = useState([]);
  const [centern,setcentern]=useState([])
  const history = useHistory()
  const [historyopen,sethistoryopen]=useState(false)
  const [loading,setloading]=useState(false)
  const [refresh,setrefresh]=useState(false)
  useEffectAsync(async () => {
    const dr=await fetch('/flsk/histoconductor')
    if(dr.ok)
      {
    sethistodriver(await dr.json())
      }
  },[refresh])

  useEffectAsync(async () => {
    const dr=await fetch('/flsk/histocenter')
    if(dr.ok)
      {
        const list=await dr.json()
    sethistocenter(list)
      }
  },[refresh])
  
  useEffectAsync(async () => {
    const response = await fetch('/api/drivers');
    if (response.ok) {
      const respo=await response.json()
      setItems(respo);
     
    }
    
  }, [updateTimestamp,refresh]);

 //history of drivers
 const parseJsonHistory=(drivID)=>{
  var histo=[]
  
  var datacsv=[["Clé sequentiel","Attaché à", "supprimé de ","Date" ]]
  var k=0;
  var kk=0
  //cars
  for(var i=0;i<histodriver.length;i++)
  {
    if(drivID===histodriver[i].driverId){
        histo.push(histodriver[i])
        
   }  
  } 
  //center
  for(var i=0;i<histocenter.length;i++)
  {
    if(drivID===histocenter[i].driverId){
        histo.push(histocenter[i])    
   }  
  }

  histo.sort((a,b) => new Date(a.Date)-new Date(b.Date));

  return histo
 }

 //find center name

 const findcenter=(id)=>{
  var n="";
  for(var i=0;i<histocenter.length;i++) {
  if(id===histocenter[i].driverId){
   n=histocenter[i].center;
     }
    }
  
   return n
 }
 
 const x=(data)=>{
  var lis=[];var headers=[]
  data.forEach(
    (i,j)=>{
    if(i.added)
    {
    headers.push("Affectation Conducteur-voiture")
    lis.push("Conducteur affecté à la voiture "+i.CarId+ " Le "+i.Date)
    }
    else if (i.removed) { 
      headers.push("Désaffectation Conducteur-voiture")
      lis.push("Conducteur désaffecté de la voiture "+i.CarId+ " Le "+i.Date)
    }

    else{
       headers.push("Re/Affectation Conducteur-Centre")
       lis.push("Conducteur assigné au centre "+i.center+" Le "+i.Date)
      }
 })
 return [lis,headers]
}

//save histo center
const [center,setcenter]=useState({centername:"",iddriver:""})
const [headers,setheaders]=useState([]) 

const savecenter=async(item)=>{
  setloading(true)
  await fetch('/flsk/histocenter',{
   method:"POST",
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify({
      center:center.centername,
      driverId:center.iddriver,
     })
   })
   await fetch('api/drivers/'+item.id,{
     method:"PUT",
     headers: { 'Content-Type': 'application/json' },
     body:JSON.stringify({
       ...item,attributes:{center:center.centername}
     })
   })
   setrefresh(!refresh)
   setloading(false)
   handleClose()
}


//end of history
//dialog
const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

const dial=(item)=>{
  return(
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{"Conducteur Affecté"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        L'affectation a été modifié
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={()=>{savecenter(item);}} color="primary">
        ok
      </Button>
    </DialogActions>
  </Dialog>)
}
const [show,setshow]=useState([])

  return (
    <div
    onClick={(event)=>{if(historyopen && event.target.className == "MuiBackdrop-root" ){sethistoryopen(false)}}}
    >
      {!loading?(
    <TableContainer>
    <Table>
      <TableHead>

        <TableRow>
          <TableCell className={classes.columnAction} />
          <TableCell>{t('sharedName')}</TableCell>
          <TableCell>Identifiant</TableCell>
          <TableCell>Centre d'affectation</TableCell>
          <TableCell>Fiche conducteur </TableCell>
          <TableCell>Historique conducteur </TableCell>
        </TableRow>

      </TableHead>
      <TableBody>
        {items.map((item) => 
        <>
        

        {item.name.substring(0,2)!="S*" &&
          <TableRow key={item.id}>
            <TableCell className={classes.columnAction} padding="none">
              <IconButton onClick={(event) => onMenuClick(event.currentTarget, item.id)}>
                <MoreVertIcon />
              </IconButton>
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.uniqueId}</TableCell>
            <TableCell> 
              
            <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={item.attributes.center || "" }
          onChange={
            e=>{
             

              setcenter({itema:item,centername:e.target.value,iddriver:item.id});
              setItems(items.map(i=>(i.id==item.id ? {...i,attributes:{center:e.target.value}}:i  )  ) )
              setOpen(true)
            
            }
          }
        >
          <MenuItem value={"Meknes"}>meknes</MenuItem>
          <MenuItem value={"fez"}>Fez</MenuItem>
          <MenuItem value={"casa "}>casa</MenuItem>
          <MenuItem value={"Rabat"}>Rabat</MenuItem>
        </Select>  
        {dial(center.itema)}
               </TableCell>
            <TableCell>
              <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={()=>history.push('/settings/fiches/'+item.id)}
              startIcon={<AssignmentOutlinedIcon />}
              
              >
              Afficher la fiche du conducteur
               </Button>
               </TableCell>
               <TableCell>
              <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={()=>{setheaders(x(parseJsonHistory(item.id))[1]);sethistoryopen(!historyopen);setshow(x(parseJsonHistory(item.id))[0])}}
              startIcon={<HistoryOutlinedIcon />}
              
              >
              Voir historique 
               </Button>
               </TableCell>
               <HistoryDrawer open={historyopen} 
       list={
      <VerticalLinearStepper  source={"drivers"} data={show} headers={headers} /> 
      }  
      /> 
     
          </TableRow>
          
             }
          </>
        )}
      </TableBody>
       
    </Table>
    </TableContainer>
    ):(<LinearProgress />)}
    </div>
  );
}

const DriversPage = () => {

  return (
    <>
      <MainToolbar />
   
      <EditCollectionView  content={DriversView} editPath="/settings/driver" endpoint="drivers" />
      
    </>
  );
}

export default DriversPage;
