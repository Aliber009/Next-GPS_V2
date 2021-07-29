import React from 'react';
import { PieChart, Pie, Cell} from 'recharts';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { devicesActions } from '../store';
import { useEffectAsync } from '../reactHelper';

const useStyles = makeStyles(theme => ({
    dashboard: {
      background: 'white'
    },
    dashboardConnexion:{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px'
    },
    dashboardPie: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px'
    },
    connexionContainer: {
        width: '250px'
    },
    connexionRow: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px'
    },
    square: {
        background: 'red',
        minHeight: '10px',
        minWidth: '10px',
        display: 'inline-block',
        marginRight: '5px'
    }
  }));

function DashboardPie({ COLORS, mapInfo, description }) {
    const classes = useStyles();
    const [updateTimestamp, setUpdateTimestamp] = useState(Date.now());
    const dispatch = useDispatch();
    const [rows, setRows] = useState([]);
    const [constantItems,setconst] =useState([])
    let M=new Map()
    const [xx,setxx]=useState({})
    let OFFLINE = 0
    let ONLINE = 0
    const [data, setData] = useState([
        {name: 'ONLINE', value: 0},
        {name: 'OFFLINE', value: 0}
    ])
    const [loading, setLoading] = useState(true)
    let mm={}
    const drivors = async (id) => {
    
        let i=0;
        let urllist=[]
        //for(i;i< items.length;i++){
            const response = await fetch('/api/drivers?deviceId='+id)
            const json = await response.json()
            if(json!=[]){
              json.forEach(i=>{
                if(i!=undefined && i.name.substring(0,2)=="S*")
                { mm={...mm,[id]:i.name.substring(2)} }
              })   
            }
         return mm;
       } 

    useEffectAsync(async () => {
      let x={}
      let copy = []
      const response = await fetch('/api/devices');
      if (response.ok) {
        const ro=await response.json()
        dispatch(devicesActions.refresh(ro));
        setRows(ro)
        ONLINE = ro.filter (({status}) => status === 'online').length
        OFFLINE = ro.length - ONLINE
        copy = [...data]
        copy[0].value = ONLINE
        copy[1].value = OFFLINE
        setData(copy)
        setconst(ro)
        for(var i=0;i<ro.length;i++){  
            x= await drivors(ro[i].id)
        }
        setxx(x)
        }
        setLoading(false)
    }, [updateTimestamp]);
    if (loading)
        return null
    return (
        <div className={classes.dashboard}>
            <div className={classes.dashboardConnexion}>
                <div>{description}</div>
                <div style={{color: '#80c904'}}>DONNÉES ACTUELLES</div>
            </div>
            <div className={classes.dashboardPie}>
                <PieChart width={200} height={250}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                    </Pie>
                </PieChart>
                <div>
                    <ul className={classes.connexionContainer}>
                        {mapInfo.map((elem, i) => (
                            <li className={classes.connexionRow}>
                                <div><span className={classes.square} style={{background: COLORS[i]}}></span>{elem}</div>
                                <div>{data[i].value}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export function DataPieCo({ map, data, COLORS, description }){
    return (
        <DashboardPie COLORS={COLORS} mapInfo={map} description={description} data={data} />
    )
}