import React , { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker,MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Button } from '@material-ui/core';
import { ListItem } from '@material-ui/core';

export default function PaymentForm({careerData,dataFirstPage}) {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [infomet,setimnfomet] = useState({contrat:null,permis:null,dateEntry:null,dateSotie:null})
  const [selected,setselected] = useState([])
 

  useEffect(() => {

    careerData(infomet)
    
  }, [infomet])
  
  
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} >

      <Typography variant="h6" gutterBottom>
        Information Métier
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField  id="contrat" label="Contrat" fullWidth 
           onChange={(event)=>setimnfomet({...dataFirstPage,...infomet,contrat:event.target.value})}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="fonctionr"
            label="Fonction"
            fullWidth
            onChange={(event)=>setimnfomet({...dataFirstPage,...infomet,fonction:event.target.value})}
            //autoComplete="cc-number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField  id="expDate" label="Permis" fullWidth
           onChange={(event)=>setimnfomet({...dataFirstPage,...infomet,permis:event.target.value})}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Centre d'Affectation"
            required
            onChange={(event)=>setimnfomet({...dataFirstPage,...infomet,CentreAffectation:event.target.value})}
            //helperText="Last three digits on signature strip"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
        <KeyboardDatePicker
        style={{marginTop:'20px',marginInline:"10px"}}
        clearable
        value={selectedDate}
        placeholder="10/10/2018"
        //inputVariant="outlined"
        label="Date d'Entrée'"
        size="small"
        onChange={date => {handleDateChange(date);setimnfomet({...dataFirstPage,...infomet,dateEntry:date})}}
       
        format="MM/dd/yyyy"
      />
        </Grid>
        <Grid item xs={12} md={6}>
        <KeyboardDatePicker
        style={{marginTop:'20px',marginInline:"10px"}}
        clearable
        value={selectedDate}
        placeholder="10/10/2018"
        //inputVariant="outlined"
        label="Date de Sortie"
        size="small"
        onChange={date => {handleDateChange(date);setimnfomet({...dataFirstPage,...infomet,dateSotie:date})}}
       
        format="MM/dd/yyyy"
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
      </MuiPickersUtilsProvider>
  );
}