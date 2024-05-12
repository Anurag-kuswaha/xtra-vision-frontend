import { createStyles } from '@mantine/core';
export const useStyles = createStyles(theme => ({
    wrapper: {
        background: theme.colors.background[0],
        backgroundPosition: 'right bottom',
        backgroundRepeat: 'no-repeat',
        [theme.fn.smallerThan(800)]: {
            backgroundImage: 'none'
        },
    },
    tableContainer: {
        width: '100%',
        margin: 'auto',
        [theme.fn.smallerThan(1050)]: {
            width: '95%',
            overflowX: 'scroll'
        },
    },
    table: {
        backgroundColor: theme.colors.background[0],
        width: '100%',
        margin: 'auto',
        marginTop: 20,
        marginBlock: 20,
        borderRadius: 10,
        [theme.fn.smallerThan(1050)]: {
            width: '100vw'
        },
    },
    tableHead: {
        backgroundColor: theme.colors.secondary[0],
        height: 50,

    },
    columnHeading: {
        color: 'white !important',
        fontFamily: `Light, ${theme.fontFamily}`,
        letterSpacing: 0.15,
        fontSize: '16px !important',
        textAlign: 'center !important',
        ':first-child': {
            borderTopLeftRadius: 10,
            paddingLeft: 25,
        },
        ':last-child': {
            borderTopRightRadius: 10,
        }
    },
    tableRowWhite: {
        height: 70,
        background: 'white',
        border: 'none',

    },
    tableRow: {
        height: 70,
        background: '#F1F6F6',
        border: 'none',

    },
    tableData: {
        borderTop: 'none !important',
        fontFamily: `Regular , ${theme.fontFamily}`,
        color: theme.colors.text[1],
        fontSize: '16px !important',
    },
}))