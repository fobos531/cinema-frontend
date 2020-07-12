import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { object, string } from 'yup';
import { useDispatch } from 'react-redux'
import Copyright from '../components/copyright'
import { registerUser } from '../../store/actions/registerActions'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialValues = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: ''
}



const RegisterForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    setOpen(false); 
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Formik validationSchema={
          object({
            firstName: string().required('Please enter your first name!'),
            lastName: string().required('Please enter your last name!'),
            username: string().required('Please enter a desired username!'),
            email: string().required('Please enter your email!'),
            password: string().required('Password is required!'),
          })}
          initialValues={initialValues} onSubmit={(newUser) => {
            dispatch(registerUser(newUser))
            setOpen(true)
          }}
        >
          <Form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field name="firstName" as={TextField}
                  autoComplete="fname"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                />
                <ErrorMessage name="firstName" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field name="lastName" as={TextField}
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoComplete="lname"
                />
                <ErrorMessage name="lastName" />
              </Grid>
              <Grid item xs={12}>
                <Field name="username" as={TextField}
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoComplete="username"
                />
                <ErrorMessage name="username" />
              </Grid>
              <Grid item xs={12}>
                <Field name="email" as={TextField}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                />
                <ErrorMessage name="email" />
              </Grid>
              <Grid item xs={12}>
                <Field name="password" as={TextField}
                  variant="outlined"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <ErrorMessage name="password" />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Sucessfully registered! You may log in on the main page now.
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default RegisterForm