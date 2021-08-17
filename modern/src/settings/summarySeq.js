import React, { useEffect, useState } from 'react';
import MainToolbar from '../MainToolbar';
import { TableContainer, Table, TableRow, TableCell, TableHead, TableBody, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useEffectAsync } from '../reactHelper';
import EditCollectionView from '../EditCollectionView';
import Button from '@material-ui/core/Button';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import HistoryDrawer from './Historydrawer'
import VerticalLinearStepper from './historyStepper'
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import { CSVLink, CSVDownload } from "react-csv";
import CSVReader from 'react-csv-reader'
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';



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
  const [Itemcenter,setItemcenter] = useState([]);
  const [historyopen,sethistoryopen] = useState(false)
  const [itemstepper,setitemstepper] = useState("")
  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    sethistoryopen(open);
  };
  
  const [loading,setloading]=useState(false)

  useEffectAsync(async () => {
    const response = await fetch('/api/drivers');
    if (response.ok) {
      const res =  await response.json()
      setItems(res);
    }
    setloading(true)
  }, [updateTimestamp]);

  useEffectAsync(async()=>{
    const response = await fetch('/flsk/histoEntite');
    if (response.ok) {
      const res =  await response.json()
      setItemcenter(res); 
    }
  },[])

  //find seq id entite

  const findSeqEntite=(item)=>{
    
    var lisa=[]
      for(var j=0;j<Itemcenter.length;j++)
      {
        if(item.id==Itemcenter[j].SeqId)
        {
          var d=new Date(Itemcenter[j].Date)
          d.setHours(d.getHours()-1)
          lisa.push({Centre:Itemcenter[j].Centre,date:d})
        }
      } 
    return lisa
  }
  

 // histoy by order of time 
 const parseJsonHistory=(data)=>{
   var histocrea=[]
   var histodest=[]
   var histo=[]
   var creaDataCSV=[]
   var remoDataCSV=[]
   var datacsv=[["Clé sequentiel","Attaché à", "supprimé de ","Date" ]]
   var k=0;
   var kk=0;
   
   if(data){
    const entite=findSeqEntite(data);
    histo=entite;
    const attr=data.attributes
    if(attr.creations){
       attr.creations.forEach(i=>{
         histocrea.push({ created:"Sequence ajoutée à la voiture : "+i.carId+" le "+i.created, date:i.created })
         creaDataCSV.push([data.name.substring(2),i.carId," ",i.created] )

        
        })
      }
    if(attr.destructions){
      attr.destructions.forEach(i=>{
        histodest.push({removed:"Sequence supprimée de la voiture : "+i.carId+" le "+i.removed,date:i.removed} )
        remoDataCSV.push([data.name.substring(2)," ",i.carId ,i.removed] )
      })
      }
   }
    
    for(var i=0;i<histocrea.length+histodest.length;i++){
     if(i%2==0){histo.push(histocrea[k]); datacsv.push(creaDataCSV[k]) ;k++}
     else if(i%2!=0){histo.push(histodest[kk]);datacsv.push(remoDataCSV[kk]);kk++}
    }
    
    histo.sort((a,b)=>new Date(a.date)-new Date(b.date))
    

   return [histo,datacsv]
 }
//end of function

// function soringify
const x=(data)=>{
  var lis=[];var headers=[]
  data.forEach(
    (i,j)=>{
    if(i.created)
    {
    headers.push("Affectation Sequence-voiture")
    lis.push(i.created)
    }
    else if (i.removed) { 
      headers.push("Désaffectation Sequence-voiture")
      lis.push(i.removed)
    }

    else{
       headers.push("Re/Affectation Sequence-Centre")
       lis.push("Conducteur assigné au centre "+i.Centre+" Le "+i.date)
      }
 })
 
 return [lis,headers]
}

  return (
    <>
    {loading ?(
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
           <StyledTableCell style={{backgroundColor:"#444444"}} >Historique</StyledTableCell>
           <StyledTableCell style={{backgroundColor:"#444444"}} >Export</StyledTableCell>
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
            <StyledTableCell>{item.name.substring(2)}</StyledTableCell>
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
               <StyledTableCell >  
               <CSVLink  filename={"historique_"+item.name.substring(2)+".csv"} data={parseJsonHistory(itemstepper)[1] || []}>
               <IconButton onClick={()=>{setitemstepper(item)}}>
                  <GetAppOutlinedIcon />
               </IconButton>
               </CSVLink>
               </StyledTableCell>  
               
               <HistoryDrawer open={historyopen} list={<VerticalLinearStepper  Sheaders={x(parseJsonHistory(itemstepper)[0])[1]} data={x(parseJsonHistory(itemstepper)[0])[0] || [] }  />} />
          </StyledTableRow>
          } 
          </>
        )}
        
      </TableBody>
    </Table>
    </TableContainer>
    
    </div>
    
    ):(<LinearProgress />)}
    </>
        
  );
}

const SummarySeq = () => {
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
      if(!res.ok){
        setOpen(true)
      }
    }
    setloading(true)
  }
  return (
    <>
      <MainToolbar />
      {loading?(<>
      <EditCollectionView content={DriversView} editPath="/settings/seq" endpoint="drivers" />
      <Button className={classes.fab} variant="outlined" >
      <div style={{ height: 'fit-content' ,position: "absolute" ,left: "0px",top: "0px" ,zIndex: 1,opacity:0}}>
          <CSVReader  onFileLoaded={(data) => importCSV(data)} / >
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

export default SummarySeq;
