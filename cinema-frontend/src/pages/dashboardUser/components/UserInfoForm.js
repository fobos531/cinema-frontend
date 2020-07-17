import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { TextField, Button } from '@material-ui/core';
import { saveUserChanges } from '../../../store/actions/userActions'
import { useDispatch } from 'react-redux'

const UserInfoForm = ({ loggedUser }) => {
  const dispatch = useDispatch();
  console.log(loggedUser)
  const [formData, setFormData] = useState({fullName: loggedUser.name, email: loggedUser.email });
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

  }
  return (
    <>
    <Formik>
      <Form>
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
        <Field as={TextField}
          label="Password" variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          placeholder="new password"
          id="password"
          autoComplete="password"
          onChange={(event) => handleFormChange(event)}
        />
        <Button variant="contained" color="primary" onClick={() => handleSubmit() }>
          Save changes
        </Button>
      </Form>
    </Formik>
    </>
  )
}

export default UserInfoForm