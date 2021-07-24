import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid, Paper, makeStyles } from '@material-ui/core';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const useStyles = makeStyles(theme => ({
    dashboard: {
      background: 'white'
    },
    dashboardDescription:{
        padding: '10px'
    },
  }));

function DashboardLine() {
    const classes = useStyles();
    const data = [
        {
          name: '29.06.2020',
          car1: getRandomInt(100),
          car2: getRandomInt(100),
          car3: getRandomInt(100)
        },
        {
          name: '29.06.2020',
          car1: getRandomInt(100),
          car2: getRandomInt(100),
          car3: getRandomInt(100)
        },
        {
          name: '31.06.2020',
          car1: getRandomInt(100),
          car2: getRandomInt(100),
          car3: getRandomInt(100)
        },
        {
          name: '01.07.2020',
          car1: getRandomInt(100),
          car2: getRandomInt(100),
          car3: getRandomInt(100)
        },
        {
          name: '02.07.2020',
          car1: getRandomInt(100),
          car2: getRandomInt(100),
          car3: getRandomInt(100)
        },
      ];

    return (
        <div className={classes.dashboard}>
          <div className={classes.dashboardDescription}>Carubrant consommé par capteur de niveau de carburant(FLS)</div>
            <LineChart
                width={700}
                height={270}
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis  />
                <Tooltip />
                <Legend />
                <Line dataKey="car1" stroke="#8884d8" />
                <Line dataKey="car2" stroke="#82ca9d" />
                <Line dataKey="car3" stroke="#bd6345" />
            </LineChart>
        </div>
    )
}

export default DashboardLine