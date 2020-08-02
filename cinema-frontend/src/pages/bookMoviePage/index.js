// Prvo se odabire cinema, a onda se nakon toga odabire available screening time.
// Dok lik odabere screening time, generira se popis mjesta za odabrano kino.

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { getMovieById } from '../../store/actions/movieActions'
import SeatsView from './components/SeatsView'
import Paper from '@material-ui/core/Paper';
import BookMovieForm from './components/BookMovieForm'
import Container from '@material-ui/core/Container';
import { setCurrentlySelectedMovie } from '../../store/actions/reservationProcessActions'
import ReservationSelectionInfo from './components/ReservationSelectionInfo';


const useStyles = makeStyles((theme) => ({
  wholePage: {
    backgroundImage: `url(https://image.tmdb.org/t/p/original/jb6Ju38HmKX0bYHCmAxs8HyNeJ2.jpg)`,
    backgroundSize: 'cover',
    width: '100vw',
    height: '100vh',
    color: 'white'
  },
  title: {
    color: 'white',
    fontSize: '3em',
    textTransform: 'uppercase',
    width: '70%',
    marginLeft: '1%'
  },
  subtitle: {
    fontSize: '0.9em',
    marginLeft: '1%'
  },
  summary: {
    width: '50%',
    marginLeft: '1%'
  },
  ticketsButton: {
    margin: 'auto',
    textAlign: 'center',

  },
  buttonDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '12%'
  },
  formContainer: {
    width: '50vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', 
    margin: theme.spacing(1),
    opacity: 0.9,
    backgroundBlendMode: 'screen',
    backgroundColor: 'white',
  },
  form: {
  },
  formControl: {
    display: 'block',
    margin: theme.spacing(1),
    minWidth: '100%'
  },
  bookMovieFormContainer: {
    display: 'flex',
    width: '90%',
    justifyContent: 'center'
  }
}));


const BookMoviePage = (props) => {
  // film je u parametru id
  const selectedMovieId = props.match.params.id;
  
  console.log(selectedMovieId)
  const dispatch = useDispatch();
  const [isBusy, setIsBusy] = useState(true);
  const classes = useStyles();
  const selectedMovie = useSelector(state => state.movieState.selectedMovie)
  dispatch(setCurrentlySelectedMovie(selectedMovieId))
  const selectedCinema = useSelector(state => state.reservationProcessState.selectedCinema)
  const selectedScreeningTime = useSelector(state => state.reservationProcessState.currentReservation.screeningTime_id)
  useEffect(() => {
    const fetchRequiredData = async () => {
      await dispatch(getMovieById(selectedMovieId)) // ovaj action bu postavil selectedMovie state varijablu
      setIsBusy(false)
    }
    fetchRequiredData()
  }, [])
  const randomBackdropImage = {
    backgroundImage: `url(${selectedMovie != null && selectedMovie.backdropImage})`
  }


  if (isBusy) {
    return null
  } else return (
    <div className={classes.wholePage} style={randomBackdropImage}>
      <Typography component="h1" className={classes.title}>
        {selectedMovie.title}
      </Typography>
      <Typography component="h4" className={classes.subtitle}>
        Released on {new Date(selectedMovie.releaseDate).toDateString()}
      </Typography>
      <Typography component="h5" className={classes.subtitle}>
        <b>Actors: {selectedMovie.actors}</b>
      </Typography>
      <Typography component="h6" className={classes.subtitle}>
        <b>{selectedMovie.genre.toLowerCase()}</b>
      </Typography>
      <Typography component="h6" className={classes.summary}>
        {selectedMovie.summary}
      </Typography>
      <Container fixed className={classes.bookMovieFormContainer}>
        <Paper elevation={3} className={classes.formContainer}>
          {selectedMovie != null && <BookMovieForm 
            classes={classes} 
            selectedMovie={selectedMovie} 
          /> }
        </Paper>
        { selectedScreeningTime != null && 
          <Paper elevation={3} className={classes.formContainer}>
            <ReservationSelectionInfo /> 
          </Paper> 
        }
      </Container>
      { selectedCinema != null && <SeatsView selectedScreeningTime={selectedScreeningTime} /> } {/* ako smo odabrali parametre, mozemo renderirati seatsview */}
      
    </div>
  )
}

export default BookMoviePage