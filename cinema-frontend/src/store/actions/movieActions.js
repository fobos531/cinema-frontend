import movieService from '../../services/movies'

export const getMovies = () => {
  return async dispatch => {
    const response = await movieService.allMovies();
    dispatch({ type: 'GET_MOVIES', payload: response})
  }
}

export const addNewMovie = (movieData) => {
  return async dispatch => {
    const response = await movieService.addMovie(movieData);
    dispatch({ type: 'ADD_NEW_MOVIE', payload: response})
  }
}

export const deleteMovie = (id) => {
  return async dispatch => {
    await movieService.deleteMovie(id)
    dispatch(getMovies())
  }
}


export const getMovieById = (id) => {
  return async dispatch => {
    const selectedMovie = await movieService.getMovieById(id)
    dispatch({ type: 'GET_MOVIE_BY_ID', payload: selectedMovie })
  }
}
