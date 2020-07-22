import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserInfoForm from './components/UserInfoForm'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  title: {
    display: 'block'
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  }
}));

const DashboardUser = () => {
  const classes = useStyles();
  let userState = useSelector(state => state.authenticationState.loggedUser)
  if (Object.keys(userState).length === 0) { //if empty object
    if(JSON.parse(localStorage.getItem('loggedUser'))) { //ako imamo u local storageu
      userState = JSON.parse(localStorage.getItem('loggedUser'))
    }
  }

  return (
    <div className={classes.center}>
      <h1 className={classes.title}>
        User profile information
      </h1><br></br>
      <UserInfoForm loggedUser={userState} className={classes.UserInfoForm} />
    </div>
  )
}

export default DashboardUser