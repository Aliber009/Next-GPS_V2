import React, { useState } from 'react';
import ReportLayoutPage from './ReportLayoutPage';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import t from '../common/localization';
import ReportFilter from './ReportFilter';
import { FormControl, InputLabel, Select, MenuItem, Button, TextField, ButtonGroup } from '@material-ui/core';
import ReportToPrint from './ReportsToPrint'

const Filter = ({ setItems, report }) => {

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

  if (report !== 'activity')
    return null
  
  return (
    <ReportFilter handleSubmit={handleSubmit}>
      <FormControlLabel
        control={<Checkbox checked={daily} onChange={e => setDaily(e.target.checked)} />}
        label={t('reportDaily')} />
    </ReportFilter>
  );
}

const ReportPrintFilter = ({ setReport, report, dateFilter }) => {
console.log("rendering")
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
        <InputLabel>Device</InputLabel>
        <Select value={report} onChange={(e) => setReport(e.target.value)}>
        </Select>
        {dateFilter}
      </FormControl>
      <FormControl variant="filled" margin="normal" fullWidth>
        <InputLabel>Numéro de séquence</InputLabel>
        <Select value={report} onChange={(e) => setReport(e.target.value)}>
        </Select>
        {dateFilter}
      </FormControl>
      <FormControl variant="filled" margin="normal" fullWidth>
        <InputLabel>Entité</InputLabel>
        <Select value={report} onChange={(e) => setReport(e.target.value)}>
        </Select>
        {dateFilter}
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

    return (
        <div>
        <ReportLayoutPage filter={<ReportPrintFilter report={report} setReport={setReport} dateFilter={<Filter setItems={setItems} report={report} />} />}>
            <ReportToPrint report={report}  />
        </ReportLayoutPage>
        </div>
    )
}