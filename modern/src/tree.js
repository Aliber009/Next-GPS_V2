import React, {useState } from "react";
import "./App.css";
import 'antd/dist/antd.css';
import './icon-font/iconfont.css';
import './editable-tree.css';
import EditableTree from 'editable-tree-antd';
import { Button } from "@material-ui/core";
import { Divider } from "@material-ui/core";
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import { Tooltip } from "@material-ui/core";

const data=[
  {
    nodeName: "Base ONEP",
    id: "0", // unique id, required
    nameEditable: false, // is level editable (name), default true
    valueEditable: false, // is level editable (value), default true
    nodeDeletable: false, // is level deletable, default true
    nodeValue: ""
  },
];
 //{/* <Tree data={DEFAULT_NODES}/> */}
 const addtoNode=()=>{
   
     var x=""
    data.forEach(i=>{x=i.nodeValue})
    console.log(x)
   
 }

export default function Tree()  {
const [datatree,setdatatree]=useState(data)
const [n,setn]=useState()
console.log(n)
      
    return (
     <div>
       <Tooltip title={"Enregistrer apres modification"}>
        <Button  style={{position:"relative",left:"180px"}} startIcon={<SaveOutlinedIcon />} onClick={addtoNode}> Enregistrer </Button>
        </Tooltip>
        <Divider/>
      <EditableTree 
      currentNode={setn}
      data={data} // see demo data above
      maxLevel={4} // tree max level limitation, default 50
      enableYaml={false} // enable parse yaml string, default false
      lang="en_US" // default zh_CNed-tr
      onDataChange={(data)=>{setdatatree(data);console.log(data)}} // data change listener
    />
   
    </div>
    );
}


