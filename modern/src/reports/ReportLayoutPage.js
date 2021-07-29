import React from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import MainToolbar from '../MainToolbar';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: 1,
    overflow: 'auto',
    padding: theme.spacing(2),
  },
  form: {
    padding: theme.spacing(1, 2, 2),
  },
  Padding:{
    padding: '15px'
  }
}));

function Filter({ filter }){
    if (filter)
      return (
        <Grid item xs={12} md={3} lg={2} >
          <Paper style={{padding: '15px'}}>
            {filter}
          </Paper>
        </Grid>
      )
    return null
}

const ReportLayoutPage = ({ children, filter }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MainToolbar />
      <div className={classes.content} >
        <Grid container spacing={2} >
          <Filter filter={filter} />
          <Grid item xs={12} md={9} lg={(filter) ? 10 : 12}>
            <Paper>
              {children}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default ReportLayoutPage;