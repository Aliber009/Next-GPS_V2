import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useEffectAsync } from './reactHelper';
import { useState } from 'react';




export default function CheckboxSelectionGrid(props) {
    const [items,setItems] =useState([])
    const [selectionModel, setSelectionModel] = useState([]);

    useEffectAsync(async () => {
        const response = await fetch('/api/drivers');
        if (response.ok) {
          const res =  await response.json()
          setItems(()=>{
              var rowsItems=[];
              res.forEach(i=> { if(i.name.substring(0,2)=="S*"){rowsItems.push({id:i.id,col1:i.name.substring(2)})}});
              return rowsItems
               }
             );    
            } 
      }, []);
  
//check GridRowsProp
  
  
  const columns = [
    { field: 'col1', headerName: 'Liste des clés sequentielles', editable: true,width: 350 },
    
  ];
  //console.log (selectionModel)
  const idtoname=(selec)=>{
    var list=[]
    items.forEach(i=>{
      if(selec.includes(i.id)){list.push({uniqueId:i.id,name:i.col1})}
    })
    return list
  }
  

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        
        rows={items}
        columns={columns}
        pageSize={3}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={(newSelection) => {
          setSelectionModel(newSelection.selectionModel);
          props.model(idtoname(newSelection.selectionModel))
        }}
        selectionModel={selectionModel}
      />
    </div>
  );
}