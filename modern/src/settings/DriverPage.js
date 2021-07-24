import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import t from '../common/localization';
import EditItemView from '../EditItemView';
import { Accordion, AccordionSummary, AccordionDetails, makeStyles, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditAttributesView from '../attributes/EditAttributesView';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { useEffectAsync } from '../reactHelper';


const useStyles = makeStyles((theme) => ({
  details: {
    flexDirection: 'column',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const DriverPage = () => {
  const classes = useStyles();
  const [seq, setseq] = useState([]);
  const [ref,setref] = useState('')

  const handleChange = (event) => {
    setref(event.target.value);
  };
  const [item, setItem] = useState();
  useEffectAsync(async () => {
    const response = await fetch('/api/devices');
    if (response.ok) {
      const devices= await response.json();
      setseq(()=>{var l=[]; devices.forEach(i=>l.push(i.contact));return l})
    }
  }, []);
     

  return (
    <EditItemView endpoint="drivers" item={item} setItem={setItem}>
      {item &&
        <>
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">
                {t('sharedRequired')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <TextField
                margin="normal"
                value={item.name || ''}
                onChange={event => setItem({...item, name: event.target.value})}
                label={t('sharedName')}
                variant="filled" />
              <TextField
                margin="normal"
                value={item.uniqueId || ''}
                onChange={event => setItem({...item, uniqueId: event.target.value})}
                label={"Identifiant conducteur"}
                variant="filled" />
                {/* <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">№ Sequenciel</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={ref}
          onChange={handleChange}
          label="№ Sequenciel"
        >
          {seq.map((name) => (
                  <MenuItem key={name} value={name} >
                    {name}
                  </MenuItem>
                ))}
        </Select>
      </FormControl>  */}             
            </AccordionDetails>
          </Accordion>
           <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">
                {t('sharedAttributes')}
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
              <EditAttributesView
                attributes={item.attributes}
                setAttributes={attributes => setItem({...item, attributes})}
                definitions={{}}
                />
            </AccordionDetails>
          </Accordion> 
        </>
      }
    </EditItemView>
  );
}

export default DriverPage;
