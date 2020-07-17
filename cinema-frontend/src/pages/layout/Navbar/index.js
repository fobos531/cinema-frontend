import React, {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux';

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
    margin: theme.spacing(1, 1.5),
  },
  linkButton: {
    alignSelf: 'flex-end'
  }
}));

const Navbar = () => {
  // POGLEDAJ OPCIJE KAK OVO SLOZITI KA BUDE GLOBAL FUNKCIJA IL TAK NES 
  
  //prvo probaj dohvatit usera iz state-a, ak ga nema tu, onda ga dohvati iz local storage
  let userState = useSelector(state => state.authenticationState.loggedUser)
  if (Object.keys(userState).length === 0) { //if empty object
    if(JSON.parse(localStorage.getItem('loggedUser'))) { //ako imamo u local storageu
      userState = JSON.parse(localStorage.getItem('loggedUser'))
    }
  }
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <nav>
            <RouterLink component={Link} variant="button" color="textPrimary" to="/login" className={classes.link}>
              Movies
            </RouterLink>
            <RouterLink component={Link} variant="button" color="textPrimary" to="/login" className={classes.link}>
              My reservations
            </RouterLink>
            <RouterLink component={Link} variant="button" color="textPrimary" to="/login" className={classes.link}>
              Settings
            </RouterLink>
            {userState.user_type == "admin" && 
            <RouterLink component={Link} variant="button" color="textPrimary" to="/admin/dashboard" className={classes.link}>
              Admin dashboard
            </RouterLink>}
          </nav>
        </Toolbar>
        {userState.user_type === undefined &&
          <RouterLink component={Button} variant="outlined" color="primary" to="/login" className={`${classes.link} ${classes.loginButton}`}>
            Login
          </RouterLink>
        }    
      </AppBar>
    </>
  );
}
export default Navbar