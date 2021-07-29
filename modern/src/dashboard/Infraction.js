import React, { useEffect, useState } from 'react'
import DashboardLayout from './DashboardLayout'
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
        fontSize: '50px' 
    }
  }));

function Infraction({ description, nb }) {
    const [updateTimestamp, setUpdateTimestamp] = useState(Date.now());
    const classes = useStyles();

    return (
        <div className={classes.dashboard}>
            <div className={classes.dashboardDescription}>{description}</div>
            {(nb > 0 )? 
            <div className={classes.notificationContainer}>{nb}</div>:
            <div className={classes.notificationContainer}>Pas d'infraction</div>
        }
        </div>
    )
}

export default Infraction
