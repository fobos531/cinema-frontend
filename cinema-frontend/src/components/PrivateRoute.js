import React, { useState, useEffect } from 'react'
import { Route, Redirect } from "react-router-dom"
import miscService from '../services/misc'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isBusy, setIsBusy] = useState(true)
  useEffect(() => {
    miscService.verifyToken().then(response => {
      if (response.authenticated == true) {
        setIsAuthenticated(true)
      }
      setIsBusy(false)
    }).catch(error => {
      setIsBusy(false)
    })
  }, []) // do this only once
  if (isBusy) return null
  if (isAuthenticated) return (
    <Route {...rest} render={props => <Component {...props} />} />
  )
  else return (
    <Redirect to="/login" />
  )
}

export default PrivateRoute