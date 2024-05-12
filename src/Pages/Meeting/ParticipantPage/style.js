import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: "100vh",
    width: "100vw",
    backgroundSize: 'cover',
    position: 'relative',
    // margin: 0,
    padding: 0,
  },
  showTimer: {
    position: 'absolute',
    top: '5%',
    left: '43%',
    displayl: 'flex',
    background: theme.colors.error[0],
    color: 'white',
    fontSize: 30,
    fontWeight: 600,
    padding: 5,
    zIndex: 1000,
    borderRadius: 40,
    [theme.fn.smallerThan(567)]: {
      left: '28%',
    },

  },
  participantWrapper: {
    width: '19vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    justifyItems: 'center',
    backgroundColor: theme.colors.secondary[0],
    '.mantine-Carousel-root': {
      margin: 0,
      width: '100%'
    },
    '.mantine-Carousel-control': {
      zIndex: 1001
    }
  },
  participant: {
    display: 'flex',
    flex: '0 0 25%',
    justifyContent: 'center',
    backgroundColor: '#000',
    height: '150px !important',
    'h1': {
      color: theme.colors.primary[0],
      position: 'absolute',
      top: 0,
      left: 0,
      background: 'white',
      borderRadius: 30,
      marginLeft: 5,
      padding: 5,
      fontSize: 18,
    },
    marginBottom: 10,
  },
  hostWrapper: {
    width: '80vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    right: 0,
    display: 'flex',
    justifyItems: 'center',

  },
  hostDetails: {
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#000',
    'h1': {
      color: theme.colors.primary[0],
      position: 'absolute',
      bottom: 0,
      left: 10,
      background: 'white',
      borderRadius: 30,
      marginLeft: 5,
      padding: 5,
      fontSize: 18,
    },
  },
  hostDetailsWrapper: {
    display: 'flex',
    justifyContent: 'end',
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 1000,
    width: '80%',
    margin: 0,
  },
  hostFunctions: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end',
    'img': {
      cursor: 'pointer',
      margin: '0px 8px',
    }
  },
  hostTimer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end',
    color: 'white',
    'img': {
      cursor: 'pointer',
    },
  },
  timerHeading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    fontWeight: 600,
    height: 50,
  },
  timer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'white',
    color: 'black',
    borderRadius: '52%',
    width: 50,
    height: 50,
    fontSize: 25,
    fontWeight: 600,
    padding: 2,
    margin: '0px 8px',
    cursor: 'pointer',
  },
  iconWrapper: {
    background: 'grey',
  },
  hostCamera: {
    border: '2px dashed white'
  }
}));
export default useStyles;