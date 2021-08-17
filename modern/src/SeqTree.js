import React from 'react'
import Tree from './svognevTree/tree'
import { useState } from 'react';
import { useEffectAsync } from './reactHelper';
import { Button } from '@material-ui/core';


const SeqTree=()=>{


  const [dataStr,setdataStr]=useState([])

 /* async function fetchdatat(){
    const res= await fetch('/flsk/entites',{method:"GET"})
    if(res.ok){const respo = await res.json(); data=respo[0].arr}
    
    
    return data
  } */
  const x=()=>{
    var a=[{name:"casa"}]
    return a 
  }

return(

  <Tree stringData={setdataStr} data={x()} />
)

}
export default SeqTree


