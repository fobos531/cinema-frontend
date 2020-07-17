import movieService from '../../services/movies'

export const getMovies = () => {
  return async dispatch => {
    const response = await movieService.allMovies();
    dispatch({ type: 'GET_MOVIES', payload: response})
  }
}

export const addNewMovie = (movieData) => {
  return async dispatch => {
    await movieService.addMovie(movieData);
    dispatch(getMovies())
  }
}

export const deleteMovie = (id) => {
  return async dispatch => {
    await movieService.deleteMovie(id)
    dispatch(getMovies())
  }
}

export const getRandomMovie = () => {
  return async dispatch => {
    const randomMovie = await movieService.getRandomMovie()
    dispatch({ type: 'GET_RANDOM_MOVIE', payload: randomMovie })
  }
}

export const getMovieById = (id) => {
  return async dispatch => {
    const selectedMovie = await movieService.getMovieById(id)
    dispatch({ type: 'GET_MOVIE_BY_ID', payload: selectedMovie })
  }
}
