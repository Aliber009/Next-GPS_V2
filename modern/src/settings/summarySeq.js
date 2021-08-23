
import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useEffectAsync } from '../reactHelper';
import { useState } from 'react';
import { Button } from '@material-ui/core';
import EditCollectionView from '../EditCollectionView';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import HistoryDrawer from './Historydrawer'
import VerticalLinearStepper from './historyStepper'
import LinearProgress from '@material-ui/core/LinearProgress';
import MainToolbar from '../MainToolbar';
import { CSVLink } from 'react-csv';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CSVReader from 'react-csv-reader'
import { makeStyles } from '@material-ui/core/styles';
import historyApiFallback from 'connect-history-api-fallback';




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
  

//check GridRowsProp
const Driversview=({ updateTimestamp, onMenuClick })=>{
    const [items,setItems] =useState([])
    const [selectionModel, setSelectionModel] = useState([]);
    const [Itemcenter,setItemcenter] = useState([]);
    const [historyopen,sethistoryopen] = useState(false)
    const [itemstepper,setitemstepper] = useState("")
    const [loading,setloading]=useState(false)


    useEffectAsync(async () => {
        const response = await fetch('/api/drivers');
        if (response.ok) {
          const res =  await response.json()
          setItems(()=>{
              var rowsItems=[];
              res.forEach(i=> { if(i.name.substring(0,2)=="S*"){rowsItems.push({name:i.name,attributes:i.attributes,id:i.id,col2:i.name.substring(2),col3:i.uniqueId})}});
              return rowsItems
               }
             );    
            } 
            setloading(true)
      }, [updateTimestamp]);

   // histo entite
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
    var datacsv=[["Clé sequentiel","Attaché à", "supprimé de ","Affecté à","Date" ]]
    var k=0;
    var kk=0;
    
    if(data){
     const entite=findSeqEntite(data);
     histo=entite;
     const attr=data.attributes
     if(attr.creations){
        attr.creations.forEach(i=>{
          histocrea.push({ created:"Sequence ajoutée à la voiture : "+i.carId+" le "+i.created, date:i.created,ajoute:i.carId })
         
         })
       }
     if(attr.destructions){
       attr.destructions.forEach(i=>{
         histodest.push({removed:"Sequence supprimée de la voiture : "+i.carId+" le "+i.removed,date:i.removed,supprimer:i.carId} )
        
       })
       }
    }
     
     for(var i=0;i<histocrea.length+histodest.length;i++){
      if(i%2==0){histo.push(histocrea[k]) ;k++}
      else if(i%2!=0){histo.push(histodest[kk]) ;kk++}
     }
     histo.sort((a,b)=>new Date(a.date)-new Date(b.date))
     histo.forEach(i=>{
         if(i.ajoute)
         {datacsv.push([data.name.substring(2),i.ajoute," "," ",i.date])}
         else if(i.supprimer){
            datacsv.push([data.name.substring(2)," ",i.supprimer," ",i.date]) 
         }
         else {
            datacsv.push([data.name.substring(2)," "," ",i.Centre,i.date]) 
         }
        });
 
    return [histo,datacsv]
  }
 //end of function

  //function sorting
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
       lis.push("Sequentiel assigné au centre "+i.Centre+" Le "+i.date)
      }
 })
 return [lis,headers]
}
  
  
const hitsorybtn = (item) => {
    return (
            <Button
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<HistoryOutlinedIcon />}
                style={{ marginLeft: 16 }}
                onClick={()=>{sethistoryopen(!historyopen);setitemstepper(item.row)}} >
                Voir historique
            </Button>
           )
       }
const exportbtn = (item) => {
    return (
        <CSVLink  filename={"historique_"+item.row.name.substring(2)+".csv"} data={parseJsonHistory(itemstepper)[1] || []}>
        <IconButton onClick={()=>{setitemstepper(item.row)}}>
        <GetAppOutlinedIcon />
        </IconButton>
        </CSVLink>  
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
    { field: 'col2', headerName: 'clés sequentielles', editable: true,width: 350 },
    { field: 'col3', headerName: 'Code', editable: true,width: 350 },
    { field: 'col4', headerName: 'Historique',renderCell: hitsorybtn, disableColumnMenu:true, editable: true,width: 450 },
    { field: 'col5', headerName: 'Export', renderCell: exportbtn, disableColumnMenu:true, editable: true,width: 200 },
  ];

  return (
      <>
    {loading ?(
    <div onClick={(event)=>{if(historyopen && event.target.className == "MuiBackdrop-root" ){sethistoryopen(false)}}} style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={items}
        columns={columns}
        pageSize={3}
        disableSelectionOnClick
      />
      <HistoryDrawer open={historyopen} list={<VerticalLinearStepper  Sheaders={x(parseJsonHistory(itemstepper)[0])[1]} data={x(parseJsonHistory(itemstepper)[0])[0] || [] }  />} />
    </div>
    ):(<LinearProgress />)}
    </>
  );
}

export default function SummarySeq(props) {

    const classes = useStyles();
    const [loading,setloading]=useState(true)
    const [open, setOpen] = React.useState(false);

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
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') 
        {
          return;
        }
        setOpen(false);
      };

return(
    <>
    <MainToolbar />
    {loading?(<>
    <EditCollectionView content={Driversview} editPath="/settings/seq" endpoint="drivers" />
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
 )


}