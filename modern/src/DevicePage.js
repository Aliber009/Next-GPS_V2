import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useRef } from 'react';
import t from './common/localization';
import EditItemView from './EditItemView';
import { Accordion, AccordionSummary, AccordionDetails, makeStyles, Typography, FormControlLabel, Checkbox } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditAttributesView from './attributes/EditAttributesView';
import deviceAttributes from './attributes/deviceAttributes';
import SelectField from './form/SelectField';
import { deviceCategories } from './common/deviceCategories';
import LinkField from './form/LinkField';
import { prefixString } from './common/stringUtils';
import { Card, Button  } from '@material-ui/core';
import { KeyboardDatePicker,MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


const useStyles = makeStyles(() => ({
  details: {
    flexDirection: 'column',
  },
}));

const DevicePage = () => {
  const classes = useStyles();
  const [item, setItem] = useState();
  const [openthedial,setopenthedial] =useState(false)
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);
  const [selectedDate, handleDateChange] = useState(new Date());


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

    <EditItemView endpoint="devices" item={item} setItem={setItem} opentheDial={openthedial}   >
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
                onChange={(event) => setItem({...item, name: event.target.value})}
                label={t('sharedName')}
                variant="filled" />
              <TextField
                margin="normal"
                value={item.uniqueId || ''}
                onChange={event => setItem({...item, uniqueId: event.target.value})}
                label={t('deviceIdentifier')}
                variant="filled" />
                 
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle1">
                Fiche vehicule
              </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.details}>
            <div style={{marginTop:20,marginBottom:40, maxWidth:160,maxHeight:170}}>
            <label htmlFor="pic-upload"  >
             <input 
            id="pic-upload"
            name="pic-upload"
            type="file" accept="image/*" onChange={handleImageUpload}
            ref={imageUploader} style={{ display: 'none' }}
             />
             <Card style={{maxWidth:160,maxHeight:170}}>
             <img style={{marginTop:20,maxWidth:160,maxHeight:170}} ref={uploadedImage} src='/blankcar.jpg' alt='driver' />
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
              <SelectField
                margin="normal"
                value={item.groupId || 0}
                onChange={event => setItem({...item, groupId: Number(event.target.value)})}
                endpoint="/api/groups"
                label={t('groupParent')}
                variant="filled" />
                       <TextField
                margin="normal"
                value={item.contact || ''}
                onChange={event => setItem({...item, contact: event.target.value})}
                label={"Immatriculation"}
                variant="filled" />
              <TextField
                margin="normal"
                value={item.phone || ''}
                onChange={event => setItem({...item, phone: event.target.value})}
                label={"Marque"}
                variant="filled" />
              <TextField
                margin="normal"
                value={item.model || ''}
                onChange={event => setItem({...item, model: event.target.value})}
                label={"Modéle"}
                variant="filled" />
                <TextField
                margin="normal"
                value={item.model || ''}
                onChange={event => setItem({...item, model: event.target.value})}
                label={"Pays"}
                variant="filled" />
                 <TextField
                margin="normal"
                value={item.model || ''}
                onChange={event => setItem({...item, model: event.target.value})}
                label={"Energie"}
                variant="filled" />
                <KeyboardDatePicker
        style={{marginTop:'20px',marginInline:"10px"}}
        clearable
        value={selectedDate}
        placeholder="10/10/2018"
        //inputVariant="outlined"
        label="Date d'Entrée'"
        size="small"
        onChange={date => {handleDateChange(date)}}
       
        format="MM/dd/yyyy"
      />
       
        <KeyboardDatePicker
        style={{marginTop:'20px',marginInline:"10px"}}
        clearable
        value={selectedDate}
        placeholder="10/10/2018"
        //inputVariant="outlined"
        label="Date de Sortie"
        size="small"
        onChange={date => {handleDateChange(date)}}
       
        format="MM/dd/yyyy"
      />
               
           
              <SelectField
                margin="normal"
                value={item.category || 'default'}
                emptyValue={null}
                onChange={event => setItem({...item, category: event.target.value})}
                data={deviceCategories.map(category => ({
                  id: category,
                  name: t(`category${category.replace(/^\w/, c => c.toUpperCase())}`)
                }))}
                label={t('deviceCategory')}
                variant="filled" />
              <FormControlLabel
                control={<Checkbox checked={item.disabled} onChange={event => setItem({...item, disabled: event.target.checked})} />}
                label={t('sharedDisabled')} />
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
                definitions={deviceAttributes}
                />
            </AccordionDetails>
          </Accordion>
          {item.id &&
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subtitle1">
                  {t('sharedConnections')}
                </Typography>
              </AccordionSummary>
              <AccordionDetails className={classes.details}>
                <LinkField
                  margin="normal"
                  endpointAll="/api/geofences"
                  endpointLinked={"/api/geofences?deviceId=" + item.id}
                  baseId={item.id}
                  keyBase="deviceId"
                  keyLink="geofenceId"
                  label={t('sharedGeofences')}
                  variant="filled" />
                <LinkField
                  margin="normal"
                  endpointAll="/api/notifications"
                  endpointLinked={"/api/notifications?deviceId=" + item.id}
                  baseId={item.id}
                  keyBase="deviceId"
                  keyLink="notificationId"
                  titleGetter={it => t(prefixString('event', it.type))}
                  label={t('sharedNotifications')}
                  variant="filled" />
                <LinkField
                  margin="normal"
                  endpointAll="/api/drivers"
                  endpointLinked={"/api/drivers?deviceId=" + item.id}
                  baseId={item.id}
                  keyBase="deviceId"
                  keyLink="driverId"
                  label={t('sharedDrivers')}
                  
                  variant="filled" />
                  <LinkField
                  margin="normal"
                  endpointAll="/api/drivers"
                  endpointLinked={"/api/drivers?deviceId=" + item.id}
                  baseId={item.id}
                  keyBase="deviceId"
                  keyLink="driverId"
                  label={"Numéro de Séquence"}
                  opendialogue={()=>setopenthedial(true)}
                 
                  //save={data}
                  variant="filled" />
                <LinkField
                  margin="normal"
                  endpointAll="/api/attributes/computed"
                  endpointLinked={"/api/attributes/computed?deviceId=" + item.id}
                  baseId={item.id}
                  keyBase="deviceId"
                  keyLink="attributeId"
                  titleGetter={it => it.description}
                  label={t('sharedComputedAttributes')}
                  variant="filled" />
                <LinkField
                  margin="normal"
                  endpointAll="/api/maintenance"
                  endpointLinked={"/api/maintenance?deviceId=" + item.id}
                  baseId={item.id}
                  keyBase="deviceId"
                  keyLink="maintenanceId"
                  label={t('sharedMaintenance')}
                  variant="filled" />                                                       
              </AccordionDetails>
            </Accordion>
          }
        </>
      }
    </EditItemView>
    </MuiPickersUtilsProvider>

  );
}

export default DevicePage;
