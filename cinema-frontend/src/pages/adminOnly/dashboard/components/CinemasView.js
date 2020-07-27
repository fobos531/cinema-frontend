// Cinemas view ima sljedeće mogućnosti

// prvo bu forma za dodavanje novog cinema, dodaje se ime, grad, postal code i slika
// IMPLEMENTIRANO


// ispod toga je  popis svih kina po 3 u jednom redu -> IMPLEMENTIRANO

// search - mozda
// edit i delete slozi (delete je bitnije)
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import clsx from 'clsx';
import { DropzoneArea } from 'material-ui-dropzone'
import { Field, Form, Formik } from 'formik';
import CinemaCard from './CinemaCard';
import Title from './Title'
import { useSelector, useDispatch } from 'react-redux';
import { getCinemas, addNewCinema } from '../../../../store/actions/cinemaActions'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  Paper: {
    height: 'fit-content'
  },
  filePicker: {
    height: '50%'
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



const CinemaForm = () => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const [file, setFile] = useState()
  const [formData, setFormData] = useState({});
  const handleFormChange = event => {
    setFormData({ ...formData, [event.target.id]: event.target.value })
    console.log(formData)
  }
  const handleSubmit = async () => {
    const cinemaData = new FormData();
    cinemaData.append('cinemaName', formData.cinemaName)
    cinemaData.append('city', formData.city)
    cinemaData.append('postalCode', formData.postalCode)
    cinemaData.append('numberOfSeats', formData.numberOfSeats)
    cinemaData.append('ticketPrice', formData.ticketPrice)
    cinemaData.append('image', file)
    dispatch(addNewCinema(cinemaData))
    document.getElementById("cinemaName").value = ''
    document.getElementById("numberOfSeats").value = ''
    document.getElementById("ticketPrice").value = ''
    document.getElementById("city").value = ''
    document.getElementById("postalCode").value = ''

  }
  return (
    <>
     <Title>
       ADD NEW CINEMA
     </Title>
      <Formik>
        <Form className={classes.form}>
          <Field name="cinemaName" as={TextField} label="Cinema name" variant="outlined"
            margin="normal"
            required
            fullWidth
            id="cinemaName"
            autoComplete="cinemaName"
            onChange={(event) => handleFormChange(event)}
          />
          <Field name="numberOfSeats" as={TextField} label="No. of seats" variant="outlined"
            margin="normal"
            required
            fullWidth
            id="numberOfSeats"
            autoComplete="numberOfSeats"
            onChange={(event) => handleFormChange(event)}
          />
          <Field name="ticketPrice" as={TextField} label="Ticket price per seat" variant="outlined"
            margin="normal"
            required
            fullWidth
            id="ticketPrice"
            autoComplete="ticketPrice"
            onChange={(event) => handleFormChange(event)}
          />
          <Field name="city" as={TextField} label="City" variant="outlined"
            margin="normal"
            required
            fullWidth
            id="city"
            autoComplete="city"
            onChange={(event) => handleFormChange(event)}
          />
          <Field name="postalCode" as={TextField} label="Postal code" variant="outlined"
            margin="normal"
            required
            fullWidth
            id="postalCode"
            autoComplete="postalCode"
            onChange={(event) => handleFormChange(event)}
          />
          <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneText={"Drag and drop an image here or click"}
            onChange={(files) => setFile(files[0])}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              handleSubmit()
            }}
          >
            Add cinema
          </Button>
        </Form>
      </Formik>
    </>
  )
}


// fetchaj sve cinema-e


const CinemasView = ({ cinemas }) => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  let cinemaState = useSelector(state => state.cinemaState)
  useEffect(() => {
    dispatch(getCinemas())
  }, [cinemaState]) // load cinemas 
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        {/* U ovom prikazu je forma za dodavanje novog cinema */}
        <Paper className={`${fixedHeightPaper} ${classes.Paper}`}>
          <CinemaForm />
        </Paper>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        {/* U ovom prikazu je prikaz svih kina */}
        <Paper className={`${fixedHeightPaper} ${classes.Paper}`}>
          {cinemaState.cinemas.map(cinema => 
              <CinemaCard key={cinema.id} cinema={cinema} />
          )}
        </Paper>
      </Grid>
    </Grid>
  )
}

 export default CinemasView
/* 
const mapStateToProps = state => ({
  cinemas: state.cinemaState.cinemas
});

export default connect(mapStateToProps)(CinemasView); */