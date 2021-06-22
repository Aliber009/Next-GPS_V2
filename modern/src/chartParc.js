import React from 'react';
import { Line, Bar, Doughnut, Pie, Scatter } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MainToolbar from './MainToolbar'
import { useEffectAsync } from './reactHelper';
import Chart from 'react-apexcharts'


const useStyles = makeStyles((theme) => ({
  root: {
    margin: "10%",
    marginTop: '10px',
    //maxWidth: '800px',
    flexGrow: 1,
    alignItems: "center",
    alignContent: 'center'

  },
  media: {
    height: 140,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
const { REACT_APP_FLASK } = process.env

export function CardChart() {

  const [globalCosts, setglobalCosts] = useState([])
  const [globalseries, setglobalseries] = useState({})

  useEffectAsync(async () => {

    const res = await fetch(REACT_APP_FLASK + '/costs')
    if (res.ok) {
      const response = await res.json()

      setglobalCosts(() => { const x = []; response.forEach(i => x.push({ 'name': i.type, 'data': [{ 'x': i.Date, 'y': i.Somme }] })); return x })
      setglobalseries(() => {

        //var x=[{"name":response[0].type,"data":[response[0].Somme]}];

        var m = new Map()
        m.set(response[0].type, [{ 'x': response[0].Date, 'y': response[0].Somme }])

        for (var i = 1; i < response.length; i++) {

          if (m.has(response[i].type)) {
            var val = m.get(response[i].type)
            m.set(response[i].type, [...val, { 'x': response[i].Date, 'y': response[i].Somme }])
          } else
            m.set(response[i].type, [{ 'x': response[i].Date, 'y': response[i].Somme }])
        }
        return Object.fromEntries(m)

      })

    }
  }, [])

  //apex

  var seriess = [{}]
  if (globalseries != {}) {
    var ser = []
    for (var i = 0; i < Object.keys(globalseries).length; i++) {
      ser.push({ 'name': Object.keys(globalseries)[i], 'data': Object.values(globalseries)[i] })
    }
    seriess = ser
  }

  console.log(globalseries)
  /* 
  const seriess=globalCosts
      const seriess= [{
      name: "Carburant",
      data: [{x:globalCosts[0].date,y:globalCosts[0].data}]
      },
  {
    name: "réparation",
    data: [{x:globalCosts[1].date,y:globalCosts[1].data}]
  },
  {
    name: "Visite technique",
    data: [{x:globalCosts[2].date,y:globalCosts[2].data}]
  }
  ] */

  const optionss = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    /*  title: {
       text: 'Consommation totale des vehicules',
       align: 'left'
     }, */
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      type: 'datetime'
    }
  }

  const series1 = [44, 55, 41, 17, 10, 5]
  const chartOptions = {
    labels: ['Carburant', 'Assurance', 'Frais Autouroute', 'Réparation', 'Impot', 'Infraction']
  }





  //end of apex





  const classes = useStyles();

  return (
    <>
      <MainToolbar />
      <div style={{ alignContent: "center", alignItems: "center", display: "flex" }}>
        <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs>
              <Paper className={classes.paper}>
                <Card className={classes.root}>
                  <CardMedia>
                    <Chart options={chartOptions} series={series1} type="donut" titre={{ text: "conso" }} />
                  </CardMedia>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Consommation totale des vehicules
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      Share
                    </Button>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}><Card className={classes.root}>
                <CardMedia>
                  <Chart options={optionss} series={seriess} type="bar" height={350} />
                </CardMedia>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Consommation par type de facture
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                      across all continents except Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card></Paper>
            </Grid>

          </Grid>
          <Grid container spacing={3}>
            <Grid item xs>
              <Paper className={classes.paper}> <Card className={classes.root}>
                <CardMedia>

                </CardMedia>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Consommation par vehicule
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                      across all continents except Antarctica
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Share
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card></Paper>
            </Grid>
          </Grid>




        </div>


      </div>
    </>








  )
}


export default CardChart
