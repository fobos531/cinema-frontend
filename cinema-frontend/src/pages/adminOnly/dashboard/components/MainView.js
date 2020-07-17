import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import TotalUsers from './TotalUsers'
import userService from '../../../../services/users'

//get through props
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

const MainView = () => {
  const classes = useStyles();
  const [totalUsers, setTotalUsers] = useState();
  useEffect(() => {
    const fetchData = async () => {
      let count = (await userService.totalUsers()).total;
      setTotalUsers(count);
    }
    fetchData()
  }, [])
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>

        </Paper>
      </Grid>
      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <TotalUsers count={totalUsers} />
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper className={classes.paper}>

        </Paper>
      </Grid>
    </Grid>
  )
}

export default MainView