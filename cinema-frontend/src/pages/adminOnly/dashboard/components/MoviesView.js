// Movie forma funkcionira na nacin da upisem ime filma. Napravil bum API request prema OMDB API-u i zel si one podatke koji mi trebaju za bazu.
// Osim IMDB id filma, v movie formu ide i slika koja se bude koristila kak cover art na drugim stranicama


import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import clsx from 'clsx';
import { DropzoneArea } from 'material-ui-dropzone'
import { Field, Form, Formik } from 'formik';
import Title from './Title'
import { useSelector, useDispatch } from 'react-redux';
import { getMovies, addNewMovie } from '../../../../store/actions/movieActions'
import MovieCard from './MovieCard'


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
    const movieData = new FormData();
    movieData.append('movieName', formData.movieName)
    movieData.append('moviePoster', file)
    dispatch(addNewMovie(movieData))
    document.getElementById("movieName").value = '';
  }
  return (
    <>
     <Title>
       ADD NEW MOVIE
     </Title>
      <Formik>
        <Form className={classes.form}>
          <Field name="movieName" as={TextField} label="Movie name" variant="outlined"
            margin="normal"
            required
            fullWidth
            id="movieName"
            autoComplete="movieName"
            onChange={(event) => handleFormChange(event)}
          />
          <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneText={"Drag and drop movie poster here or click"}
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
            Add movie
          </Button>
        </Form>
      </Formik>
    </>
  )
}


// fetchaj sve cinema-e


const MoviesView = () => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  let movieState = useSelector(state => state.movieState)
  useEffect(() => {
    dispatch(getMovies())
  }, [movieState]) // load movies once

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12} lg={12}>
        {/* U ovom prikazu je forma za dodavanje novog cinema */}
        <Paper className={`${fixedHeightPaper} ${classes.Paper}`}>
          <CinemaForm />
        </Paper>
        <Paper className={`${fixedHeightPaper} ${classes.Paper}`}>
        {movieState.movies && movieState.movies.map(movie => 
              <MovieCard key={movie.id} movie={movie} />
        )}
        </Paper>
      </Grid>
    </Grid>
  )
}


export default MoviesView