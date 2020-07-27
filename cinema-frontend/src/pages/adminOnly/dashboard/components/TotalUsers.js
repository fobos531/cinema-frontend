
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';



const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

const TotalUsers = ({ count }) => {
  const classes = useStyles();
  return (
    <>
      <Title>Total users</Title>
      <Typography component="p" variant="h5">
         {count} users
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        since 10 July, 2020
      </Typography>
    </>
  );
}
export default TotalUsers