import { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout'
import { DataPieCo } from './DashboardPie'
import { Grid, makeStyles, TextField } from '@material-ui/core';
import DashboardBar from './DashboardBar';
import { devicesActions } from '../store';
import React from 'react';
import { useEffectAsync } from '../reactHelper';
import { FormControl, InputLabel, Select, MenuItem, Button, ButtonGroup } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import t from '../common/localization';
import Infraction from './Infraction';

const useStyle = makeStyles({
  Padding:{
    padding: "15px",
    marginBottom: '20px'
  },
  Margin:{
    margin: "15px",
  },
  backButton: {
    padding: '15px',
    display: 'flex',
    fontSize: '18px',
    '&:hover':{
      textDecoration: 'underline'
    }
  },
  Child:{
    marginLeft: '15px',
  }
})

const ReportPrintFilter = ({ setShowData, 
  setRowsDrivers, 
  setData, 
  setNbGeofence, 
  setNbSpeed, 
  setLoading, 
  from, 
  to,
  setConst,
  data,
  setRows,
  setFrom,
  setTo }) => {
  const classes = useStyle()
  const [choice, setChoice] = useState('')
  const [updateTimestamp, setUpdateTimeStamp] = useState(Date.now())
  const [period, setPeriod] = useState('today');
  const [seq, setSeq] = useState([])
  const dispatch = useDispatch();
  let OFFLINE = 0
  let ONLINE = 0

  const handleClick = async (e) => {
    e.preventDefault()
    let selectedFrom;
    let selectedTo;
    let x={}
    let copy = []
    const response = await fetch('/api/devices');

    switch (period) {
      case 'today':
        selectedFrom = moment().startOf('day');
        selectedTo = moment().endOf('day');
        break;
      case 'yesterday':
        selectedFrom = moment().subtract(1, 'day').startOf('day');
        selectedTo = moment().subtract(1, 'day').endOf('day');
        break;
      case 'thisWeek':
        selectedFrom = moment().startOf('week');
        selectedTo = moment().endOf('week');
        break;
      case 'previousWeek':
        selectedFrom = moment().subtract(1, 'week').startOf('week');
        selectedTo = moment().subtract(1, 'week').endOf('week');
        break;
      case 'thisMonth':
        selectedFrom = moment().startOf('month');
        selectedTo = moment().endOf('month');
        break;
      case 'previousMonth':
        selectedFrom = moment().subtract(1, 'month').startOf('month');
        selectedTo = moment().subtract(1, 'month').endOf('month');
        break;
      default:
        selectedFrom = from;
        selectedTo = to;
        break;
    }

    if (response.ok) {
      const ro=await response.json()
      dispatch(devicesActions.refresh(ro));
      setRows(ro)
      ONLINE = ro.filter(({status}) => status === 'online').length
      OFFLINE = ro.length - ONLINE
      copy = [...data]
      copy[0].value = ONLINE
      copy[1].value = OFFLINE
      setData(copy)
      setConst(ro)
      ro.forEach(async (elem, id) => {
        const responseDriver = await fetch(`/api/reports/summary?deviceId=${elem.id}&from=${selectedFrom.toISOString()}&to=${selectedTo.toISOString()}&daily=false&mail=false`)
        const responseSpeedLimit = await fetch(`/api/reports/events?deviceId=${elem.id}&from=${selectedFrom.toISOString()}&to=${selectedTo.toISOString()}&type=deviceOverspeed`)
        const responseGeofence = await fetch(`/api/reports/events?deviceId=${elem.id}&from=${selectedFrom.toISOString()}&to=${selectedTo.toISOString()}&type=geofenceExit`)
        if (responseDriver.ok){
          const row = await responseDriver.json()
          setRowsDrivers(state => [...state, row])
        }
        if (responseSpeedLimit.ok) {
          const row = await responseSpeedLimit.json()
          setNbSpeed(nbSpeed => nbSpeed + row.length)
        }
        if (responseGeofence.ok) {
          const row = await responseGeofence.json()
          setNbGeofence(nbGeofence => nbGeofence + row.length)
        }
      })
      }
      setLoading(false)
      setRowsDrivers([])
      setShowData(1)
  }
  
  useEffectAsync(async () => {
    const responseDriver = await fetch('/api/drivers');
    if (responseDriver.ok) {
      const res =  await responseDriver.json()
      setSeq(res);
    }
  }, [updateTimestamp]);

  return (
    <>
    <Grid container spacing={2} className={classes.Padding} >

      <Grid item lg={4}>
        <FormControl variant="filled" margin="normal"  fullWidth>
          <InputLabel>Numéro de séquence</InputLabel>
          <Select value={choice} onChange={(e) => setChoice(e.target.value)}>
          {seq.filter((word) => word.name.startsWith('S*')).map((item, id) => (
                    <MenuItem key={id} value={item.name.substring(2)}>{item.name.substring(2)}</MenuItem>
                ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item lg={4}>
        <FormControl variant="filled" margin="normal"  fullWidth>
          <InputLabel>Entité</InputLabel>
          <Select value={choice} onChange={(e) => setChoice(e.target.value)}>
          </Select>
        </FormControl>
      </Grid>
      <Grid item lg={4}>
      <FormControl variant="filled" margin="normal" fullWidth>
          <InputLabel>{t('reportPeriod')}</InputLabel>
          <Select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <MenuItem value="today">{t('reportToday')}</MenuItem>
            <MenuItem value="yesterday">{t('reportYesterday')}</MenuItem>
            <MenuItem value="thisWeek">{t('reportThisWeek')}</MenuItem>
            <MenuItem value="previousWeek">{t('reportPreviousWeek')}</MenuItem>
            <MenuItem value="thisMonth">{t('reportThisMonth')}</MenuItem>
            <MenuItem value="previousMonth">{t('reportPreviousMonth')}</MenuItem>
            <MenuItem value="custom">{t('reportCustom')}</MenuItem>
          </Select>
        </FormControl>
        {period === 'custom' && (
          <TextField
            margin="normal"
            variant="filled"
            label={t('reportFrom')}
            type="datetime-local"
            value={from.format(moment.HTML5_FMT.DATETIME_LOCAL)}
            onChange={e => setFrom(moment(e.target.value, moment.HTML5_FMT.DATETIME_LOCAL))}
            fullWidth />
        )}
        {period === 'custom' && (
          <TextField
            margin="normal"
            variant="filled"
            label={t('reportTo')}
            type="datetime-local"
            value={to.format(moment.HTML5_FMT.DATETIME_LOCAL)}
            onChange={e => setTo(moment(e.target.value, moment.HTML5_FMT.DATETIME_LOCAL))}
            fullWidth />
        )}
      </Grid>
    </Grid>
    <FormControl margin="normal"  className={classes.Margin} >
      <ButtonGroup color="primary" orientation="vertical">
        <Button onClick={handleClick}>Visualiser</Button>
      </ButtonGroup>
    </FormControl>
    </>
  );
}

function SortArray(a, b) {
  if (a.distance < b.distance)
    return -1
  if (a.distance > b.distance)
    return 1
  return 0
}

function DashboardPage() {
  const [report, setReport] = useState('');
  const [rows, setRows] = useState([]);
  const [rowsDrivers, setRowsDrivers] = useState([]);
  const [constantItems, setConst] =useState([])
  const [loading, setLoading] = useState(true)
  const [from, setFrom] = useState(moment().subtract(1, 'hour'));
  const [to, setTo] = useState(moment());
  const [nbSpeed, setNbSpeed] = useState(0)
  const [nbGeofence, setNbGeofence] = useState(0)
  const [showData, setShowData] = useState(0)
  const dataDriver = []
  const [data, setData] = useState([
    {name: 'ONLINE', value: 0},
    {name: 'OFFLINE', value: 0}
  ])
  const COLORS = ['#80c904', '#C1C1C1'];
  const map = ['EN LIGNE', 'HORS LIGNE']

  if ( rowsDrivers.length > 0){
    rowsDrivers.map((elem, id) => {
      const newChild = {
        name: elem[0].deviceName,
        km: elem[0].distance / 1000
      }
      dataDriver.push(newChild)
    })
    dataDriver.sort(SortArray)
  }
    
  return (
      <div>
          <DashboardLayout>
              <ReportPrintFilter report={report}
              setReport={setReport}
              to={to}
              setTo={setTo}
              from={from}
              setFrom={setFrom}
              setShowData={setShowData}
              setRowsDrivers={setRowsDrivers}
              setData={setData}
              setNbSpeed={setNbSpeed}
              setNbGeofence={setNbGeofence}
              nbSpeed={nbSpeed}
              nbGeofence={nbGeofence}
              setLoading={setLoading}
              from={from}
              to={to}
              setConst={setConst}
              setRows={setRows}
              data={data}
              />

              {showData === 1 && 
              <Grid container spacing={2}>
                  <Grid item lg={4}>
                      <DataPieCo data={data}
                      COLORS={COLORS}
                      map={map}
                      description={'Nombre de boitiers connectés (Nombre de numéros séquentiels avec  boitier GPS connecté )'} />
                  </Grid>
                  <Grid item lg={4}>
                      <DashboardBar description='Top 10 des vehicules par kilometrage parcouru'
                      data={dataDriver} />
                  </Grid>
                  <Grid item lg={4}>
                      <Infraction description={"Nombre des infractions de vitesse hebdomadaire par degré"} nb={nbSpeed}/>
                  </Grid>
                  <Grid item lg={4}>
                      <Infraction description={"Nombre de sortie de zone"} nb={nbGeofence} />
                  </Grid>
              </Grid>
              }
          </DashboardLayout>
      </div>
  )
}

export default DashboardPage
