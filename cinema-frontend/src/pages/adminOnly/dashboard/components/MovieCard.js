import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia'
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { deleteMovie } from '../../../../store/actions/movieActions'
import { useDispatch } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';

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

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch()
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={`${movie.backdropImage}`}
        title="Movie image"
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {`${movie.title}`}
        </Typography>
        <Typography>
          {`${new Date(movie.releaseDate).getFullYear()}`}
        </Typography>
        <IconButton onClick={() => dispatch(deleteMovie(movie.id))}>
          <DeleteIcon />
        </IconButton>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  )
}

export default MovieCard