import React, { useState ,useEffect,useRef} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Paper } from '@material-ui/core';
import { GridRowsProp, GridColDef } from '@material-ui/data-grid';
import { devicesActions,driversActions } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffectAsync } from '../reactHelper';

function SpeedExcess() {
   const columns = [{
        headerName: 'Numéro séquentiel',
        field: 'sequentielNumber',
        type: 'number',
        flex: 1,
        headerAlign: 'left',
      }, {
        headerName: 'Matricule véhicule',
        field: 'matricule',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Affectation entité chaque niveau par colonne',
        field: 'colonne',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Vitesse du tronçon',
        field: 'speedSection',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Vitesse du véhicule',
        field: 'VehiculeSpeed',
        type: 'string',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Chauffeur en cas d\'existance',
        field: 'driver',
        type: 'string',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Différence',
        field: 'difference',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Niveau d\'infraction (selon le code de la route)',
        field: 'violationLevel',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      } ,{
        headerName: 'Position',
        field: 'position',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      } ]

   
      const [items, setItems] = useState([]);
    return (
        <div style={{ height: 300, width: '100%' }}>
                <DataGrid
                rows={items} 
                columns={columns} 
                hideFooter 
                autoHeight />
            
        </div>
    )
}

function GpsBox() {
    const columns = [{
        headerName: 'Nombre de boitiers connectés',
        field: 'BoxNumbers',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Nombre de boitiers avec coupure d\'alimentation ',
        field: 'BoxCutNumbers',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Nombre de numéros séquentiels sans boitier GPS connecté',
        field: 'SequentielNumberNoBox',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Nombre de boitiers GPS connectés sans numéro séquentiel',
        field: 'NoSequentielNumberBox',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }]

      const [items, setItems] = useState([]);

    return (
        <div style={{ height: 300, width: '100%' }}>
            
                <DataGrid
                rows={items} 
                columns={columns} 
                hideFooter 
                autoHeight />
           
        </div>
    )
}

function Activity() {
    const columns = [{
        headerName: 'Numéro séquentiel',
        field: 'SequentielNumber',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Matricule véhicule',
        field: 'registrationNumber',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Affectation entité chaque niveau par colonne ',
        field: 'AffectedEntity',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Nombre d\'heures de fonctionnement en weekend',
        field: 'WorkHoursPerWeek',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Distance parcourue en weekend',
        field: 'DistanceMade',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }]

      const [items, setItems] = useState([]);

    return (
        <div style={{ height: 300, width: '100%' }}>
            
                <DataGrid
                rows={items} 
                columns={columns} 
                hideFooter 
                autoHeight />
         
        </div>
    )
}

