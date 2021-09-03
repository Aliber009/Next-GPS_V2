import React, { useState, useEffect } from 'react';
import ReportLayoutPage from './ReportLayoutPage';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import t from '../common/localization';
import { FormControl, InputLabel, Select, MenuItem, Button, TextField, ButtonGroup } from '@material-ui/core';
import ReportToPrint from './ReportsToPrint'
import moment from 'moment';
import { useSelector } from 'react-redux';

const ReportFilter = ({ handleSubmit,setfilterDate }) => {
  const devices = useSelector(state => Object.values(state.devices.items));
  const [deviceId, setDeviceId] = useState();
  const [period, setPeriod] = useState('today');
  const [from, setFrom] = useState(moment().subtract(1, 'hour'));
  const [to, setTo] = useState(moment());
  useEffect(()=>{
    setfilterDate(prev =>{prev[0].from = from;prev[0].to = to;prev[0].period = period;return [...prev]})
  },[from,to,period])
  const handleClick = (mail, json) => {
    let selectedFrom;
    let selectedTo;
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

    const accept = json ? 'application/json' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    handleSubmit(
      deviceId,
      selectedFrom.toISOString(),
      selectedTo.toISOString(),
      mail,
      { Accept: accept }
    );
    
  }

  
  
  return (
    <>
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
    </>
  );
}

const Filter = ({ setItems, report,setfilterDate }) => {

  const [daily, setDaily] = useState(false);

  const handleSubmit = async (deviceId, from, to, mail, headers) => {

    const query = new URLSearchParams({ deviceId, from, to, daily, mail });
    const response = await fetch(`/api/reports/summary?${query.toString()}`, { headers });
    if (response.ok) {
      const contentType = response.headers.get('content-type');
      if (contentType) {
        if (contentType === 'application/json') {
          setItems(await response.json());
        } else {
          window.location.assign(window.URL.createObjectURL(await response.blob()));
        }
      }
    }
  }

  return (
    <ReportFilter handleSubmit={handleSubmit} setfilterDate={setfilterDate}>
    </ReportFilter>
  );
}



const ReportPrintFilter = ({ setReport, report, dateFilter ,filterDate,setlistAllFilters}) => {
  const [seq, setSeq] = useState([])

  const [listEntities,setListEntities] =useState([])
  const [nodes,setNodes] =useState([])
  const [listFilters,setListFilters] =useState([{seqNumber:"",entitie:"",from:"",to:"",period:"today"}])
  async function  loadEntities() {
    const response = await fetch('/flsk/entites');
    if (response.ok) {
      const res =  await response.json()
      if( res.length === 0 ){setNodes(initializedСopy(res));}
      else if( res.length > 0) {setNodes(initializedСopy(res[0].arr));}     
    }
  }


  useEffect(()=>{
    setListFilters(prev => {prev[0].from = filterDate[0].from;prev[0].to = filterDate[0].to;prev[0].period = filterDate[0].period; return [...prev]})
  },[filterDate])

  useEffect(()=>{
    setlistAllFilters(listFilters)
  },[listFilters])

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
            
            //setLoading((loading) => !loading)
        }else if(seqAttribut == undefined){
            nodesCopy[i] = { 
                children: hasChildren ? initializedСopy(children, id) : undefined,
                id:id,
                name,
            };
            setListEntities(entities => [...entities,name])
        }
    }
    return nodesCopy;
  }

  useEffect(async () => {
    loadEntities()
    const responseDriver = await fetch('/api/drivers');
    if (responseDriver.ok) {
      const res =  await responseDriver.json()
      setSeq(res);
    }

  }, []);
  return (
    <>
      <FormControl variant="filled" margin="normal" fullWidth>
        <InputLabel>Report</InputLabel>
        <Select value={report} onChange={(e) => setReport(e.target.value)}>
          <MenuItem value="vitesse">Excès de vitesse</MenuItem>
          <MenuItem value="gps">Boitiers GPS</MenuItem>
          <MenuItem value="activity">Activité</MenuItem>
          <MenuItem value="geofence">Géofencing</MenuItem>
          <MenuItem value="carburant">Consommation carburant</MenuItem>
          <MenuItem value="kilometrage">Kilométrage</MenuItem>
          <MenuItem value="conducteur">Comportement conduteur</MenuItem>
        </Select>
        {dateFilter}
      </FormControl>
      <FormControl variant="filled" margin="normal" fullWidth>
        <InputLabel>Numéro de séquence</InputLabel>
        <Select onChange={(e) => {setListFilters(prev => {prev[0].seqNumber = e.target.value; return [...prev]});}}>
        <MenuItem key="{id}" value=" "> </MenuItem>
        {seq.filter((word) => word.name.startsWith('S*')).map((item, id) => (
                    <MenuItem key={id} value={item.name.substring(2)}>{item.name.substring(2)}</MenuItem>
                ))}
        </Select>
      </FormControl>
      <FormControl variant="filled" margin="normal" fullWidth>
        <InputLabel>Entité</InputLabel>
        <Select onChange={(e) => setListFilters(prev => {prev[0].entitie = e.target.value; return [...prev]})}>
        {listEntities.map((item, id) => (
                    <MenuItem key={id} value={item}>{item}</MenuItem>
                ))}
        </Select>
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <ButtonGroup color="primary" orientation="vertical">
          <Button >{t('reportExport')}</Button>
          <Button >{t('reportEmail')}</Button>
        </ButtonGroup>
      </FormControl>
    </>
  );
}

export default function PrintReportPage() {
    const [report, setReport] = useState('vitesse');
    const [items, setItems] = useState([])
    const [filterDate,setfilterDate] = useState([{from:moment().subtract(1, 'hour'),to:moment(),period:'today'}])
    const [listAllFilters,setlistAllFilters] =useState([{seqNumber:"",entitie:"",from:"",to:"",period:"today"}])
    return (
        <div>
        <ReportLayoutPage filter={<ReportPrintFilter filterDate={filterDate} setlistAllFilters = {setlistAllFilters}  report={report} setReport={setReport} dateFilter={<Filter setItems={setItems} report={report} setfilterDate={setfilterDate}  />} />}>
            <ReportToPrint report={report}  listAllFilters = {listAllFilters} />
        </ReportLayoutPage>
        </div>
    )
} 

