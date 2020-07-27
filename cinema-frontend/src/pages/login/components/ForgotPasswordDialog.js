import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Field, Form, Formik } from 'formik';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import userService from '../../../services/users'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const initialValues = {
  recoveryEmail: ''
}


const ForgotPasswordDialog = ({setForgotPasswordOpened}) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setForgotPasswordOpened(false)
  };
  const handleResetPassword = () => {

  }
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleCloseSnackbar = (event, reason) => {
    setOpenSnackbar(false); 
  };
  return (
    <div>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Forgot your password?
        </DialogTitle>
        <DialogContent dividers>
          <Formik initialValues={initialValues} onSubmit={ (formInfo, {resetForm}) => {
            console.log(formInfo)
            userService.resetPassword(formInfo).then(response => {
              setOpenSnackbar(true)
              
            })
            resetForm(initialValues)
          }}>
            <Form>
              <Field name="recoveryEmail" as={TextField} label="Recovery email" variant="outlined"
                margin="normal"
                required
                fullWidth
                id="recoveryEmail"
                autoComplete="recoveryEmail"
               // onChange={(event) => handleFormChange(event)}
              />
              <Button type="submit" onClick={handleResetPassword} color="primary">
                Reset my password
              </Button>
            </Form>
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="info">
          Your password has been reset! Please check your email for more details.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ForgotPasswordDialog