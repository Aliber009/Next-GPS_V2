import React, { useEffect, useState } from 'react';
import MainToolbar from './MainToolbar';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SelectField from './form/SelectField';

import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
  
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  
  /* const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];
   */
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
      },
      chips: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      chip: {
        margin: 2,
      },
      noLabel: {
        marginTop: theme.spacing(3),
      },
    container: {
      marginTop: theme.spacing(2),
    },
    details: {
        flexDirection: 'column',
      },
    buttons: {
      display: 'flex',
      justifyContent: 'space-evenly',
      '& > *': {
        flexBasis: '33%',
      },
      
    },
  }));

const Mission=()=>{
const history = useHistory();
const classes = useStyles();
const [txt1,settxt1]=useState('')
const [txt2,settxt2]=useState('')
const [names,setnames]=useState([]);

useEffect(()=>{
 fetch('api/users',{method:'GET'})
 .then(response => response.json())
 .then(data=>setnames(()=>{const l=[];data.forEach(i=>l.push(i.name));return l}));


},[])


//this is for the form select 
const theme = useTheme();
const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };

//end of select 

const [missionId,setmissionId]=useState(0)
async function handlesave(){
var id=0
const ops={
method:'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify(
 {   
"name":txt1,
"Description":txt2
 })}
 if(txt1!='' && txt2!=''){
 const res=await fetch('http://127.0.0.1:5000/missions',ops)
 const ids = await res.json()
 id = parseInt(ids.mission_id);
 
/*  .then(data => id = parseInt(data.mission_id))
  */
 }
 personName.forEach(item=> fetch('http://127.0.0.1:5000/mission_users',{
  method:'POST',
  headers: { 'Content-Type': 'application/json' },
  body:JSON.stringify({"nameUser": item, "missionID" : id })
 }).then(response=>response.json()).then(()=>history.push('/reports/missions')))
 
}



return(
<>
<MainToolbar />
<Container maxWidth='xs' className={classes.container}>
<Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              
          <Typography variant='button'>
                Ajouter une mission
              </Typography>
                 </AccordionSummary>
                 <AccordionDetails className={classes.details}>
                 <TextField
                margin="normal"
                value={txt1}
                onChange={event => settxt1(event.target.value)}
                label="Enter name of mission"
                variant="filled" />
                
                 <TextField
                margin="normal"
                value={txt2}
                onChange={event => settxt2(event.target.value)}
                label="Enter Description"
                variant="filled" />
                <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-name-label">Envoyer la mission à</InputLabel>
                <Select
                labelId="demo-mutiple-name-label"
                id="demo-mutiple-name"
                multiple
                value={personName}
                onChange={handleChange}
                input={<Input />}
                MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
                </AccordionDetails>
                </Accordion>
<FormControl fullWidth margin='normal'>
          <div className={classes.buttons}>
            <Button type='button' color='primary' variant='outlined' onClick={() => history.push('/reports/missions')}>
              Annuler
            </Button>
            <Button type='button' color='primary' variant='contained'  onClick={() => handlesave()}>
              Enregistrer
            </Button>
          </div>
        </FormControl>


</Container>
</>)
}
export default Mission