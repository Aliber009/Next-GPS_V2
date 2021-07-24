import React, { Fragment, useState } from "react";
import { KeyboardDatePicker,MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { TextField } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MainToolbar from '../MainToolbar';
import DateFnsUtils from "@date-io/date-fns";
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    '& > *': {
      flexBasis: '33%',
    },
  },
}));


export default function FichConducteura() {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = useState(new Date());



  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} >
        <MainToolbar />
      <CssBaseline />
       
      <Paper style={{margin:'20px'}}>
      <Typography style={{marginLeft:'20px'}} gutterBottom variant="h5">
              Informations personelle
    </Typography>
     <Divider variant="middle" />
    
      <TextField style={{marginTop:'20px',marginInline:"10px"}} variant="outlined" label="Nom" size="small"></TextField>
      <TextField style={{marginTop:'20px',marginInline:"10px"}} variant="outlined" label="Prénom" size="small"></TextField>
      <TextField style={{marginTop:'20px',marginInline:"10px"}} variant="outlined" label="Telephone" size="small"></TextField>

      
      <TextField style={{marginTop:'20px',marginInline:"10px"}} variant="outlined" label="Adresse" size="small"></TextField>
      <TextField style={{marginTop:'20px',marginInline:"10px"}} variant="outlined" label="Ville" size="small"></TextField>
      
      
     
      <TextField style={{marginTop:'20px',marginInline:"10px"}} variant="outlined" label="Pays" size="small"></TextField>
      <KeyboardDatePicker
        style={{marginTop:'20px',marginInline:"10px"}}
        clearable
        value={selectedDate}
        placeholder="10/10/2018"
        inputVariant="outlined"
        label="Date de naissance"
        size="small"
        onChange={date => handleDateChange(date)}
       
        format="MM/dd/yyyy"
      />
      
       
      
      <Divider orientation="vertical" flexItem />
      <Typography style={{marginTop:'20px',marginLeft:'20px'}} gutterBottom variant="h5">
              Informations métier
      </Typography>
      <Divider variant="middle" />
      <TextField style={{marginTop:'20px',marginInline:"10px"}} variant="outlined" label="Contrat" size="small"></TextField>
      <TextField style={{marginTop:'20px',marginInline:"10px"}} variant="outlined" label="Fonction" size="small"></TextField>
      <TextField style={{marginTop:'20px',marginInline:"10px"}} variant="outlined" label="Permis" size="small"></TextField>
      <Divider orientation="vertical" flexItem />
      <TextField style={{marginTop:'20px',marginInline:"10px",marginBottom:'10px'}} variant="outlined" label="Centre d'affectation" size="small"></TextField>
      <KeyboardDatePicker
        style={{marginTop:'20px',marginInline:"10px"}}
        clearable
        value={selectedDate}
        //placeholder="10/10/2018"
        inputVariant="outlined"
        label="Date d'entrée"
        size="small"
        onChange={date => handleDateChange(date)}
        
        format="MM/dd/yyyy"
      />
      <KeyboardDatePicker
        style={{marginTop:'20px',marginInline:"10px"}}
        clearable
        value={selectedDate}
        //placeholder="10/10/2018"
        inputVariant="outlined"
        label="Date de Sortie"
        size="small"
        onChange={date => handleDateChange(date)}
       
        format="MM/dd/yyyy"
      />

      

     

     


       
      
          
       
     
      </Paper>
      <div style={{textAlign:"center"}}>
            <Button  style={{marginRight:"50px" ,width:'130px'}} type='button' color='primary' variant='outlined' >
                Annuler    
            </Button>
            <Button type='button' color='primary' variant='contained' >
              Enregistrer
            </Button>
          </div>

      </MuiPickersUtilsProvider>
  );
}
