import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles';
import { getSeatsForSelectedScreeningTime,
         setOccupiedSeats,
         setPickedSeats,
         setOrderId, 
} from '../../../store/actions/reservationProcessActions'
import { useSelector, useDispatch } from 'react-redux'
import { styled } from '@material-ui/core/styles';
import { compose, spacing, palette } from '@material-ui/system';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import BookedReservationDialog from './BookedReservationDialog';
import reservationService from '../../../services/reservations'
import PaypalButton from '../../../components/PaypalButton'


const Box = styled('div')(compose(spacing, palette));


const useStyles = makeStyles(theme => ({
  seat: {
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.7)',
    borderRadius: 2,
    fontWeight: 600,
    '&:hover': {
      background: 'rgb(120, 205, 4)'
    },
    display: 'inline-block',
    height: '20%',
  },
  row: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  seatContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  allSeatsContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  seatInfoContainer: {
    width: '100%',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#eee'
  },
  seatInfoLabel: {
    display: 'inline-block',
    width: 13,
    height: 10,
    padding: '2%'
  },
  seatInfo: {
    margin: '8px',
  },
  occupiedDisabledSeat: {
    pointerEvents: 'none'
  },
  makeReservationButton: {
    display: 'inline-block',
    whiteSpace: 'no-wrap',
    margin: '3%'
  }
}))

const SeatsView = ({ selectedScreeningTime }) => {
  const currentScreeningTime = useSelector(state => state.reservationProcessState.currentReservation.screeningTime_id)

  const dispatch = useDispatch()
  // did user pay?
  const [paid, setPaid] = useState(false)
  // state za cijelu rezervaciju
  const reservationObject = useSelector(state => state.reservationProcessState.currentReservation)
  //state za dialog
  const [dialogDisplayed, setDialogDisplayed] = useState(false)
  // trebam dohvatiti seatse (globalni state)
  const seats = useSelector(state => state.reservationProcessState.seatsForSelectedScreeningTime);
  // ovdje spremam local state za seatse 
  const [localSeats, setLocalSeats] = useState([])
  const [finishedReservation, setFinishedReservation] = useState(null)
  const classes = useStyles();
  useEffect(() => {
    const fetchRequiredData = async () => {
      await dispatch(getSeatsForSelectedScreeningTime(selectedScreeningTime))
    }
    fetchRequiredData()
  }, [currentScreeningTime])

  useEffect(() => {
    if (seats.length != 0) setLocalSeats(seats)
  }, [seats])

  
 
  // moram napravit array of arrayova, svaki element outer arraya predstavlja jedan row, a unutar njega imam respective seatse
  let rowedSeats = [];
  let oneRow = []
  for (let i = 0; i < seats.length; i++) {
    if (i == 0) {
      oneRow.push(seats[i])
      continue
    }
    if (i % 7 == 0) { // pretpostavljamo da svaki red ima 7 sjedala, nakon 7 sjedala predji u novi red
      rowedSeats.push(oneRow);
      oneRow = []
      oneRow.push(seats[i])
      continue;
    }
    oneRow.push(seats[i]);
  }
  if (oneRow != []) rowedSeats.push(oneRow);
  const toggleSeatOccupiedStatus = (id) => {
    console.log(document.getElementById("totalPrice").textContent)
    const seatToToggle = localSeats.find(seat => seat.id == id);
    if (seatToToggle.occupied == 0) { // postavi status na selected
      seatToToggle.occupied = 1
    } else seatToToggle.occupied = 0
    setLocalSeats(localSeats.map(seat => seat.id == id ? seatToToggle : seat))
  //  dispatch(updateTotalPrice(document.getElementById("totalPrice").innerHTML))

    dispatch(setPickedSeats(localSeats))
    // moram i updatati total price u storeu
  }
  console.log("rowed seats", rowedSeats)
  
  const pickedSeats = localSeats.filter(seat => seat.occupied == 1)
  console.log("picked seats", pickedSeats)
  console.log("finishedReservation", finishedReservation)
  return (
    <>
      {/* Renderiranje sjedala */}
      <Grid container spacing={4} className={classes.allSeatsContainer}>
        {rowedSeats.length > 0 &&
          rowedSeats.map((seatRow, rowIndex) => (
            <Grid key={rowIndex} container item spacing={5} className={classes.row}>
              {seatRow.map(seat => (
                <Box
                  key={`seat-${seat.id}`}
                  width="75%"
                  margin={2}
                  onClick={() => toggleSeatOccupiedStatus(seat.id)}
                  className={`${classes.seat} ${seat.occupied == 2 ? classes.occupiedDisabledSeat : ""}`}
                  bgcolor={
                    seat.occupied == 2
                      ? 'rgb(228, 0, 0)' :
                      seat.occupied == 1 ?
                        'rgb(120, 205, 4)' : 'rgb(96, 93, 169)'
                  }>
                  {seat.seat_name}
                </Box>
              ))}

            </Grid>
          ))
        }
        {!paid && <PaypalButton
            amount={reservationObject.totalPrice}
            currency={'USD'}
            onSuccess={(details, data) => {
              setPaid(true)
              // save transaction
              dispatch(setOrderId(data.orderID))
            }}
        />}
        {paid && <Button
          type="button"
          variant="contained"
          color="primary"
          className={classes.makeReservationButton}
          onClick={ async () => {
            let seatsToSubmit = localSeats.map(seat => {
              if (seat.occupied == 1) seat.occupied = 2
              return seat
            })
            dispatch(setOccupiedSeats(selectedScreeningTime, seatsToSubmit))
            // sad saveaj rezervaciju
            const reservation = await reservationService.saveReservation({...reservationObject, pickedSeats})
            setFinishedReservation(reservation)
            setDialogDisplayed(true)
          }}
          >
          Finish reservation
        </Button>}
        
        {dialogDisplayed && finishedReservation != null && 
          <BookedReservationDialog initialOpenState={true} finishedReservation={finishedReservation} /> 
          } 
      </Grid>
      {/* Tu dolje morem staviti legendu*/}
      <Grid container className={classes.seatContainer}>
          <Grid item className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: 'rgb(96, 93, 169)' }}></div>
              Available seat 
          </Grid>
          <Grid item className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: 'rgb(228, 0, 0)' }}></div>
              Occupied Seat
            </Grid>
          <Grid className={classes.seatInfo}>
           <div
              className={classes.seatInfoLabel}
              style={{ background: 'rgb(120, 205, 4)' }}></div>
              Selected Seat
          </Grid>
      </Grid>
    </>
  )
}

export default SeatsView