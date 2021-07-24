import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffectAsync } from '../reactHelper';
import { useSelector } from 'react-redux';
import DuplicateDialog from './DuplicateDialogue';


const LinkField = ({
  margin,
  variant,
  label,
  endpointAll,
  endpointLinked,
  baseId,
  keyBase,
  keyLink,
  opendialogue,
 
  keyGetter = item => item.id,
  titleGetter = item => item.name,
  
}) => {
  const [items, setItems] = useState();
  const [linked, setLinked] = useState();
  const [drivers,setdrivers] =useState()
  const [opendial,setopendial] = useState(false)
  const [opendupDial,setopendupDial] =useState(false)
  const itemDevice = useSelector(state => Object.values(state.devices.items).filter(i=>i.id==baseId));
  //console.log(itemDevice[0].name)
  
  useEffectAsync(async () => {
    const response = await fetch(endpointAll);
    if (response.ok) {
      const res=await response.json()
      setItems(res);
     
    }
  }, []);

  useEffectAsync(async () => {
    
    const response = await fetch(endpointLinked);
    if (response.ok) {
      const data = await response.json();
     
      setLinked(data.map(it => it.id));
    }
  }, []);

  const createBody = linkId => {
    const body = {};
    body[keyBase] = baseId;
    body[keyLink] = linkId;
    return body;
  }
  //get drivers 
  useEffectAsync(async () => {
    const response = await fetch('api/drivers');
    if (response.ok) {
      const data = await response.json();
      setdrivers(data);
    }
  }, []);
  
  const findDriver = (idD)=>{
    //var driver={};
      for(var i=0;i<drivers.length;i++) {
           if(drivers[i].id==idD){
             return drivers[i]
          }
       } 
    }
  
  //end of getterDriver

  //check duplications
const checks=(name)=>{
  for(var i=0;i<drivers.length;i++){
    if(drivers[i].attributes.creations.carId==name){return false}
    else{return true}
  }
}


  //end of checks

  
    
  

  const onChange = async event => {
    const oldValue = linked;
    const newValue = event.target.value;
    

    
    for (const added of newValue.filter(it => !oldValue.includes(it))) {
      
       var driver=findDriver(createBody(added).driverId)
      if(driver.attributes.creations ){
        if(driver.attributes.destructions && driver.attributes.creations.length == driver.attributes.destructions.length ){
        //create permissions
        await fetch('/api/permissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(createBody(added)),
        })
       //end of permissions  
        
        await fetch('/api/drivers/'+createBody(added).driverId,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            ...driver,attributes:{...driver.attributes, creations:[...driver.attributes.creations || [], { carId: itemDevice[0].name, created:new Date().toLocaleDateString("fr-FR") }  ] }
          })
      })
      {opendialogue()}

        }else{console.log("nooo"); setopendupDial(true) }
      }else
      {
         //create permissions
         await fetch('/api/permissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(createBody(added)),
        })
       //end of permissions  
        await fetch('/api/drivers/'+createBody(added).driverId,{
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            {
              ...driver,attributes:{...driver.attributes, creations:[...driver.attributes.creations || [], { carId: itemDevice[0].name, created:new Date().toLocaleDateString("fr-FR") }  ] }
            })
        })
        {opendialogue()}
      }
    }
    for (const removed of oldValue.filter(it => !newValue.includes(it))) {
      await fetch('/api/permissions', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createBody(removed)),
      });
       var driver=findDriver(createBody(removed).driverId)
       
        await fetch('/api/drivers/'+createBody(removed).driverId,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            ...driver,attributes:{...driver.attributes, destructions:[...driver.attributes.destructions || [],{ carId: itemDevice[0].name, removed:new Date().toLocaleDateString("fr-FR",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"}) } ] }
          })
      })

      await fetch('http://localhost:5000/lastdetach',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            Seqname:driver.name.substring(2),CarId:itemDevice[0].id,driverId:createBody(removed).driverId
           // ...driver,attributes:{...driver.attributes, destructions:[...driver.attributes.destructions || [],{ carId: itemDevice[0].name, removed:new Date().toLocaleDateString("fr-FR",{year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"}) } ] }
          })
      })
   
      
      
      {opendialogue()}
        
    }
    //setLinked(newValue);
  };


  //oneChange two
  const onChangetwo = async event => {
    const oldValue = linked;
    const newValue = event.target.value;
    for (const added of newValue.filter(it => !oldValue.includes(it))) {
      await fetch('/api/permissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createBody(added)),
      });

      await fetch('http://localhost:5000/histoconductor',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            driverId:createBody(added).driverId,added:true,removed:false,Date:new Date().toLocaleDateString,CarId:itemDevice[0].name
          })
      })
       
      
    }
    for (const removed of oldValue.filter(it => !newValue.includes(it))) {
      await fetch('/api/permissions', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createBody(removed)),
      });

      await fetch('http://localhost:5000/histoconductor',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            driverId:createBody(removed).driverId,added:false,removed:true,Date:new Date().toLocaleDateString,CarId:itemDevice[0].name
          })
      })
      
    }
    setLinked(newValue);
  };
  
  //end

  if (items && linked) {
    return (
      <FormControl margin={margin} variant={variant}>
        { label=="Numéro de Séquence" && 
        <>
        <InputLabel>{label}</InputLabel>
        <Select
          multiple
          value={linked}
          onChange={onChange}>
          {items.map(item => 
            {if( titleGetter(item).substring(0,2)=="S*"){ return (
            <MenuItem key={keyGetter(item)} value={keyGetter(item)}>{titleGetter(item).substring(2,titleGetter(item).length)}</MenuItem>
                )}
              }
            )} 
        </Select>
        <DuplicateDialog open={opendupDial} close={()=>setopendupDial(false)}/>
        
        </>
      }
      { label!="Numéro de Séquence" && 
        <>
        <InputLabel>{label}</InputLabel>
        <Select
          multiple
          value={linked}
          onChange={onChangetwo}>
          {items.map(item => 
          { if(titleGetter(item).substring(0,2)!="S*"){ return (
            <MenuItem key={keyGetter(item)} value={keyGetter(item)}>{titleGetter(item)}</MenuItem>)
          }
        }
          )}
        </Select>
        </>
      }
      </FormControl>
    );
  } else {
    return null;
  }
}

export default LinkField;
