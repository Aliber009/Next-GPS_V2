import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import MainToolbar from '../MainToolbar';
import { useParams } from 'react-router';
import { TextField,Grid, Card } from '@material-ui/core';
import { KeyboardDatePicker,MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ListItem } from '@material-ui/core';
import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { useEffectAsync } from '../reactHelper';
import CircularProgress from '@material-ui/core/CircularProgress';


function Alert(props) {
  
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://nextronic.ma/">
        Nextronic DigiEYE
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const {REACT_APP_FLASK}=process.env

const Checkout=()=> {

const [drId,setdrId]=useState({idrow:"",iddr:""})  
const [item,setItem] = useState({Adresse:null,email:null,etat:null,pays:null,DateNaissance:null,contrat:null,permis:null,dateEntry:null,dateSotie:null})
const uploadedImage = React.useRef(null);
const imageUploader = React.useRef(null);
const [selectedDate, handleDateChange] = useState(new Date());
const [selectedDate1, handleDateChange1] = useState(new Date());
const [selectedDate2, handleDateChange2] = useState(new Date());
const [selected,setselected] = useState([])
const {id} = useParams()
const[laoding, setloading] =useState(false)

useEffectAsync(async()=>{
  
  const r = await fetch(REACT_APP_FLASK+'/drivers')
  if(r.ok)
  {
    const res=await r.json()
    for(var i=0;i<res.length;i++){
      
      if(res[i].driverId.toString()===id){
        setdrId({idrow:res[i].id,iddr:res[i].driverId})
        setItem(res[i]);
        break;
      }
    }
    setloading(true)
  }


},[])


//feedBack
const [open, setOpen] = useState(false);
const [sever,setsever] = useState({})
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  //end of feedBack


//save image
  const [formData,setformData] = useState(new FormData())

  const handleImageUpload = e => {
    const fd=new FormData()
    const [file] = e.target.files;
    if (file) {
      setItem({...item,etat:file.name})
      fd.append('imag',file)
      fd.append('picName',file.name)
      // Update the formData object
      setformData(
        fd
      );
     
     
      const reader = new FileReader();
      const {current} = uploadedImage;
      current.file = file;
      
      reader.onload = (e) => {
          current.src = e.target.result;
          
         
      }
      reader.readAsDataURL(file);
     
      
    }
  };
  const saveimage=async()=>{
    await fetch(REACT_APP_FLASK+'/upload',{
     method:'POST',
     body:formData

    })
  }

  //end of image proce
  
  const classes = useStyles();
  console.log(item)

   const saveData=async()=>{
     if(drId.iddr==id ){
   const req=await fetch(REACT_APP_FLASK+'/drivers/'+drId.idrow,{method:"PUT",
   headers: { 'Content-Type': 'application/json' },
   body: JSON.stringify(item)
      })
      if(req.ok)
      {
        setsever({level:"success",msg:"les informations sont enregistrés"})
        setOpen(true)
      }
      else{
        setsever({level:"warning",msg:"les informations ne sont pas enregistrés"})
        setOpen(true)
        
      } 
    }
    else{
      const req=await fetch(REACT_APP_FLASK+'/drivers',{method:"POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
      })
      if(req.ok)
      {
        setsever({level:"success",msg:"les informations sont enregistrés"})
        setOpen(true)
      }
      else{
        setsever({level:"warning",msg:"les informations ne sont pas enregistrés"})
        setOpen(true)
        
      } 
    
    } 
  } 
  

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} >
      <CssBaseline />
      <MainToolbar  />
      
      <main className={classes.layout}>
      {laoding ?(
        <>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Fiche Conducteur
          </Typography>
          <Stepper activeStep={2} className={classes.stepper}>
              <Step >
                <StepLabel>{'Informations personelle'}</StepLabel>
              </Step>
              <Step >
                <StepLabel>{"Information métier"}</StepLabel>
              </Step>
          </Stepper> 
      <Typography variant="h6" gutterBottom>
        Informations personelle
      </Typography>
      <div style={{marginTop:20,maxWidth:160,minHeight:170}}>
      <label htmlFor="pic-upload"  >
      <input 
      id="pic-upload"
      name="pic-upload"
      type="file" accept="image/*" onChange={handleImageUpload}
        ref={imageUploader} style={{ display: 'none' }}
      />
      
      <Card style={{marginTop:20,maxWidth:160,maxHeight:170}}>
      <img className={classes.logo} ref={uploadedImage} src={item.etat || "/blank.JPG"} alt='driver' />
      </Card>
      <Button
            style={{marginTop:10}}
            variant="outlined"
            size="small"
            component="span" >
             Choisir image
          </Button>
      </label>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Prénom" 
            value={item.name || "" }
            onChange={(event)=>setItem({...item,driverId:id,name:event.target.value  })}
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="Nom"
            label="Nom"
            value={item.lastname || ""}
            onChange={(event)=>setItem({...item,lastname:event.target.value })}
            fullWidth
            autoComplete="family-name"
          />
         </Grid>
         <Grid item xs={12}>
          <TextField
            
            id="address1"
            name="address1"
            label="Addresse "
            value={item.Adresse|| ""}
            onChange={(event)=>setItem({...item,Adresse:event.target.value})}
            fullWidth
            autoComplete="shipping address-line1"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="E-mail"
            value={item.email|| ""}
            onChange={(event)=>setItem({...item,email:event.target.value})}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="Ville"
            value={item.ville || ""}
            onChange={(event)=>setItem({...item,ville:event.target.value})}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="Pays" fullWidth  value={item.pays|| ""} onChange={(event)=>setItem({...item,pays:event.target.value})} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Phone"
            value={item.phone || ""}
            onChange={(event)=>setItem({...item,phone:event.target.value})}
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="country"
            name="country"
            label="Etat"
            value={item.etat || ""}
            onChange={(event)=>setItem({...item,etat:event.target.value})}
            fullWidth
            autoComplete="shipping country"
          />
          </Grid>
          <Grid item xs={12} sm={6}>
        <KeyboardDatePicker
        style={{marginTop:'20px',marginInline:"10px"}}
        clearable
        placeholder="10/10/2018"
        //inputVariant="outlined"
        label="Date de naissance"
        size="small"
        format="MM/dd/yyyy"
        value={item.DateNaissance || selectedDate}
        
        onChange={date=>{handleDateChange(date); setItem({...item,DateNaissance:date})}}
      />
        </Grid>
          </Grid> 
          </Paper>
        <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom>
        Information Métier
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField  id="contrat" label="Contrat" fullWidth 
           value={item.contrat || ""}
          onChange={(event)=>setItem({...item,contrat:event.target.value})}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="fonction"
            label="Fonction"
            value={item.fonction || ""}
            onChange={(event)=>setItem({...item,fonction:event.target.value})}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField  id="expDate" label="Permis" fullWidth
          value={item.permis || ""}
          onChange={(event)=>setItem({...item,permis:event.target.value})}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Centre d'Affectation"
            required
            value={item.CentreAffectation || ""}
            onChange={(event)=>setItem({...item,CentreAffectation:event.target.value})}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
        <KeyboardDatePicker
        style={{marginTop:'20px',marginInline:"10px"}}
        clearable
        value={selectedDate1}
        placeholder="10/10/2018"
        label="Date d'Entrée'"
        size="small"
        format="MM/dd/yyyy"
        onChange={date=>{handleDateChange1(date) ; setItem({...item,dateEntry:date})}}
      />
        </Grid>
        <Grid item xs={12} md={6}>
        <KeyboardDatePicker
        style={{marginTop:'20px',marginInline:"10px"}}
        clearable
        value={selectedDate2}
        placeholder="10/10/2018"
        label="Date de Sortie"
        size="small"
        format="MM/dd/yyyy"
        onChange={date=>{handleDateChange2(date);setItem({...item,dateSotie:date})}}
      />
        </Grid>

     <Typography style={{ marginLeft:"12px",marginTop:"15px"}} variant="h6" gutterBottom>
        Importation Documents
      </Typography>
        <Grid item xs={12} md={6}>
        <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="btn-upload"
            style={{ display: 'none' }}
            type="file"
            multiple
            accept="image/png, image/jpeg, application/pdf, application/msword"
            onChange={(e)=>setselected([...e.target.files])}
             />
          <Button
            className="btn-choose"
            variant="outlined"
            component="span" >
             Choisir fichier
          </Button>
        </label>
        </Grid>
        <div style={{marginLeft:"12px"}}>
        {selected.length>0 &&
        <>
        <Typography variant="body2" className="list-header">
          List of Files :
          </Typography>
        <ul className="list-group">
          
            {selected.map((file, index) => (
              <ListItem
                divider
                key={index}>
                <a href={file.url}>{file.name}</a>
              </ListItem>
            ))}
        </ul>
        </>
        }
      </div >    
        </Grid>
        </Paper>
        <Button  
         style={{ marginTop:-30}}
           variant="contained" 
           color='primary'
           className={classes.button}
           onClick={()=>{saveimage();saveData()}} 
            >
                     Enregistrer
                    </Button>
  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity={sever.level}>
    {sever.msg}
  </Alert>
  </Snackbar>
        
        <Copyright />
        </>
        ) : (
        
        <Paper className={classes.paper}>
          <CircularProgress style={{ position:"relative",marginLeft:"50%"}} />
         </Paper>
          )}
      </main>
    
    </MuiPickersUtilsProvider>
  );
}
export default Checkout ;