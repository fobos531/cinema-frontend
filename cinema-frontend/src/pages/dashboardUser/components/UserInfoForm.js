import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { TextField, Button, OutlinedInput, Input, makeStyles } from '@material-ui/core';
import { saveUserChanges } from '../../../store/actions/userActions'
import { useDispatch } from 'react-redux'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  form: {
    width: '35%', 
    margin: theme.spacing(2),
  },
  saveButton: {
    marginBottom: theme.spacing(2)
  },
  passwordField: {
    width: '100%'
  }
  
}));

const UserInfoForm = ({ loggedUser }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  console.log(loggedUser)
  const [open, setOpen] = useState(false)
  const handleClose = (event, reason) => {
    setOpen(false); 
  };
  const [formData, setFormData] = useState({fullName: loggedUser.name, email: loggedUser.email, showPassword: false });
  const handleFormChange = event => {
    setFormData({ ...formData, [event.target.id]: event.target.value })
    console.log(formData)
  }
  const handleSubmit = () => {
    let modifiedUserData = {}  
    modifiedUserData = {...formData, id: loggedUser.id}
    console.log(modifiedUserData)
    dispatch(saveUserChanges(modifiedUserData))
    document.getElementById("fullName").value = ''
    document.getElementById("email").value = ''
    document.getElementById("password").value = ''
    setOpen(true)
  }
  const handleClickShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
    <Formik>
      <Form className={classes.form}>
        <Field as={TextField} 
          label="Name" variant="outlined"
          margin="normal"
          fullWidth
          defaultValue={loggedUser.name}
          id="fullName"
          placeholder="new name"
          autoComplete="fullName"
          onChange={(event) => handleFormChange(event)}
        />
        <Field as={TextField}
          label="E-mail" variant="outlined"
          margin="normal"
          defaultValue={loggedUser.email}
          fullWidth
          id="email"
          placeholder="new e-mail"
          autoComplete="email"
          onChange={(event) => handleFormChange(event)}
        />
        <FormControl variant="outlined" className={classes.passwordField}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Field as={OutlinedInput}
            id="password"
            label="Password"
            placeholder="new password"
            type={formData.showPassword ? 'text' : 'password'}
            onChange={(event) => handleFormChange(event)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {formData.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl><br></br><br></br>
        <Button variant="contained" color="primary" onClick={() => handleSubmit()} className={classes.saveButton}>
          Save changes
        </Button>
      </Form>
    </Formik>
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Password sucessfully changed!
        </Alert>
      </Snackbar>
    </>
  )
}

export default UserInfoForm