import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import t from '../common/localization';
import EditItemView from '../EditItemView';
import { Accordion, AccordionSummary, AccordionDetails, makeStyles, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditAttributesView from '../attributes/EditAttributesView';
import { useEffectAsync } from '../reactHelper';
import { useParams } from 'react-router';


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

const Seq = () => {
  const classes = useStyles();
  const [seq, setseq] = useState([]);
  const [ref,setref] = useState('')
  const {id} =useParams()
  const [driver,setdriver] =useState({})
  
  const handleChange = (event) => {
    setref(event.target.value);
  };
  const [item, setItem] = useState({name:"",driverId:"",attributes:{}});
  var m={...item,name:'S*'+item.name}


  
  const changeContact=async(driverId)=>{
    var device={}
    const respo=await fetch('/api/devices?driverId='+driverId)
    if(respo.ok)
    {
      const res=await respo.json()
      device=res[0]
    }

  }
  return (
    <>
    <EditItemView endpoint="drivers" item={m} setItem={setItem}  >
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
                //value={item.name || ''}
                onChange={event => { setItem({...item, name:event.target.value}) ; changeContact(item.id) }}
                label={"№ Sequentiel"}
                variant="filled" />
              <TextField
                margin="normal"
                value={item.uniqueId || ''}
                onChange={event => setItem({...item, uniqueId: event.target.value})}
                label={"Code"}
                variant="filled" />
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
    
    </>
  );
}

export default Seq;
