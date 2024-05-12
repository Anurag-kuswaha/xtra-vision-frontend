import {BrowserRouter} from 'react-router-dom';
import {  Suspense } from 'react';
import { MantineProvider, Box ,Loader, createStyles} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import './App.css';
import Routes from './Routes.jsx';
const themeConfiguration = () => {
  return {
    colorScheme: 'light',
    colors: {
      primary: ['#00D095'],
      secondary: ['#1D5E6D'],
      tertiary: ['#E1F4F5'],
      error: ['#ED2424'],
      background: [
        '#E3F0ED',
        '#EDF2F3',
        '#F8F8FA',
        '#FFE9E9',
        '#D5F3B7',
        '#F7F9FA',
      ],
      outline: ['#B3E7D8', '#BCCACD', '#D9E2E4', '#FCD9D9'],
      text: ['#2C2C30', '#616161', '#E6E6E6', '#000000', '#84AABA', '#FC5858', '#64B216','F5DBDB'],
      red: [
        '#FFF5F5',
        '#FFE3E3',
        '#FFC9C9',
        '#FFA8A8',
        '#FF8787',
        '#FF6B6B',
        '#ED2424',
        '#F03E3E',
        ' #E03131',
        '#C92A2A',
      ],
      white: ['#ffffff'],
      disabledBtn: ['#9C9C9C', '#DBDBDB'],
    },

    shadows: {
      md: '1px 1px 3px rgba(0, 0, 0, .25)',
      xl: '5px 5px 3px rgba(0, 0, 0, .25)',
    },

    headings: {
      fontFamily: 'Roboto, sans-serif, Poppins',
      sizes: {
        h1: { fontSize: '2rem' },
      },
    },
    theme: {
      components: {
        InputWrapper: {
          styles: (theme) => ({
            label: {
              backgroundColor: '#D6EBF0',
            },
          }),
        },

        Input: {
          styles: (theme) => ({
            input: {
              background: '0 0',
              borderBottom: '1px solid black',
              padding: '0.6rem 0',
              color: '#fff',
            },
          }),
        },
      },
    },
  };
};
const useStyles = createStyles((theme) => ({
  loaderWrapper: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    alignContent: 'center',
    width: '100vw',
    height: '100vh',
    zIndex: '99999',
  },
  
    }))
function App() {
  const { classes } = useStyles(useStyles);
  return (
    <Suspense fallback={ <Box className={classes.loaderWrapper}> <Loader className={classes.loader} variant="dots" color="#00D095" size="10rem" /> </Box>}>
    <MantineProvider
   
    theme={themeConfiguration()}
  >
    <BrowserRouter>
    <div className="App">
      <Notifications position="top-center" zIndex={10002}/>
      <Routes/>
    </div>
    </BrowserRouter>
    </MantineProvider>
    </Suspense>
  );
}

export default App;
