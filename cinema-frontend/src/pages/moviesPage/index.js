import { Parallax, Background } from 'react-parallax';
import React from 'react'
import { getMovies } from '../../store/actions/movieActions'
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: theme.spacing(1),
    opacity: 0.9,
    padding: '1%',
    backgroundBlendMode: 'screen',
    backgroundColor: 'white',
  },
  ticketsButton: {
    opacity: 1,
  }
}));



const MoviesPage = () => {

  const dispatch = useDispatch()
  const classes = useStyles();
  // trebam dohvatiti listu movieja
  dispatch(getMovies())
  const allMovies = useSelector(state => state.movieState.movies)
  return (
    <div>
      {allMovies.map(movie => {
        return (
          <Parallax
            key={movie.id}
            bgImage={`${movie.backdropImage}`}
            bgImageAlt="movie backdrop image"
            strength={200}
          >
            <Paper elevation={3} className={classes.formContainer}>
              <Typography component="h1">
                <b>{movie.title}</b>
              </Typography>
              <Typography component="h4">
                Released on {new Date(movie.releaseDate).toDateString()}
              </Typography>
              <Typography component="h5">
                Actors: {movie.actors}
              </Typography>
              <Typography component="h6">
                Genres: {movie.genre.toLowerCase()}
              </Typography>
              <Typography component="h6">
                {movie.summary}
              </Typography>
              <Link to={`/movie/book/${movie.id}`}>
                <Button type="button" variant="contained" color="primary" className={classes.ticketsButton}>
                  Buy tickets
                </Button>
              </Link>
            </Paper>

            {/* Put some text content here - even an empty div with fixed dimensions to have a height
            for the parallax. */}
            <div style={{ height: '80vh' }} />
          </Parallax>
        )
      })}
    </div>
  )
}

export default MoviesPage