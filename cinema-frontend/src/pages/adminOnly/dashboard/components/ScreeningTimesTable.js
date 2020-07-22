import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux'
import { IconButton } from '@material-ui/core';
import { deleteScreeningTime } from '../../../../store/actions/screeningTimeActions';
const moment = require('moment')



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ScreeningTimesTable = ({ screeningTimes }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Movie</TableCell>
            <TableCell align="right">Cinema</TableCell>
            <TableCell align="right">Start time</TableCell>
            <TableCell align="right">End time</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {screeningTimes.map((screeningTime) => (
            <TableRow key={screeningTime.id}>
              <TableCell align="left">{screeningTime.movie_id.title}</TableCell>
              <TableCell align="right">{screeningTime.cinema_id.name}</TableCell>
              <TableCell align="right">{moment(screeningTime.datetime_start).format('MMMM Do YYYY, HH:mm')}</TableCell>
              <TableCell align="right">{moment(screeningTime.datetime_end).format('MMMM Do YYYY, HH:mm')}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => dispatch(deleteScreeningTime(screeningTime.id))}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ScreeningTimesTable