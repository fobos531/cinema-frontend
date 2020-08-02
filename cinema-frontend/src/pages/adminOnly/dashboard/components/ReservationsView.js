// Movie forma funkcionira na nacin da upisem ime filma. Napravil bum API request prema OMDB API-u i zel si one podatke koji mi trebaju za bazu.
// Osim IMDB id filma, v movie formu ide i slika koja se bude koristila kak cover art na drugim stranicama


import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { getReservations } from '../../../../store/actions/reservationsActions'
import ReservationsTable from './ReservationsTable'


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

// fetchaj sve movieje

const ReservationsView = () => {
  const dispatch = useDispatch()
  // fetch screening times
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  let reservations = useSelector(state => state.reservationsState.reservations)
  useEffect(() => {
     dispatch(getReservations())
  }, []) // load cinemas 
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        {/* U ovom prikazu je prikaz svih kina */}
        <Paper className={`${fixedHeightPaper} ${classes.Paper}`}>
        {/* tu bu tablcia s četiri kolone movie_id, cinema, datetime_start, datetime_end */}
        <ReservationsTable reservations={reservations} />
        </Paper>
      </Grid>
    </Grid>
  )
}


export default ReservationsView