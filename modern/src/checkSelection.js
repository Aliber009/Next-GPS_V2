import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import { useEffectAsync } from './reactHelper';
import { useState } from 'react';

export default function CheckboxSelectionGrid() {
    const [items,setItems] =useState([])
    const [selectionModel, setSelectionModel] = React.useState([]);

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
  const rows: GridRowsProp = items
  
  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'Liste des clés sequentielles', width: 350 },
    
  ];
  

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid checkboxSelection 
       onSelectionModelChange={(newSelection) => {console.log(newSelection.selectionModel)
        setSelectionModel(newSelection.selectionModel);
      }}
      selectionModel={selectionModel}
      rows={rows} columns={columns} />
    </div>
  );
}