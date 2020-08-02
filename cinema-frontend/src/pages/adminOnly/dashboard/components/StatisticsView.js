import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import TotalUsers from './TotalUsers'
import userService from '../../../../services/users'
import movieService from '../../../../services/movies'
import { useDispatch, useSelector } from 'react-redux'
import { getCinemas } from '../../../../store/actions/cinemaActions'
import { getMovies } from '../../../../store/actions/movieActions'
import { getReservations } from '../../../../store/actions/reservationsActions'
import Title from './Title'
import Typography from '@material-ui/core/Typography';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';



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
}));

const StatisticsView = () => {
  const [movData, setMovData] = useState([]);
  const data = movData;
  const dispatch = useDispatch()
  const classes = useStyles();
  const [totalUsers, setTotalUsers] = useState();

  useEffect(() => {
    const fetchData = async () => {
      let count = (await userService.totalUsers()).total;
      const moviesData = await movieService.moviesRated()
      setMovData(moviesData)
      setTotalUsers(count);
      dispatch(getCinemas()) // get all cinemas
      dispatch(getMovies())
      dispatch(getReservations())
    }
    fetchData()
  }, [])
  console.log("movie data", movData)
  const cinemas = useSelector(state => state.cinemaState.cinemas)
  const movies = useSelector(state => state.movieState.movies)
  const reservations = useSelector(state => state.reservationsState.reservations)

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Grid container spacing={3}>

      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          <Title>Total cinemas: {cinemas.length}</Title>
          <Title>Total movies: {movies.length}</Title>
          <Title>Total reservations: {reservations.length}</Title>
        </Paper>
      </Grid>

      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <TotalUsers count={totalUsers} />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper className={classes.paper}>
          Ratings of movies
         
          <BarChart width={730} height={250} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Summed rating" fill="#8884d8" />
          </BarChart>
       
        </Paper>
      </Grid>
    </Grid>
  )
}

export default StatisticsView