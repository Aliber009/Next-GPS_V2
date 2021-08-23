import React, { useEffect, useState } from 'react';
import MainToolbar from '../MainToolbar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useEffectAsync } from '../reactHelper';
import EditCollectionView from '../EditCollectionView';
import Button from '@material-ui/core/Button';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CSVReader from 'react-csv-reader'
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Select} from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DataGrid } from '@material-ui/data-grid';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import { useHistory } from 'react-router';
import { IconButton } from '@material-ui/core';
import VerticalLinearStepper from './historyStepper';
import HistoryDrawer from './Historydrawer';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  columnAction: {
    width: theme.spacing(1),
    padding: theme.spacing(0, 1),
  },
  fab: {
    position: 'absolute',
  
     top: theme.spacing(11)+"%",
    
    right: theme.spacing(5)+"%", 
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
  const [reslItems,setrealitems] =useState([])
  useEffectAsync(async () => {
    const response = await fetch('/api/drivers');
    if (response.ok) {
      const respo=await response.json()
      
      setItems(()=>{var rowsItems=[];
      respo.forEach(i=> { if(i.name.substring(0,2)!="S*"){rowsItems.push({name:i.name,attributes:i.attributes,id:i.id,col2:i.name,col3:i.uniqueId,col4:i.attributes.center})}});
      return rowsItems 
       })
     
    }
    
  }, [updateTimestamp,refresh]);

  //find seq id entite

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
 
  var itemreal={id:item.id,name:item.name,uniqueId:item.col3,attributes:item.attributes}
  
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
       ...itemreal,attributes:{center:center.centername}
     })
   })
   setrefresh(!refresh)
   setloading(false)
   handleClose()
}


//end of history
  
const CentreAff=(item)=>{
  
  return(
       <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={item.row.attributes.center || "" }
          onChange={
            e=>{
              setcenter({itema:item.row,centername:e.target.value,iddriver:item.row.id});
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
  )
}
const fichCond=(item)=>{
  return(
  <Button
        variant="outlined"
        color="primary"
        className={classes.button}
        onClick={()=>history.push('/settings/fiches/'+item.id)}
        startIcon={<AssignmentOutlinedIcon />} 
         >
        Afficher la fiche du conducteur
    </Button>
  )
}

const HistoCond=(item)=>{
  return(
    <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              onClick={()=>{setheaders(x(parseJsonHistory(item.id))[1]);sethistoryopen(!historyopen);setshow(x(parseJsonHistory(item.id))[0])}}
              startIcon={<HistoryOutlinedIcon />} 
              >
              Voir historique 
               </Button>
  )
}
const btnAction = (item) => {
  return (
      <IconButton style={{height:30,width:30}} onClick={(event) => onMenuClick(event.currentTarget, item.id)}>
      <MoreVertIcon />
      </IconButton> 
  )
}

const columns = [
  { field: 'col1', headerName: " ",renderCell:btnAction, disableColumnMenu:true,editable:false,width: 59 },
  { field: 'col2', headerName: 'Nom conducteur', editable: true,width: 250 },
  { field: 'col3', headerName: 'Identifiant', editable: true,width: 150 },
  { field: 'col4', headerName: "Centre d'affectation",renderCell: CentreAff, editable: true,width: 150 },
  { field: 'col5', headerName: 'Fiche Conducteur', renderCell: fichCond, disableColumnMenu:true, editable: true,width: 350 },
  { field: 'col6', headerName: 'Historique', renderCell: HistoCond, disableColumnMenu:true, editable: true,width: 350 },
];

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
    <>
    {!loading ?(
     <div onClick={(event)=>{if(historyopen && event.target.className == "MuiBackdrop-root" ){sethistoryopen(false)}}} style={{ height: 700, width: '100%' }}>
   <DataGrid
        rows={items}
        columns={columns}
        pageSize={5}
        disableSelectionOnClick
      />
       {dial(center.itema)}
    <HistoryDrawer open={historyopen} list={ <VerticalLinearStepper  source={"drivers"} data={show} headers={headers} /> 
      }  />
    </div>
    
    ):(<LinearProgress />)}
    </>
        
  );
}

const GridSeq = () => {
  const classes = useStyles();
  const [loading,setloading]=useState(true)
  //feedback
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  //end of feedback

  const importCSV=async(data)=>{
    
    for (var i=1;i<data.length;i++)
    {
     setloading(false)
     const res = await fetch('api/drivers',{
      method:"POST",
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
          name:"S*"+data[i][0],
          uniqueId:data[i][1],
          attributes:{}
        })
      })
      if(!res.ok)
      {
        setOpen(true)
      }
    }
    setloading(true)
  }
  return (
    <>
      <MainToolbar />
      {loading?(<>
      <EditCollectionView content={DriversView} editPath="/settings/driver" endpoint="drivers" />
      <Button className={classes.fab} variant="outlined" >
      <div style={{ height: 'fit-content' ,position: "absolute" ,left: "0px",top: "0px" ,zIndex: 1,opacity:0}}>
          <CSVReader  onFileLoaded={(data) => importCSV(data)} />
      </div>
       Importer depuis fichier Excel
     </Button>
     </>
      ):(<LinearProgress />)}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
     <Alert onClose={handleClose} severity="warning">
      Un ou plusieur numéro Sequentiels ne peut étre importé!
      </Alert>
     </Snackbar>
    </>
  );
}

export default GridSeq;