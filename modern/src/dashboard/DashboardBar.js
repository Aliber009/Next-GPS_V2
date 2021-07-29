import React from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    dashboard: {
      background: 'white'
    },
    dashboardDescription:{
        padding: '10px'
    },
  }));

function DashboardBar({ description, data }) {
    const classes = useStyles();

    return (
        <div className={classes.dashboard}>
            <div className={classes.dashboardDescription}>{description}</div>
            <BarChart
                layout='vertical'
            width={450}
            height={290}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="km" fill="#8884d8" barSize={10} />
            </BarChart>
        </div>
    )
}

export default DashboardBar
