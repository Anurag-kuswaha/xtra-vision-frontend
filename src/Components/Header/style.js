import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  wrapperContainer: {
    background: `linear-gradient(121.51deg, #E1F4F5 30.38%, #E1F4F5 53.04%, #D6EBF0 71.29%)`,
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: "80%",
    margin: "auto",
    height: 110,
    alignItems: 'center',
    position: "relative",
    [theme.fn.smallerThan(1400)]: {
      width: "90%",
    },
    [theme.fn.smallerThan(1050)]: {
      width: "100%",
      margin: 0,
    },
  },
  linksAndUser: {
    display: "flex",
    columnGap: 25,
    alignItems: "center",
    [theme.fn.smallerThan(1110)]: {
      paddingLeft: 10,
      paddingRight: 10,
      columnGap: 0
    },
    [theme.fn.smallerThan(1050)]: {
      columnGap: 0,
    },
    'button': {
      [theme.fn.smallerThan(581)]: {
        display: 'flex',
        position: 'absolute',
        top: 5,
        right: 10,
      },

    }
  },
  links: {
    display: "flex",
    columnGap: 30,
    paddingTop: 10,
    [theme.fn.smallerThan(1200)]: {
      columnGap: 20
    }
  },
  link: {
    fontFamily: `Medium, ${theme.fontFamily}`,
    fontSize: 20,
    textDecoration: "none",
    paddingBottom: 7,
    color: theme.colors.text[1],
    transition: '.4s',
    ":hover": {
      color: theme.colors.primary[0]
    }
  },
  activeLink: {
    fontFamily: `Medium, ${theme.fontFamily}`,
    fontSize: 20,
    textDecoration: "none",
    paddingBottom: 5,
    color: theme.colors.text[1],
    borderBottom: `1px solid ${theme.colors.primary[0]}`,
    color: theme.colors.primary[0]
  },
  logo: {
    width: 150,
    marginTop: 10,
    [theme.fn.smallerThan(1200)]: {
      width: 130,
      marginTop: 10
    }
  },
}));