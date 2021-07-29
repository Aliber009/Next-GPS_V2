import React, { useState } from 'react';
import ReportLayoutPage from './ReportLayoutPage';
import { FormControlLabel, Checkbox, Grid, Paper, makeStyles } from '@material-ui/core';
import { FormControl, InputLabel, Select, MenuItem, Button, TextField, ButtonGroup } from '@material-ui/core';
import ReportToPrint from './ReportsToPrint'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useEffectAsync } from '../reactHelper';

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

const BackToOptions = ({ setReport }) => {
  const classes = useStyle()

  return (
    <div onClick={() => setReport('')} className={classes.backButton}>
      <ArrowBackIcon />
      <div className={classes.Child}>
        Back to Report choice
      </div>
    </div>
  )

}

const ReportPrintFilter = ({ setReport, report, dateFilter }) => {
  const classes = useStyle()
  const [choice, setChoice] = useState('')
  const [items, setItems] = useState([]);
  const [updateTimestamp, setUpdateTimeStamp] = useState(Date.now())
  const [seq, setSeq] = useState([])
  const [devices, setDevices] = useState([])
  const [groups, setGroups] = useState([])
  
  useEffectAsync(async () => {
    const responseDriver = await fetch('/api/drivers');
    const responseDevices = await fetch('/api/devices');
    const responseGroups = await fetch('/api/groups');
    if (responseDriver.ok) {
      const res =  await responseDriver.json()
      setSeq(res);      
    }
    if (responseDevices.ok){
      const res = await responseDevices.json()
      setDevices(res)
    }
    if (responseGroups.ok){
      const res = await responseGroups.json()
      setGroups(res)
    }
  }, [updateTimestamp]);
  
  const handlePrint = (e) => {
    e.preventDefault()
    setReport(choice)
  }

  if (report.length > 0)
    return <BackToOptions setReport={setReport} />

  return (
    <>
    <Grid container spacing={2} className={classes.Padding} >
      <Grid item lg={4}>
      <FormControl variant="filled" margin="normal" className={classes.FormControl}  fullWidth>
          <InputLabel>Report</InputLabel>
          <Select value={choice} onChange={(e) => setChoice(e.target.value)}>
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
      </Grid>

      <Grid item lg={4}>
        <FormControl variant="filled" margin="normal"  fullWidth>
          <InputLabel>Device</InputLabel>
          <Select value={choice} onChange={(e) => setChoice(e.target.value)}>
          {devices.map((item, id) => (
                    <MenuItem key={id} value={item.name}>{item.name}</MenuItem>
                ))}
          </Select>
        </FormControl>
      </Grid>

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
          {groups.map((item, id) => (
                    <MenuItem key={id} value={item.name}>{item.name}</MenuItem>
                ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
    <FormControl margin="normal"  className={classes.Margin} >
      <ButtonGroup color="primary" orientation="vertical">
        <Button onClick={handlePrint}>Visualiser</Button>
      </ButtonGroup>
    </FormControl>
    </>
  );
}

export default function PrintReportPage() {
    const [report, setReport] = useState('');
    const [items, setItems] = useState([])

    return (
        <div>
        <ReportLayoutPage >
            <ReportPrintFilter report={report} setReport={setReport} />
            <ReportToPrint report={report}  />
        </ReportLayoutPage>
        </div>
    )
}