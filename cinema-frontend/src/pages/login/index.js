import React, { useState }from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { object, string } from 'yup';
import Copyright from '../components/copyright'
import loginService from '../../services/login'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../store/actions/authActions'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/featured/?cinema)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '100%',
  },
}));


const initialValues = {
  email: '',
  password: ''
}


const LoginForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    setOpen(false); 
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik validationSchema={
            object({
              email: string().required('You have to enter an e-mail!'),
              password: string().required('You have to enter a password!'),
            })
          }
            initialValues={initialValues} onSubmit={ (loginInfo) => {
              loginService.login(loginInfo).then(response => {
                if (response.error) {
                  setOpen(true)
                } else { // korisnik se uspješno logirao
                  dispatch(loginUser(loginInfo))
                }
              });
            }}>
            <Form className={classes.form}>
              <Field name="email" as={TextField} label="E-mail" variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                autoComplete="email"
              />
              <ErrorMessage name="email" />
              <Field name="password" as={TextField} label="Password" variant="outlined"
                margin="normal"
                required
                fullWidth
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <ErrorMessage name="password" /><br></br>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" disableRipple={false} />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            </Form>

          </Formik>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up Here!"}
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Copyright />
          </Box>
          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              Invalid username or password! Please check your input.
            </Alert>
          </Snackbar>
        </div>
      </Grid>
    </Grid>
  );
}

export default LoginForm