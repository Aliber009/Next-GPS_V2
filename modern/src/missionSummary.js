import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MainToolbar from './MainToolbar';
import { useEffectAsync } from './reactHelper';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, Mission, Accomplie ) {
  return { name, Mission, Accomplie };
}



export default function BasicTable() {

  const[ mission ,setmission]=useState([])
  const[missionUser,setmissionUser]=useState([])

  useEffectAsync(async () => {
    
    const resUser = await fetch('http://127.0.0.1:5000/mission_users',{method:'GET'})
    if(resUser.ok){
    const jsonUser = await resUser.json();
    setmissionUser(jsonUser);
    }

    const res= await fetch('http://127.0.0.1:5000/missions',{method:'GET'})
    if(res.ok){
    const json= await res.json();
    setmission(json)
     }   
 }, []);

 function x(index){
  var x="";
  mission.forEach(i=>{if(i.id==missionUser[index].missionID){x=i.Description}})
  return x
  
}

  const classes = useStyles();

  return (
      <>
    <MainToolbar />
    <div style={{ marginTop:30, marginInline:20}}>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nom utilisateur</TableCell>
            <TableCell align="right">Mission</TableCell>
            <TableCell align="right">Accomplie</TableCell>
            <TableCell align="right">Date Debut</TableCell>
            <TableCell align="right">Date Fin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {missionUser.map((row,index) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.nameUser}
              </TableCell>
              <TableCell align="right">{x(index)}</TableCell>
              <TableCell align="right">{(row.notified).toString()}</TableCell>
              <TableCell align="right">{row.startDate}</TableCell>
              <TableCell align="right">{row.endDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </>
  );
}
