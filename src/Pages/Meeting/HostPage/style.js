import { createStyles} from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: "100vh",
    width: "100vw",
    backgroundSize: 'cover',
    position: 'relative',
    margin: 0,
    padding: 0,
    backgroundColor:'white'
  },
  wrapperBlack:{
    height: "100vh",
    width: "100vw",
    backgroundSize: 'cover',
    position: 'relative',
    margin: 0,
    padding: 0,
    backgroundColor:'black',
    '.mantine-uqgk8m':{
      border:'4px solid white',
    }

  },
  showTimer:{
    position:'absolute',
    top:'45%',
    left:'43%',
    displayl: 'flex',
    background: theme.colors.error[0],
    color:'white',
    fontSize:30,
    fontWeight:600,
    padding:5,
    zIndex:1000,
    borderRadius: 40,
    [theme.fn.smallerThan(567)]: {
      left:'28%',
    },

  },
  participantWrapper: {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(48%, 1fr))',
    gridAutoRows: 'auto',
    gap: 5,
    justifyItems: 'center',
    // overflow: 'scroll'

  },
  participant: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#000',
    width: '100% !important',
    height: '100%',
    maxWidth: '100%',
    position: 'relative',
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
  },
  hostDetailsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    zIndex: 1005,
    width: '100%',
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
  },
  handRaised:{
    width:50,
    height:50,
    position:'absolute',
    top:'20%',
    right:'30%',
  }
}));
export default useStyles;