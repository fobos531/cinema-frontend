import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia'
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { deleteCinema } from '../../../../store/actions/cinemaActions'

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '30.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}))

const CinemaCard = ({ cinema }) => {
  const dispatch = useDispatch();
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={`${cinema.image}`}
        title="Cinema image"
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {`${cinema.name}`}
        </Typography>
        <Typography>
          {`${cinema.postalCode}, ${cinema.city}`}
        </Typography>
        <IconButton onClick={() => dispatch(deleteCinema(cinema.id))}>
          <DeleteIcon />
        </IconButton>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  )
}

export default CinemaCard