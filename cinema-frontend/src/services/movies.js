import axios from 'axios'
const baseUrl = '/api/movies'

const addMovie = async (newMovie) => {
  console.log(newMovie)
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  }
  await axios.post(baseUrl, newMovie, config)
  // return response.data; not needed for now
}

const allMovies = async () => {
  const response = await axios.get(baseUrl)
  return response.data; // array objekata od kojih svaki predstavlja jedno kino
}


const deleteMovie = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data; // array objekata od kojih svaki predstavlja jedno kino
}

const getMovieById = async (id) => {
  console.log(`${baseUrl}/${id}`)
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

export default { addMovie, allMovies, deleteMovie, getMovieById }