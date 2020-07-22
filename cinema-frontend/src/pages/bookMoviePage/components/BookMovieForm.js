import React, {useState} from 'react'
import { Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
const moment = require('moment')

const BookMovieForm = React.forwardRef(({ classes, selectedMovie, setSelectedParameters }) => {
  // trebamo fetchat cinemae i screening timese
  const [selectedCinema, setSelectedCinema] = useState('')
  const [selectedScreeningTime, setSelectedScreeningTime] = useState('')
  const handleCinemaChange = (event) => {
    setSelectedCinema(event.target.value)
  }
  const handleScreeningTimeChange = (event) => {
    setSelectedScreeningTime(event.target.value)
  }
  const handleSubmit = () => {
    setSelectedParameters({
      selectedCinema,
      selectedScreeningTime
    })
  }
  return (
    <>
      <h1>
        Book a movie reservation
      </h1>
      <form className={classes.form}>

        <FormControl id="cinemaSelector" className={classes.formControl}>
          <InputLabel id="cinemaLabel">{selectedMovie.cinemas.length == 0 ? "No cinemas available" : "Cinema:"}</InputLabel>
          <Select
            labelId="cinemaLabel"
            id="cinemaSelect"
            value={selectedCinema}
            disabled={selectedMovie.cinemas.length == 0 ? true : false}
            onChange={handleCinemaChange}
          >
            {selectedMovie.cinemas.map(cinema =>
              <MenuItem key={cinema.id} value={cinema.id}>{cinema.name}</MenuItem>
            )}
          </Select>
        </FormControl><br></br>
        <FormControl id="screeningTimeSelector" className={classes.formControl}>
          <InputLabel id="screeningTimeLabel">{selectedMovie.screeningTimes.length == 0 ? "No screening times available" : "Screening time:"}</InputLabel>
          <Select
            labelId="screeningTimeLabel"
            id="screeningTimeSelect"
            value={selectedScreeningTime}
            disabled={selectedMovie.screeningTimes.length == 0 ? true : false}
            onChange={handleScreeningTimeChange}
          >
            {selectedMovie.screeningTimes.map(screeningTime =>
              <MenuItem key={screeningTime.id} value={screeningTime.id}>{moment(screeningTime.datetime_start).format('MMMM Do YYYY, HH:mm')}</MenuItem>
            )}
          </Select>
        </FormControl>
        <Button
          type="button"
          variant="contained"
          color="primary"
          disabled={selectedMovie.screeningTimes.length == 0 ? true : false}
          className={classes.formControl}
          onClick={() => {
            handleSubmit()
          }}
        >
          Select
        </Button>
      </form>
    </>
  )
})

export default BookMovieForm