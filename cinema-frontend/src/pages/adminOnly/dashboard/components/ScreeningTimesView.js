import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import clsx from 'clsx';

import { Field, Form, Formik } from 'formik';
import Title from './Title'
import { useSelector, useDispatch } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { getScreeningTimes, addNewScreeningTime } from '../../../../store/actions/screeningTimeActions'

import ScreeningTimesTable from './ScreeningTimesTable'

// stuff for table



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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ScreeningTimeForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const movieState = useSelector(state => state.movieState)
  const cinemaState = useSelector(state => state.cinemaState)
  const [selectedMovie, setSelectedMovie] = useState('')
  const [selectedCinema, setSelectedCinema] = useState('')
  const [formData, setFormData] = useState({});
  const handleFormChange = event => {
    setFormData({ ...formData, [event.target.id]: event.target.value })
    console.log(formData)
  }
  const handleSubmit = async () => {
    const screeningTimeData = {
      movie: selectedMovie,
      cinema: selectedCinema,
      datetime_start: formData.datetime_start,
      datetime_end: formData.datetime_end
    }
    dispatch(addNewScreeningTime(screeningTimeData))
  }
  const handleMovieChange = (event) => {
    setSelectedMovie(event.target.value)
  }
  const handleCinemaChange = (event) => {
    setSelectedCinema(event.target.value)
  }
  return (
    <>
      <Title>
        ADD NEW SCREENING TIME
     </Title>
      <form>
        
          <FormControl id="movieSelector" className={classes.formControl}>
            <InputLabel id="movieLabel">Movie</InputLabel>
            <Select
              labelId="movieLabel"
              id="movieSelect"
              value={selectedMovie}
              onChange={handleMovieChange}
            >
              {movieState.movies.map(movie => 
                 <MenuItem key={movie.id} value={movie.id}>{movie.title}</MenuItem>
              )}
            </Select>
          </FormControl><br></br>
          <FormControl id="cinemaSelector" className={classes.formControl}>
            <InputLabel id="cinemaLabel">Cinema</InputLabel>
            <Select
              labelId="cinemaLabel"
              id="cinemaSelect"
              value={selectedCinema}
              onChange={handleCinemaChange}
            >
              {cinemaState.cinemas.map(cinema =>
                  <MenuItem key={cinema.id} value={cinema.id}>{cinema.name}</MenuItem>
              )}
            </Select>
          
          </FormControl>
          <TextField name="datetime_start" variant="outlined"
            type="datetime-local"
            margin="normal"
            required
            fullWidth
            id="datetime_start"
            autoComplete="datetime_start"
            onChange={(event) => handleFormChange(event)}
          />
          <TextField name="datetime_end" variant="outlined"
            margin="normal"
            type="datetime-local"
            required
            fullWidth
            id="datetime_end"
            autoComplete="datetime_end"
            onChange={(event) => handleFormChange(event)}
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
            Add screeening time
          </Button>
        
      </form>
    </>
  )
}





const ScreeningTimesView = () => {
  const dispatch = useDispatch()
  // fetch screening times
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  let screeningTimeState = useSelector(state => state.screeningTimeState.screening_times)
  useEffect(() => {
     dispatch(getScreeningTimes())
  }, []) // load cinemas 
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        {/* U ovom prikazu je forma za dodavanje novog cinema */}
        <Paper className={`${fixedHeightPaper} ${classes.Paper}`}>
          <ScreeningTimeForm />
        </Paper>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        {/* U ovom prikazu je prikaz svih kina */}
        <Paper className={`${fixedHeightPaper} ${classes.Paper}`}>
        {/* tu bu tablcia s četiri kolone movie_id, cinema, datetime_start, datetime_end */}
        <ScreeningTimesTable screeningTimes={screeningTimeState} />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ScreeningTimesView
