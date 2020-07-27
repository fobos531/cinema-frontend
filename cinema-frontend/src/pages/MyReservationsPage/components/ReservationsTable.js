import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
const moment = require('moment')

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ReservationsTable = ({ reservations }) => {
  const classes = useStyles();
  const columns = ["Movie", "Cinema", "Seats", "Starts at", "Ends at", "Total price"];
  const data = []
  reservations.map(reservation => {
    console.log(reservation)
    
    let seatsString = reservation.seats.map(seat => seat.seat_name).join(", ");
    data.push([reservation.screeningTime_id.movie_id.title, reservation.screeningTime_id.cinema_id.name, seatsString,
      moment(reservation.screeningTime_id.datetime_start).format('MMMM Do YYYY, HH:mm'),
      moment(reservation.screeningTime_id.datetime_end).format('MMMM Do YYYY, HH:mm'),
      reservation.totalPrice])
  })
  console.log(data)
  const options = {
    filterType: 'checkbox',
    selectableRows: false,
  };
  return (
    <MUIDataTable
      title={"My reservations"}
      data={data}
      columns={columns}
      options={options}
    />
  );
}

export default ReservationsTable