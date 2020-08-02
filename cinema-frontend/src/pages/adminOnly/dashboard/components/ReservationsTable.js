import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import MUIDataTable from "mui-datatables";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ReservationsTable = ({ reservations }) => {
  const classes = useStyles();
  const columns = ["User", "Seats", "Total price"];
  const data = []
  reservations.map(reservation => {
    let seatsString = reservation.seats.map(seat => seat.seat_name).join(", ");
    data.push([reservation.user_id.name, seatsString, `$${reservation.totalPrice}`])
  })
  console.log(data)
  const options = {
    filterType: 'checkbox',
    selectableRows: false,
  };
  return (
    <MUIDataTable
      title={"Reservations"}
      data={data}
      columns={columns}
      options={options}
    />
  );
}

export default ReservationsTable