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

function DashboardBar({ description }) {
    const classes = useStyles();

    const data = [
        {
          name: 'CAR 1',
          km: 2400,
        },
        {
          name: 'CAR 2',
          km: 1398,
        },
        {
          name: 'CAR 3',
          km: 9800,
        },
        {
          name: 'CAR 4',
          km: 3908,
        },
        {
          name: 'CAR 5',
          km: 1890,
        },
        {
          name: 'CAR 6',
          km: 2500,
        },
        {
          name: 'CAR 7',
          km: 2100,
        },
      ];

    return (
        <div className={classes.dashboard}>
            <div className={classes.dashboardDescription}>{description}</div>
            <BarChart
                layout='vertical'
            width={450}
            height={270}
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