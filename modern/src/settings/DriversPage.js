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
  const history = useHistory()
  const [historyopen,sethistoryopen]=useState(false)

  useEffectAsync(async () => {
    const dr=await fetch('http://localhost:5000/histoconductor')
    if(dr.ok){
      sethistodriver(await dr.json())
    }
  },[])

  useEffectAsync(async () => {
    const response = await fetch('/api/drivers');
    if (response.ok) {
      setItems(await response.json());
    }
    
  }, [updateTimestamp]);

 //history of drivers
 const parseJsonHistory=(drivID)=>{
  var histo=[]
  
  var datacsv=[["Clé sequentiel","Attaché à", "supprimé de ","Date" ]]
  var k=0;
  var kk=0
  
  for(var i=0;i<histodriver.length;i++)
  {
    if(drivID===histodriver[i].driverId){
        histo.push(histodriver[i])
   }  
  }
  histo.sort((a,b) => new Date(a.Date)-new Date(b.Date));
  return histo
 }

 const x=(data)=>{
  var lis=[]
  data.forEach(
    (i,j)=>{
    if(j%2==0)
    {
    lis.push("Conducteur affecté à la voiture "+i.CarId+ " Le "+i.Date)
    }
    else{ lis.push("Conducteur désaffecté de la voiture "+i.CarId+ " Le "+i.Date)}
 })
 return lis
}

//end of history
const [show,setshow]=useState([])

  return (
    <div
    onClick={(event)=>{if(historyopen && event.target.className == "MuiBackdrop-root" ){sethistoryopen(false)}}}
    >
    <TableContainer>
    <Table>
      <TableHead>

        <TableRow>
          <TableCell className={classes.columnAction} />
          <TableCell>{t('sharedName')}</TableCell>
          <TableCell>Identifiant</TableCell>
          <TableCell>Fiche conducteur </TableCell>
          <TableCell>Hitorique conducteur </TableCell>
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
              onClick={()=>{sethistoryopen(!historyopen);setshow(x(parseJsonHistory(item.id)))}}
              startIcon={<HistoryOutlinedIcon />}
              
              >
              Voir historique 
               </Button>
               </TableCell>
               <HistoryDrawer open={historyopen} 
       list={
      <VerticalLinearStepper  source={"drivers"} data={show}  /> 
      }  
      /> 
          </TableRow>
          
             }
          </>
        )}
      </TableBody>
       
    </Table>
    </TableContainer>
    </div>
  );
}

const DriversPage = () => {
  return (
    <>
      <MainToolbar />
      <EditCollectionView content={DriversView} editPath="/settings/driver" endpoint="drivers" />
    </>
  );
}

export default DriversPage;
