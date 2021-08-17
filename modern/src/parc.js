import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MainToolbar from "./MainToolbar"
import { useHistory } from 'react-router-dom';




const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});


export default function Parc() {
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <MainToolbar />
      <div style={{ marginTop: "50px", justifyContent: 'center', display: 'flex', flexDirection: 'row' }}>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image="/car1.jpg"
              title="parc Car"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Gestion des couts
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Sachez tous ce qui concerne la consommation et les couts de votre parc automobile
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary" onClick={() => history.push('parc/auto')}>
              Dashboard
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
        <Card style={{ marginInline: "10px" }} className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image="/car2.png"
              title="parc Car"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Eco-Conduite
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Bilan détaillé de la conduite et évaluation des chauffeurs
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Dashboard
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>
    </>
  );
}