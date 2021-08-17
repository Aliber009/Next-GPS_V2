import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useEffectAsync } from './reactHelper';
import { useSelector } from 'react-redux';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));


export default function Notif() {

  const actualUser = useSelector(state => state.session.user);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useEffectAsync(async () => {
    const res = await fetch('/flsk/mission_users', { method: 'GET' })
    if (res.ok) {
      const json = await res.json();
      for (var i = 0; i < json.length; i++) {

        if (json[i].nameUser == actualUser.name) {
          setOpen(true);
          break
        }
      }

    }
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          Vous avez une nouvelle mission
        </Alert>
      </Snackbar>
    </div>
  );
}
