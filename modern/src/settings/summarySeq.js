import React, { useEffect, useState } from 'react';
import MainToolbar from '../MainToolbar';
import { TableContainer, Table, TableRow, TableCell, TableHead, TableBody, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import t from '../common/localization';
import { useEffectAsync } from '../reactHelper';
import EditCollectionView from '../EditCollectionView';
import Button from '@material-ui/core/Button';
import TimelineIcon from '@material-ui/icons/Timeline';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import HistoryDrawer from './Historydrawer'
import VerticalLinearStepper from './historyStepper'
import Seq from './seq'

const useStyles = makeStyles(theme => ({
  columnAction: {
    width: theme.spacing(1),
    padding: theme.spacing(0, 1),
  },
}));

// styling 
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
 // end of styling

const DriversView = ({ updateTimestamp, onMenuClick }) => {
  const classes = useStyles();
  const [items, setItems] = useState([]);

  const [historyopen,sethistoryopen] = useState(false)
  const [itemstepper,setitemstepper] = useState("")
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    sethistoryopen(open);
  };
  
  useEffectAsync(async () => {
    const response = await fetch('/api/drivers');
    if (response.ok) {
      const res =  await response.json()
      setItems(res);
    }
  }, [updateTimestamp]);

 // histoy by order of time 
 const parseJsonHistory=(data)=>{
   var histocrea=[]
   var histodest=[]
   var histo=[]
   var k=0;
   var kk=0
   if(data){
    const attr=data.attributes
    if(attr.creations){
       attr.creations.forEach(i=>histocrea.push("Sequence ajoutée à la voiture : "+i.carId+" le "+i.created ))
      }
    if(attr.destructions){
      attr.destructions.forEach(i=>histodest.push("Sequence supprimée de la voiture : "+i.carId+" le "+i.removed ))
      }
   }
    
    for(var i=0;i<histocrea.length+histodest.length;i++){
     if(i%2==0){histo.push(histocrea[k]);k++}
     else if(i%2!=0){histo.push(histodest[kk]);kk++}
     
    }
    
   
   return histo
 }
//end of function


  return (
    <div
    onClick={(event)=>{if(historyopen && event.target.className == "MuiBackdrop-root" ){sethistoryopen(false)}}}
    >
    <TableContainer >
    <Table >
      <TableHead>
        <TableRow >
          <StyledTableCell style={{backgroundColor:"#444444"}} className={classes.columnAction} />
          <StyledTableCell style={{backgroundColor:"#444444"}} >№ Sequentiels</StyledTableCell>
          <StyledTableCell style={{backgroundColor:"#444444"}} >Codes</StyledTableCell>
           <StyledTableCell style={{backgroundColor:"#444444"}} >History</StyledTableCell>
         {/* <TableCell>Telephone</TableCell> */} 
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item) => 
          <>
          {item.name.substring(0,2)=="S*" &&
          <StyledTableRow key={item.id}>
            <StyledTableCell className={classes.columnAction} padding="none">
              <IconButton onClick={(event) => onMenuClick(event.currentTarget, item.id)}>
                <MoreVertIcon />
              </IconButton>
            </StyledTableCell>
            <StyledTableCell>{item.name.substring(2,item.name.length)}</StyledTableCell>
            <StyledTableCell>{item.uniqueId}</StyledTableCell>
             <StyledTableCell >   
               <Button
              variant="outlined"
              color="primary"
              className={classes.button}
              startIcon={<HistoryOutlinedIcon />}
              onClick={()=>{sethistoryopen(!historyopen);setitemstepper(item)}}
              >
              Voir Historique
               </Button>
               </StyledTableCell> 
               <HistoryDrawer open={historyopen} list={<VerticalLinearStepper  data={parseJsonHistory(itemstepper) || [] }  />} />
          </StyledTableRow>
          } 
          </>
        )}
        
      </TableBody>
    </Table>
    </TableContainer>
    
    </div>
  );
}

const SummarySeq = () => {
  return (
    <>
      <MainToolbar />
      <EditCollectionView content={DriversView} editPath="/settings/seq" endpoint="drivers" />
    </>
  );
}

export default SummarySeq;
