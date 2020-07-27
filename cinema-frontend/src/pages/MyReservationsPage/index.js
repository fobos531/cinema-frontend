import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getReservationsForUser } from '../../store/actions/reservationsActions'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ReservationsTable from './components/ReservationsTable'

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
}));


const MyReservationsPage = () => {
  const dispatch = useDispatch()
  // fetch screening times
 const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  let reservations = useSelector(state => state.reservationsState.reservationsForUser)
  let loggedUserId = useSelector(state => state.authenticationState.loggedUser.id)
  useEffect(() => {
     dispatch(getReservationsForUser(loggedUserId))
  }, [reservations]) // load cinemas 
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12} lg={12}>
        <Paper className={`${fixedHeightPaper} ${classes.Paper}`}>
        <ReservationsTable reservations={reservations} />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default MyReservationsPage