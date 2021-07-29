import React, { useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Paper } from '@material-ui/core';

function SpeedExcess() {
    const columns = [{
        headerName: 'Numéro séquentiel',
        field: 'sequentielNumber',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Matricule véhicule',
        field: 'matricule',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Affectation entité chaque niveau par colonne',
        field: 'colonne',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Vitesse du tronçon',
        field: 'speedSection',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Vitesse du véhicule',
        field: 'VehiculeSpeed',
        type: 'string',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Chauffeur en cas d\'existance',
        field: 'driver',
        type: 'string',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Différence',
        field: 'difference',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Niveau d\'infraction (selon le code de la route)',
        field: 'violationLevel',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      } ,{
        headerName: 'Position',
        field: 'position',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, ]

      const [items, setItems] = useState([]);

    return (
        <div>
            <Paper>
                <DataGrid
                rows={items} 
                columns={columns} 
                hideFooter 
                autoHeight />
            </Paper>
        </div>
    )
}

function GpsBox() {
    const columns = [{
        headerName: 'Nombre de boitiers connectés',
        field: 'BoxNumbers',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Nombre de boitiers avec coupure d\'alimentation ',
        field: 'BoxCutNumbers',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Nombre de numéros séquentiels sans boitier GPS connecté',
        field: 'SequentielNumberNoBox',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Nombre de boitiers GPS connectés sans numéro séquentiel',
        field: 'NoSequentielNumberBox',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }]

      const [items, setItems] = useState([]);

    return (
        <div>
            <Paper>
                <DataGrid
                rows={items} 
                columns={columns} 
                hideFooter 
                autoHeight />
            </Paper>
        </div>
    )
}

function Activity() {
    const columns = [{
        headerName: 'Numéro séquentiel',
        field: 'SequentielNumber',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Matricule véhicule',
        field: 'registrationNumber',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Affectation entité chaque niveau par colonne ',
        field: 'AffectedEntity',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Nombre d\'heures de fonctionnement en weekend',
        field: 'WorkHoursPerWeek',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Distance parcourue en weekend',
        field: 'DistanceMade',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }]

      const [items, setItems] = useState([]);

    return (
        <div>
            <Paper>
                <DataGrid
                rows={items} 
                columns={columns} 
                hideFooter 
                autoHeight />
            </Paper>
        </div>
    )
}

function Geofence() {
    const columns = [{
        headerName: 'Numéro séquentiel',
        field: 'SequentielNumber',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Matricule véhicule',
        field: 'registrationNumber',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Affectation',
        field: 'AffectedEntity',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Zone',
        field: 'Zone',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Chauffeur en cas d\'existance',
        field: 'driver',
        type: 'string',
        flex: 1,
        headerAlign: 'right',
      }]

      const [items, setItems] = useState([]);

    return (
        <div>
            <Paper>
                <DataGrid
                rows={items} 
                columns={columns} 
                hideFooter 
                autoHeight />
            </Paper>
        </div>
    )
}

function FuelConsumption() {
    const columns = [{
        headerName: 'Numéro séquentiel',
        field: 'SequentielNumber',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Matricule véhicule',
        field: 'registrationNumber',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Affectation entité chaque niveau par colonne',
        field: 'AffectedEntity',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Date approvisionnement en carburant',
        field: 'Zone',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Heure/Minute/Seconde Approvisionnement en carburant',
        field: 'supplyHour',
        type: 'string',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Lieu d\'approvisionnement ( Adresse)',
        field: 'supplyLocation',
        type: 'string',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Niveau de carburant initial',
        field: 'initialFuelLevel',
        type: 'string',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Niveau de carburant final',
        field: 'FinalFuelLevel',
        type: 'string',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Quantité carburant remplie',
        field: 'fuelQuantitySupplied',
        type: 'string',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Quantité carburant remplie selon fichier opérateurs pétroliers',
        field: 'OpFuelQuantitySupplied',
        type: 'string',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Différence',
        field: 'difference',
        type: 'string',
        flex: 1,
        headerAlign: 'right',
      }]

      const [items, setItems] = useState([]);

    return (
        <div>
            <Paper>
                <DataGrid
                rows={items} 
                columns={columns} 
                hideFooter 
                autoHeight />
            </Paper>
        </div>
    )
}

function Miles() {
    const columns = [{
        headerName: 'Numéro séquentiel',
        field: 'SequentielNumber',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Matricule véhicule',
        field: 'registrationNumber',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Affectation entité chaque niveau par colonne',
        field: 'AffectedEntity',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Index kilométrique 1',
        field: 'index1',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }, {
        headerName: 'Index kilométrique 2',
        field: 'index2',
        type: 'number',
        flex: 1,
        headerAlign: 'right',
      }]

      const [items, setItems] = useState([]);

    return (
        <div>
            <Paper>
                <DataGrid
                rows={items} 
                columns={columns} 
                hideFooter 
                autoHeight />
            </Paper>
        </div>
    )
}

function DriverBehavior() {
    const columns = [{
        headerName: 'Comportement conduteur',
        field: 'SequentielNumber',
        type: 'string',
        flex: 1,
        headerAlign: 'center',
      }]

      const [items, setItems] = useState([]);

    return (
        <div>
            <Paper>
                <DataGrid
                rows={items} 
                columns={columns} 
                hideFooter 
                autoHeight />
            </Paper>
        </div>
    )
}

function ReportToPrint({ report }){
    switch (report){
        case 'vitesse':
            return  <SpeedExcess />
        case 'gps':
            return  <GpsBox />
        case 'activity':
            return <Activity />
        case 'geofence':
            return <Geofence />
        case 'carburant':
            return <FuelConsumption />
        case 'kilometrage':
            return <Miles />
        case 'conducteur':
            return <DriverBehavior />
        default:
            return null
    }

}

export default ReportToPrint
