import { Box, Button } from '@mantine/core';
import { useStyles } from './style';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { properties } from './properties';
import { Outlet } from "react-router-dom";
import logoUrl from '../../assets/images/companyLogo.svg'
import { handleLogOut } from '../../Utils/const';
const Header = ({ }) => {
    const { classes } = useStyles(useStyles);
    const navigate = useNavigate();
    return (
        <>
            <Box className={classes.wrapperContainer}>
                <Box className={classes.wrapper}>
                <Link to='/dashboard'>  <img className={classes.logo} src={logoUrl} alt='xtra logo' /> </Link>
                    <Box className={classes.linksAndUser}>
                        <Box className={classes.links}>
                            {properties.links.map(element => {
                                return <NavLink className={({ isActive, isPending }) => isActive ? classes.activeLink : classes.link} to={element.link} >{element.title}</NavLink>
                            })}
                        </Box>
                        <Button color='secondary.0' onClick={() => { handleLogOut(); navigate('/') }}>Logout</Button>

                    </Box>
                </Box>
            </Box>
            <Outlet />
        </>
    );
}


export default Header;