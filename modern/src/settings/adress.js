import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react'
import { KeyboardDatePicker,MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useParams } from 'react-router';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core';
import { Button } from '@material-ui/core';


const useStyles = makeStyles(theme => ({

  logo: {
    maxWidth:160,minHeight:170
  },

})
)

export default function AddressForm({persoData}) {
  const {id} = useParams()
  const [selectedDate, handleDateChange] = useState(new Date());
  const [item,setItem]=useState({})
  persoData(item);
  const classes = useStyles();
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = e => {
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const {current} = uploadedImage;
      current.file = file;
      reader.onload = (e) => {
          current.src = e.target.result;
      }
      reader.readAsDataURL(file);
    }
  };



  return (
     <MuiPickersUtilsProvider utils={DateFnsUtils} >
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
      <img className={classes.logo} ref={uploadedImage} src='/blank.jpg' alt='driver' />
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
            onChange={(event)=>setItem({...item,driverId:id,name:event.target.value})}
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
            onChange={(event)=>setItem({...item,lastname:event.target.value})}
            fullWidth
            autoComplete="family-name"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label="Addresse "
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
            onChange={(event)=>setItem({...item,ville:event.target.value})}
            fullWidth
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField id="state" name="state" label="Pays" fullWidth onChange={(event)=>setItem({...item,pays:event.target.value})} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Phone"
            onChange={(event)=>setItem({...item,phone:event.target.value})}
            fullWidth
            autoComplete="shipping postal-code"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Etat"
            onChange={(event)=>setItem({...item,etat:event.target.value})}
            fullWidth
            autoComplete="shipping country"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <KeyboardDatePicker
        style={{marginTop:'20px',marginInline:"10px"}}
        clearable
        value={selectedDate}
        placeholder="10/10/2018"
        //inputVariant="outlined"
        label="Date de naissance"
        size="small"
        onChange={date => {handleDateChange(date);setItem({...item,DateNaissance:date}) }}
       
        format="MM/dd/yyyy"
      />
        </Grid>
        {/* <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid> */}
      </Grid>
      </MuiPickersUtilsProvider>
  );
}