import { createStyles, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  wrapper: {
    height: "100vh",
    backgroundSize: 'cover',

    [theme.fn.smallerThan('sm')]: {
      padding: 20,
      paddingBottom: 250
    },
    margin: 0,
    padding: 50,
    paddingLeft: 140,
    paddingRight: 90,
    paddingBottom: 197
  },
  header: {
    textAlign: 'left',
    fontSize: 40,
    fontWeight: 900,
    color: theme.colors.primary[0],
    marginBottom: 50,
  },

  form: {
    width: 500,
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
    backgroundColor: 'transparent'
  },

  formContainer: {
    display: "flex",
    flexDirection: "column"
  },


  actionButton: {
    width: 120,
    fontSize: 16,
    backgroundColor: `${theme.colors.primary[0]}`,
    [theme.fn.smallerThan(600)]: {
      width: '100%',
      textAlign: 'center'
    }
  },
  loader: {
    position: 'fixed',
    top: '50%',
    left: '40%',
    zIndex: '1000',

    [theme.fn.largerThan('xs')]: {
      left: '23%',

    }
  }

}));
export default useStyles;