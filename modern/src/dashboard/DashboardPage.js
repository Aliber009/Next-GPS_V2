import { useState,useEffect } from 'react';
import DashboardLayout from './DashboardLayout'
import { DataPieCo } from './DashboardPie'
import { Grid, Paper, makeStyles } from '@material-ui/core';
import DashboardLine from './DashboardLine';
import DashboardBar from './DashboardBar';
import DashboardNotif from './DashboardNotif';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { devicesActions } from '../store';
import { useEffectAsync } from '../reactHelper';
import { useHistory } from 'react-router-dom';

function DashboardPage() {
    const COLORS2 = ['#C1C1C1', '#80c904', '#dc143c', '#FF5E13', '#3c1361'];
    const data2 = [
        { name: 'Group A', value: 9 },
        { name: 'Group B', value: 61 },
        { name: 'Group C', value: 30 },
        { name: 'Group D', value: 6 },
        { name: 'Group R', value: 80 },
    ];
    const map2 = ['INFO 1', 'INFO 2', 'INFO 3', 'INFO 4', 'INFO 5']
    
    return (
        <div>
            <DashboardLayout>
                <Grid container spacing={2}>
                    <Grid item lg={4}>
                        <DataPieCo />
                    </Grid>
                    <Grid item lg={4}>
                        <DashboardBar description='Kilométrage les plus élevés'  />
                    </Grid>
                    <Grid item lg={4}>
                        <DashboardNotif description='Notification'/>
                    </Grid>
                    <Grid item lg={4}>
                        <DashboardBar description='Consomation Carburant les plus élevés'  />
                    </Grid>
                    <Grid item lg={4}>
                        <DashboardNotif description='Éxces de vitesse'/>
                    </Grid>
                    <Grid item lg={4}>
                        <DashboardNotif description='Présence en Zones'/>
                    </Grid>
                </Grid>
            </DashboardLayout>
        </div>
    )
}

export default DashboardPage
