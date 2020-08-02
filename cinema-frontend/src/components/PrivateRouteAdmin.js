import React, { useState, useEffect } from 'react'
import { Route, Redirect, useHistory } from "react-router-dom"
import miscService from '../services/misc'

const PrivateRouteAdmin = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const [isBusy, setIsBusy] = useState(true)
  useEffect(() => {
    miscService.verifyTokenAdmin().then(response => {
      console.log("response", response)
      setIsAuthenticated(response.authenticated)
      setIsBusy(false)
    }).catch(error => {
      setIsBusy(false)
    })
  }, []) // do this only once
  if (isBusy) return null
  console.log("authenticated:", isAuthenticated)
 
  if (isAuthenticated) return (
    <Route {...rest} render={props => <Component {...props} />} />
  )
  if (isAuthenticated == false) {return (<Redirect to="/" />)}
}

export default PrivateRouteAdmin