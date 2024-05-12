
import { Grid, Button, Box } from '@mantine/core';
import React, { lazy, useRef } from 'react';
import { Link } from 'react-router-dom';
import FeatureCarousel from '../../Components/FeatureCarousel'
import useStyles from './style';
import { getUserType } from '../../Utils/const.js';
const Header = lazy(() => import('../../Components/Header'));
function Login() {
    const { classes } = useStyles(useStyles);
    const userType = useRef(getUserType());
    return (
        <>
            {userType && userType.current == 'Host' && <Header />}
            <Grid className={classes.wrapper}>
                <Grid.Col span={12} sm={6}>
                    <Box className={classes.header}> Thank you for Joining the call</Box>
                    <Grid className={classes.left}>
                        <Grid.Col span={12}>
                            <Link to={userType && userType && userType.current == 'Host' ? '/list' : '/signup'}>
                                <Button
                                    type="submit"
                                    mt="xl"
                                    mb="lg"
                                    radius="xl"
                                    ta="right"
                                    size="lg"
                                    variant="filled"
                                    className={classes.actionButton}>
                                    {userType && userType.current == 'Host' ? 'view Meeting Stats' : 'start instant meeting'}
                                </Button>
                            </Link>
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
                <Grid.Col span={12} sm={6}>
                    <FeatureCarousel />
                </Grid.Col>
            </Grid>
        </>
    );
}
export default Login;
