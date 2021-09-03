import * as React from 'react';
import { DataGrid} from '@material-ui/data-grid';
import { useEffectAsync } from './reactHelper';
import { useState ,useEffect} from 'react';

export default function CheckboxSelectionGrid(props) {

const [items,setItems] =useState([])
const [nodes,setNodes] =useState([])
const [listSeq,setListSeq] =useState([])
const [listData,setListData] =useState([])
const [selectionModel, setSelectionModel] = React.useState([]);

      useEffectAsync(async () => {
        loadState()
        getDrivers()
      }, []);
      
  useEffect(()=>{
    var DataList = [...items]
    listSeq.map(seq => {
      DataList = DataList.filter(item => item.col1 != seq);
    })
    setListData(DataList)
  },[listSeq,items])
  
  const columns  = [
    { field: 'col1', headerName: 'Liste des clés sequentielles', editable: true,width: 350 },
  ];
  
  const idtoname=(selec)=>{
    var list=[]
    items.forEach(i=>{
      if(selec.includes(i.id)){list.push({uniqueId:i.id,name:i.col1})}
    })
    return list
  }

  async function  loadState() {
    const response = await fetch('/flsk/entites');
    if (response.ok) {
      const res =  await response.json()
      if( res.length === 0 ){setNodes(initializedСopy(res));}
      else if( res.length > 0) {setNodes(initializedСopy(res[0].arr));}     
    }
  }

  async function  getDrivers() {
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
  }

  const initializedСopy = (nodes, location) => {
    const nodesCopy = [];
    for (let i = 0; i < nodes.length; i++) {
        const { children, name,seqAttribut } = nodes[i];
        const hasChildren = children !== undefined;
        const id = location ? `${location}.${i + 1}` : `${i + 1}`;
        if(seqAttribut == true){
            nodesCopy[i] = { 
                children: hasChildren ? initializedСopy(children, id) : undefined,
                id:id,
                name,
                seqAttribut : seqAttribut
            };
            setListSeq(listSeq => [...listSeq,name])
            //setLoading((loading) => !loading)
        }else if(seqAttribut == undefined){
            nodesCopy[i] = { 
                children: hasChildren ? initializedСopy(children, id) : undefined,
                id:id,
                name,
            };
        }
        
    }
    return nodesCopy;
  }


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
      
        rows={listData}
        columns={columns}
        pageSize={3}
        checkboxSelection
        disableSelectionOnClick
        
        onSelectionModelChange={(newSelection) => {
          console.log(newSelection)

          setSelectionModel(newSelection);
          props.model(idtoname(newSelection))
        }}
        selectionModel={selectionModel}
      />
    </div>
  );
      }