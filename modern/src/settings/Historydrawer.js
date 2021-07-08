import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
//import VerticalLinearStepper from './historyStepper';


const useStyles = makeStyles({
  list: {
    width: 300,
  },
  fullList: {
    width: 'auto',
  },
});

export default function HistoryDrawer(props) {
  const classes = useStyles();
 
  return (
    <div>
          <Drawer anchor={'right'} open={props.open}  >
          <div
          className={classes.list}
          role="button">
          {props.list}
          </div>
          </Drawer>
        

    </div>

  );
}
