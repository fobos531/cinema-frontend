import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import TotalUsers from './TotalUsers'
import userService from '../../../../services/users'
import { useDispatch, useSelector } from 'react-redux'
import { getCinemas } from '../../../../store/actions/cinemaActions'
import { getMovies } from '../../../../store/actions/movieActions'
import { getReservations } from '../../../../store/actions/reservationsActions'
import Title from './Title'
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  fixedHeight: {
    height: 240,
  },
}));

const MainView = () => {
  const dispatch = useDispatch()
  const classes = useStyles();

  return (
    <Grid container spacing={3}>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h2" component="h2">
            Welcome back, {JSON.parse(localStorage.getItem('loggedUser')).name}!
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default MainView