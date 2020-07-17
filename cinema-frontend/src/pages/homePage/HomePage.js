import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { getRandomMovie } from '../../store/actions/movieActions'
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


const HomePage = () => {
  const dispatch = useDispatch();
  const [isBusy, setIsBusy] = useState(true);
  const classes = useStyles();
  const randomMovie = useSelector(state => state.movieState.randomMovie)
  useEffect(() => {
    const fetchRandomMovie = async () => {
       await dispatch(getRandomMovie())
       setIsBusy(false)
    }
    fetchRandomMovie()
  }, [])
  const randomBackdropImage = {
    backgroundImage: `url(${randomMovie != null && randomMovie.backdropImage})`
  } 
  if (isBusy) {
    return null
  } else return (
    <div className={classes.wholePage} style={randomBackdropImage}>
        <Typography component="h1" className={classes.title}>
          {randomMovie.title}
        </Typography>
        <Typography component="h4" className={classes.subtitle}>
          Released on {new Date(randomMovie.releaseDate).toDateString()}
        </Typography>
        <Typography component="h5">
          Actors: {randomMovie.actors}
        </Typography>
        <Typography component="h6">
          {randomMovie.genre.toLowerCase()}
        </Typography>
        <Typography component="h6" className={classes.summary}>
          {randomMovie.summary}
        </Typography>
        <div className={classes.buttonDiv}>
        <Link to={`/movie/book/${randomMovie.id}`}>
          <Button type="button" variant="contained" color="primary" className={classes.ticketsButton}>
            Buy tickets
          </Button>
        </Link>
        
        </div>     
    </div>
  )
}

export default HomePage