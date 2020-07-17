import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserInfoForm from './components/UserInfoForm'
import { Typography } from '@material-ui/core';

// i need to fetch user info to populate it 

const DashboardUser = () => {
  let userState = useSelector(state => state.authenticationState.loggedUser)
  if (Object.keys(userState).length === 0) { //if empty object
    if(JSON.parse(localStorage.getItem('loggedUser'))) { //ako imamo u local storageu
      userState = JSON.parse(localStorage.getItem('loggedUser'))
    }
  }

  return (
    <>
      <Typography>
        User profile information
      </Typography>
      <UserInfoForm loggedUser={userState} />
    </>
  )
}

export default DashboardUser