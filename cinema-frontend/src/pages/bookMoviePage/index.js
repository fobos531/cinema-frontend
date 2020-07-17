import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { getMovieById } from '../../store/actions/movieActions'
import { Link } from 'react-router-dom'

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
  }
  
}));


const BookMoviePage = (props) => {
  // film je u parametru id
  const selectedMovieId = props.match.params.id;
  const dispatch = useDispatch();
  const [isBusy, setIsBusy] = useState(true);
  const classes = useStyles();
  const selectedMovie = useSelector(state => state.movieState.selectedMovie)
  useEffect(() => {
    const fetchselectedMovie = async () => {
       await dispatch(getMovieById(selectedMovieId))
       setIsBusy(false)
    }
    fetchselectedMovie()
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
        <Typography component="h5">
          Actors: {selectedMovie.actors}
        </Typography>
        <Typography component="h6">
          {selectedMovie.genre.toLowerCase()}
        </Typography>
        <Typography component="h6" className={classes.summary}>
          {selectedMovie.summary}
        </Typography>
        <div className={classes.buttonDiv}>      
        </div>     
    </div>
  )
}

export default BookMoviePage