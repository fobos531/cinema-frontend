import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import miscService from '../../../services/misc'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { updateTotalPrice } from '../../../store/actions/reservationProcessActions'


const useStyles = makeStyles((theme) => ({
  formContainer: {
    width: '50vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center', 
    margin: theme.spacing(1),
    opacity: 0.9,
    backgroundBlendMode: 'screen',
    backgroundColor: 'white',
  },
}));

const ReservationSelectionInfo = () => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const currentReservation = useSelector(state => state.reservationProcessState.currentReservation); // objekt
  const selectedSeats = useSelector(state=>state.reservationProcessState.currentReservation.seats)
  const currentCinemaId = useSelector(state => state.reservationProcessState.selectedCinema) // cinema_id
  const [ currCinemaTicketPrice, setCurrCinemaTicketPrice ] = useState(0)
  useEffect(() => {
    const fetchRequiredData = async () => {
      setCurrCinemaTicketPrice(await miscService.getCinemaTicketPrice(currentCinemaId)) // ovaj action bu postavil selectedMovie state varijablu
    }
    fetchRequiredData()
    dispatch(updateTotalPrice(document.getElementById("totalPrice").innerHTML))
  }, [currentCinemaId, selectedSeats])
  // treba mi ticket price od cinema
  const filteredSelectedSeats = currentReservation.seats.filter(seat => seat.occupied == 1);
  // pri svakom updateu od componenta bude se updatal i price, a to bu globally u storeu
  const totalPrice = filteredSelectedSeats.length * currCinemaTicketPrice
  return (
    <>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">No of seats/tickets</TableCell>
            <TableCell>Total Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="left" id="noOfSeats">{filteredSelectedSeats.length}</TableCell>
            <TableCell id="totalPrice">{totalPrice}</TableCell>  
          </TableRow>      
        </TableBody>
      </Table>
    </>
  )
}

export default ReservationSelectionInfo