import React, { useEffect, useState } from 'react';
import MainToolbar from './MainToolbar';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';


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

const names = [
  'Carburant',
  'Réparation ',
  'Visite technique',
  'Parking',
  'Assurance',
  'Impot',
  'Frais autoroute',
  'Maintenance',
  'Infraction routiere'
];
const { REACT_APP_FLASK } = process.env

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

const Cost = () => {
  const history = useHistory();
  const location = useLocation()
  const classes = useStyles();

  const [somme, setsomme] = useState(0)
  const [type, setype] = useState("")




  //this is for the form select 
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const url = history.location.pathname;
  const idList = url.split('/')
  const id = idList[idList.length - 1]


  const handleChange = (event) => {
    setype(event.target.value)
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
  function saveCost() {
    const ops = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          "type": type,
          "DeviceID": id,
          "Somme": somme
        })
    }
    fetch(REACT_APP_FLASK + '/costs', ops)
      .then(response => response.json())

  }




  return (
    <>
      <MainToolbar />
      <Container maxWidth='xs' className={classes.container}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>

            <Typography variant='button'>
              Ajouter une Facture
            </Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.details}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-mutiple-name-label">Entrer type de Facture</InputLabel>
              <Select
                labelId="demo-mutiple-name-label"
                id="demo-mutiple-name"

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


            <TextField
              margin="normal"
              value={somme}
              onChange={event => setsomme(event.target.value)}
              label="Enter Somme Facture"
              variant="filled" />

          </AccordionDetails>
        </Accordion>
        <FormControl fullWidth margin='normal'>
          <div className={classes.buttons}>
            <Button type='button' color='primary' variant='outlined' onClick={() => history.push('/')}>
              Annuler
            </Button>
            <Button type='button' color='primary' variant='contained' onClick={() => { if (type.length > 2 && somme != 0) { saveCost(); history.goBack() } }}>
              Enregistrer
            </Button>
          </div>
        </FormControl>


      </Container>
    </>)
}
export default Cost