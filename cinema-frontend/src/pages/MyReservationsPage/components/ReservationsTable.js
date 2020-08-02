import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import Rating from '@material-ui/lab/Rating';
import reservationService from '../../../services/reservations'
import { rateReservation } from '../../../store/actions/reservationsActions'
import { useDispatch } from 'react-redux'

const moment = require('moment')

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const ReservationsTable = ({ reservations }) => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const columns = ["Movie", "Cinema", "Seats", "Starts at", "Ends at", "Total price", {
    name: "Rate movie",
    options: {
      filter: false,
      sort: false,
      empty: true,
      customBodyRenderLite: (dataIndex) => {
        return (
          <Rating 
            defaultValue={reservations[dataIndex].ownRating ? reservations[dataIndex].ownRating : 0} 
            readOnly={reservations[dataIndex].ownRating ? true : false}
            max={5}
            name={reservations[dataIndex].id}
            onChange={ async (event, value) => {
              // tu bum rateal
              dispatch(rateReservation(reservations[dataIndex].id, value))
            }}
          />
        );
      }
    }
  },];
  const data = []
  reservations.map(reservation => {
    console.log(reservation)
    
    let seatsString = reservation.seats.map(seat => seat.seat_name).join(", ");
    data.push([reservation.screeningTime_id.movie_id.title, reservation.screeningTime_id.cinema_id.name, seatsString,
      moment(reservation.screeningTime_id.datetime_start).format('MMMM Do YYYY, HH:mm'),
      moment(reservation.screeningTime_id.datetime_end).format('MMMM Do YYYY, HH:mm'),
      `$${reservation.totalPrice}`])
  })
  console.log(data)
  const options = {
    filterType: 'checkbox',
    selectableRows: 'none',
    downloadOptions: {
      filename: 'MyReservations.csv',
      separator: ';'
    }
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