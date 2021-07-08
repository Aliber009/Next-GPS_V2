import React, {useState } from "react";
import "./App.css";
import 'antd/dist/antd.css';
import './icon-font/iconfont.css';
import './editable-tree.css';
import EditableTree from 'editable-tree-antd';


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

export default function Tree()  {
const [datatree,setdatatree]=useState(data)
      
    return (
     <div>
      <EditableTree 
      data={data} // see demo data above
      maxLevel={4} // tree max level limitation, default 50
      enableYaml={false} // enable parse yaml string, default false
      lang="en_US" // default zh_CNed-tr
      onDataChange={(data)=>{setdatatree(data);console.log(data[0].nodeName)}}// data change listener
      
    />
    </div>
    );
  
}


