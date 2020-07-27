import React, {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setActiveUser } from '../../../store/actions/authActions'

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    flex:1,
    flexDirection: 'row',
  },
  toolbar: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  link: {
    margin: theme.spacing(1),
  },
  linkButton: {
    alignSelf: 'flex-end'
  }
}));

const Navbar = () => {
  const dispatch = useDispatch() 
  
  //prvo probaj dohvatit usera iz state-a, ak ga nema tu, onda ga dohvati iz local storage
  let userState = useSelector(state => state.authenticationState.loggedUser)
  if (userState == null) { //if empty object
    if(JSON.parse(localStorage.getItem('loggedUser'))) { //ako imamo u local storageu
 //     userState = JSON.parse(localStorage.getItem('loggedUser'))
      dispatch(setActiveUser(JSON.parse(localStorage.getItem('loggedUser'))))
    }
  }
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <nav>
            <RouterLink component={Link} variant="button" color="textPrimary" to="/" className={classes.link}>
              Home
            </RouterLink>
            <RouterLink component={Link} variant="button" color="textPrimary" to="/movies" className={classes.link}>
              Movies
            </RouterLink>
            <RouterLink component={Link} variant="button" color="textPrimary" to="/user/reservations" className={classes.link}>
              My reservations
            </RouterLink>
            <RouterLink component={Link} variant="button" color="textPrimary" to="/user/dashboard" className={classes.link}>
              Settings
            </RouterLink>
            {userState != null && userState.user_type == "admin" && 
            <RouterLink component={Link} variant="button" color="textPrimary" to="/admin/dashboard" className={classes.link}>
              Admin dashboard
            </RouterLink>}
          </nav>
        </Toolbar>
        {userState == null &&
          <>
            <RouterLink component={Button} variant="outlined" color="primary" to="/login" className={`${classes.link} ${classes.loginButton}`}>
              Login
            </RouterLink>
            <RouterLink component={Button} variant="outlined" color="primary" to="/register" className={`${classes.link} ${classes.loginButton}`}>
              Register
            </RouterLink>
          </>
        }    
      </AppBar>
    </>
  );
}
export default Navbar