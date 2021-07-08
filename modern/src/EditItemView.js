import React from 'react';
import MainToolbar from './MainToolbar';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import ValidDialog from './form/validationdialog';
import t from './common/localization';
import { useEffectAsync } from './reactHelper';
import { useState, useEffect } from 'react';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(2),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    '& > *': {
      flexBasis: '33%',
    },
  },
}));

const EditItemView = ({ children, endpoint, item, setItem, opentheDial }) => {
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  const [devices,setdevices]=useState([])
 
  

//get devices
useEffectAsync(async () => {
  const response = await fetch('/api/devices');
  if (response.ok) {
    const devs= await response.json();
    setdevices(devs)
  }

}, []);


  useEffectAsync(async () => {
    
    if (id) {
      const response = await fetch(`/api/${endpoint}/${id}`);
      if (response.ok) {
        const x=await response.json()
        setItem(x) 
      }
    } else {
      setItem({});
    }
  }, [id]);

  const handleSave = async () => {
    //console.log(alpha)
    let url = `/api/${endpoint}`;
    if (id) {
      url += `/${id}`;
    }
   
    const response = await fetch(url, {
      method: !id ? 'POST' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    
     if (response.ok) {
      history.goBack();
    } 
  };
   

  
  
  return (
    <>
      <MainToolbar />
      <Container maxWidth='xs' className={classes.container}>
      
         {children}
         
        <FormControl fullWidth margin='normal'>
          <div className={classes.buttons}>
            <Button type='button' color='primary' variant='outlined' onClick={() => history.goBack()}>
              {t('sharedCancel')}
            </Button>
            <Button type='button' color='primary' variant='contained' onClick={handleSave}>
              {t('sharedSave')}
            </Button>
          </div>
          <ValidDialog open={opentheDial} close={handleSave} />
        </FormControl>
      </Container>
    </>
  );
}

export default EditItemView;
