import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import MUIDataTable from "mui-datatables";
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ReservationsTable = ({ reservations }) => {
  const classes = useStyles();
  const columns = ["User", "Movie", "Cinema", "Seats", "Total price", {
    name: "User rating",
    options: {
      filter: false,
      sort: false,
      empty: true,
      customBodyRenderLite: (dataIndex) => {
        return (
          <Rating 
            defaultValue={reservations[dataIndex].ownRating ? reservations[dataIndex].ownRating : 0} 
            readOnly={true}
            max={5}
            name={reservations[dataIndex].id}
          />
        );
      }
    }
  },];
  const data = []
  reservations.map(reservation => {
    let seatsString = reservation.seats.map(seat => seat.seat_name).join(", ");
    console.log(reservation)
    data.push([reservation.user_id.name,reservation.screeningTime_id.movie_id.title,reservation.screeningTime_id.cinema_id.name, seatsString, `$${reservation.totalPrice}`])
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