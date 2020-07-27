import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typist from 'react-typist'
import YoutubeBackground from 'react-youtube-background'


const useStyles = makeStyles((theme) => ({
  wholePage: {
  //  backgroundColor: `#333333`,
    width: '100vw',
    height: '100vh',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '5em',
  },  
}));


const HomePage = () => {
  const classes = useStyles();

  return (
    <YoutubeBackground
    videoId="cySqH7j6RlI"
    overlay="rgba(0,0,0,.85)"
    className={classes.wholePage}
    playerOptions={{showinfo:0}}
    >
    <Typist
      avgTypingDelay={60}
      startDelay={1000}
      
    >
      <span>Welcome to our Cinema!</span>
      <Typist.Backspace count={22} delay={200} />
      <span>Start by clicking the "Movies" tab above.</span>
      <Typist.Backspace count={71} />
      <span>Enjoy your stay!</span>
    </Typist>
    </YoutubeBackground>
  )
}

export default HomePage