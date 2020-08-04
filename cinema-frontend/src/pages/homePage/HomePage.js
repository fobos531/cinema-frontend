import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typist from 'react-typist'
import YoutubeBackground from 'react-youtube-background'
import zIndex from '@material-ui/core/styles/zIndex';


const useStyles = makeStyles((theme) => ({
  wholePage: {
  //  backgroundColor: `#333333`,
    color: 'white',
    fontSize: '5em',
    pointerEvents: "none",
    zIndex:1,
  },
  container: {
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    postion: 'relative',
  },
  typist: {
    position: "absolute",
    marginLeft: "auto",
    top: "50%",
    left:"50%",
    transform: "translate(-50%, -50%)",
    zIndex:2,
    color: 'white',
    fontSize: '5em'
  }  
}));
const HomePage = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
    <iframe
    title="youtube background"
    src="http://www.youtube-nocookie.com/embed/bkATwnWpWK4?autoplay=1&controls=0&showinfo=0&mute=1&loop=1&playlist=bkATwnWpWK4"
    className={classes.wholePage}
    frameborder="0" height="100%" width="100%"
    >
   
    </iframe>

    <Typist
     avgTypingDelay={60}
     startDelay={1000}
     className={classes.typist}
   >
     <span>Welcome to our Cinema!</span>
     <Typist.Backspace count={22} delay={200} />
     <span>Start by clicking the "Movies" tab above.</span>
     <Typist.Backspace count={71} />
     <span>Enjoy your stay!</span>
   </Typist>
 
   </div>
  )
}

export default HomePage