function Geofence({listAllFilters}) {

  const dispatch = useDispatch();

  const columns = [{
        headerName: 'Numéro séquentiel',
        field: 'sequentielNumber',
        type: 'string',
        flex: 1,
        headerAlign: 'left',
      }, {
        headerName: 'Matricule véhicule',
        field: 'registrationNumber',
        type: 'string',
        flex: 1,
        headerAlign: 'left',
      }, {
        headerName: 'Affectation',
        field: 'affectedEntity',
        type: 'string',
        flex: 1,
        headerAlign: 'left',
      }, {
        headerName: 'Zone',
        field: 'zone',
        type: 'string',
        flex: 1,
        headerAlign: 'left',
      }, {
        headerName: 'Chauffeur en cas d\'existance',
        field: 'driverName',
        type: 'string',
        flex: 1,
        headerAlign: 'left',
      }]

      const [itemsGeofence, setItemsGeofence] = useState([]);
      const [nodes, setNodes] = useState([]);
      const [seqID,setSeqID] = useState([]);

      const setOfDevices = useSelector((state) => state.devices);
      const setOfDrivers = useSelector((state) => state.drivers);
      const itemsGeofenceRef = useRef([])
      const seqIDRef = useRef([])
      const nodesRef = useRef([])
      
      const drivors = async (id,matricule) => {
        var mm=[]
        const response = await fetch('/api/drivers?deviceId='+id)
        const response1 = await fetch('/api/geofences?deviceId='+id)
        const json = await response.json()
        const json1 = await response1.json()
        console.log(json1)
        if(json!=[]){
          var driverName = "";var driverUniqueId="";
          var SequentielNumber = ""; var numeroSequetielUniqueId = ""; 
          json.forEach(i=>{
            if(i!=undefined && i.name.substring(0,2)=="S*"){ 
              SequentielNumber = i.name.substring(2)
              numeroSequetielUniqueId = i.uniqueId 
            }else if(i!=undefined && i.name.substring(0,2)!="S*"){
              driverName = i.name
              driverUniqueId = i.uniqueId 
            }
          })
          if(SequentielNumber !== ""){
            mm.push({
              id: numeroSequetielUniqueId,
              sequentielNumber : SequentielNumber,
              numeroSequetielUniqueId : numeroSequetielUniqueId,
              driverName : driverName,
              driverUniqueId : driverUniqueId,
              registrationNumber:matricule,
              affectedEntity:"",
              zone: json1.length>0  ? json1[0].name : ""
            })  
          }  
        }
        return mm;
      } 


      const getAffectations = async () => {
        const response = await fetch('/flsk/entites');
        if (response.ok) {
          const res =  await response.json()
          if( res.length === 0 ){setNodes(initializedСopy(res));}
          else if( res.length > 0) {setNodes(initializedСopy(res[0].arr));}     
        }
        await resolveAfterMiliSeconds(500);
        getAffectationString()
        await resolveAfterMiliSeconds(100);
        setItemsGeofence(itemsGeofenceRef.current)
      } 

      function resolveAfterMiliSeconds(x) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(x);
          }, x);
        });
      }


      const getAffectationString =  () => {
        if(seqIDRef.current.length>0) {
          seqIDRef.current.forEach(seq => {
            const ids = seq.id.split(".").map((str) => parseInt(str))
            let changingNode = nodesRef.current[ids[0] - 1];
            var listSeq = []
            if (ids.length > 1) {
              for (let i = 1; i < ids.length; i++) {
                listSeq.push(changingNode.name)
                changingNode = changingNode.children[ids[i] - 1];
              }
            }
            const result = itemsGeofenceRef.current.filter(item => item.sequentielNumber == seq.name);
            if(result.length>0){
              console.log(itemsGeofenceRef.current)
              const index = itemsGeofenceRef.current.findIndex(element => result[0]==element)
              itemsGeofenceRef.current[index].affectedEntity = listSeq.join(' / ')
            }
          })
        }
      }

      const initializedСopy = (myNodes, location) => {
        const nodesCopy = [];
        for (let i = 0; i < myNodes.length; i++) {
            const { children, name,seqAttribut } = myNodes[i];
            const hasChildren = children !== undefined;
            const id = location ? `${location}.${i + 1}` : `${i + 1}`;
            if(seqAttribut == true){
                nodesCopy[i] = { 
                    children: hasChildren ? initializedСopy(children, id) : undefined,
                    id:id,
                    name,
                    seqAttribut : seqAttribut
                };
                setSeqID(prev => {let data = [...prev,{name : myNodes[0].name,id:id}];seqIDRef.current =data;return data} )
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

      useEffect(()=>{
        nodesRef.current = nodes
      },[nodes])

      useEffect(()=>{
        async function UpdateData() {
          setItemsGeofence(itemsGeofenceRef.current)
          await resolveAfterMiliSeconds(200);
          console.log(listAllFilters)
          if(itemsGeofence.length>0){
            var newData = []
            itemsGeofence.map((item,index)=> {
              if(listAllFilters[0].seqNumber == item.sequentielNumber){
                newData.push(item)
              }
            })
            setItemsGeofence(newData)
          }
        }
        UpdateData()
      },[listAllFilters])
      

      useEffectAsync(async () => {
        getAffectations()
        var listData = []
        setItemsGeofence([])
        
        const data = await Object.entries(setOfDevices.items).map((device) => {
          drivors(device[1].id,device[1].contact).then((res) => {
            if(res.length>0){
              listData.push(res[0])          
              let data = [...listData]
              itemsGeofenceRef.current = data
            }
          }) 
        })
      }, [setOfDevices,setOfDrivers]);
 
      
    return (
        <div style={{ height: 300, width: '100%' }}>
            
                <DataGrid
                rows={itemsGeofence} 
                columns={columns} 
                hideFooter 
                autoHeight 
               />
           
        </div>
    )
}

function FuelConsumption() {
    const columns = [{
        headerName: 'Numéro séquentiel',
        field: 'SequentielNumber',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Matricule véhicule',
        field: 'registrationNumber',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Affectation entité chaque niveau par colonne',
        field: 'AffectedEntity',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Date approvisionnement en carburant',
        field: 'Zone',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Heure/Minute/Seconde Approvisionnement en carburant',
        field: 'supplyHour',
        type: 'string',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Lieu d\'approvisionnement ( Adresse)',
        field: 'supplyLocation',
        type: 'string',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Niveau de carburant initial',
        field: 'initialFuelLevel',
        type: 'string',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Niveau de carburant final',
        field: 'FinalFuelLevel',
        type: 'string',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Quantité carburant remplie',
        field: 'fuelQuantitySupplied',
        type: 'string',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Quantité carburant remplie selon fichier opérateurs pétroliers',
        field: 'OpFuelQuantitySupplied',
        type: 'string',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Différence',
        field: 'difference',
        type: 'string',
        flex: 1,
        headerAlign: 'right',
      }]

      const [items, setItems] = useState([]);

    return (
        <div style={{ height: 300, width: '100%' }}>
            
                <DataGrid
                rows={items} 
                columns={columns} 
                hideFooter 
                autoHeight />
         
        </div>
    )
}

function Miles() {
    const columns = [{
        headerName: 'Numéro séquentiel',
        field: 'SequentielNumber',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Matricule véhicule',
        field: 'registrationNumber',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Affectation entité chaque niveau par colonne',
        field: 'AffectedEntity',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Index kilométrique 1',
        field: 'index1',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Index kilométrique 2',
        field: 'index2',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }]

      const [items, setItems] = useState([]);

    return (
        <div style={{ height: 300, width: '100%' }}>
          
                <DataGrid
                rows={items} 
                columns={columns} 
                hideFooter 
                autoHeight />
        
        </div>
    )
}

function DriverBehavior() {
    const columns = [{
        headerName: 'Comportement conduteur',
        field: 'SequentielNumber',
        type: 'string',
        flex: 1,
        headerAlign: 'center',
      }]

      const [items, setItems] = useState([]);

    return (
        <div style={{ height: 300, width: '100%' }}>
          
                <DataGrid
                rows={items} 
                columns={columns} 
                hideFooter 
                autoHeight />
           
        </div>
    )
}

function ReportToPrint({ report ,listAllFilters }){
  console.log(report)
    switch (report){
        case 'vitesse':
            return  <SpeedExcess listAllFilters = {listAllFilters}/>
        case 'gps':
            return  <GpsBox listAllFilters = {listAllFilters}/>
        case 'activity':
            return <Activity listAllFilters = {listAllFilters}/>
        case 'geofence':
            return <Geofence listAllFilters = {listAllFilters}/>
        case 'carburant':
            return <FuelConsumption listAllFilters = {listAllFilters} />
        case 'kilometrage':
            return <Miles listAllFilters = {listAllFilters}/>
        case 'conducteur':
            return <DriverBehavior listAllFilters = {listAllFilters}/>
        default:
            return null
    }

}

export default ReportToPrint
