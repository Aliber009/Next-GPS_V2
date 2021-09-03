import React from 'react'
import { Grid, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    dashboard: {
      background: 'white',
      width: '100%',
      height: '100%',
      minHeight: '270px'
    },
    dashboardDescription:{
        padding: '10px'
    },
    dashboardConnexion:{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px'
    },
    notificationContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70%',
    }
  }));

function Notification({data}){
    return (
        <div>
            {data.map((elem, id) => (
                <div>{elem}</div>
            ))}            
        </div>
    )
}

function DashboardNotif({ description, data }) {
    const classes = useStyles()

    return (
        <div className={classes.dashboard}>
            <div className={classes.dashboardConnexion}>
                <div>{description}</div>
                <div style={{color: '#80c904'}}>DONNÉES ACTUELLES</div>
            </div>
            {data
            ? <div className={classes.notificationContainer}><Notification /></div>
            : <div className={classes.notificationContainer} style={{color: 'grey'}}>Pas de données</div>  }
        </div>
    )
}

export default DashboardNotif
