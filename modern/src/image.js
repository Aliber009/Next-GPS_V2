import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import axios from 'axios';
import ChangeHistoryOutlinedIcon from '@material-ui/icons/ChangeHistoryOutlined';
import 'font-awesome/css/font-awesome.min.css';
import { Card,Button } from '@material-ui/core';


//import { StreetviewIcon } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));


export default function Image() {
  const [dataPos, setdataPos] = useState([])
  const [deleted, setdeleted] = useState(false)
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);
  
  const [formData,setformData] = useState(new FormData())

  const handleImageUpload = e => {
    const fd=new FormData()
    const [file] = e.target.files;
    if (file) {
      
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

  console.log(formData)
  const saveimage=async()=>{
    await fetch('/flsk/upload',{
     method:'POST',
     body:formData

    })

  }
  const classes = useStyles();

  return (
    
    <div > 
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
      <Button
            style={{marginTop:10}}
            variant="outlined"
            size="small"
            onClick={saveimage}
            component="span" >
             OK
          </Button>
    </div>
    
  );
}