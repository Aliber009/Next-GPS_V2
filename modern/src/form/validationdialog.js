import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useHistory, useParams } from 'react-router';
import { useState } from 'react';
import { useEffectAsync } from '../reactHelper';

export default function ValidDialog({open,close}) {
  //const [open, setOpen] = React.useState(false);
  const history = useHistory()


   

  return (
    <div>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Modification clé sequentiel"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Numero de sequence a été modifié 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
