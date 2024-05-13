
import { Grid, Input, PasswordInput, Button, Box } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import { Link , useNavigate} from 'react-router-dom';
import FeatureCarousel from '../../Components/FeatureCarousel'
import { useForm } from '@mantine/form';
import useStyles from './style';
import { titles } from './properties.js';
import { baseURL, getHeader, updateLoggedInData } from '../../Utils/const.js';
import ShowNotification from '../../Utils/notification.js';
function Login() {
    const { classes } = useStyles(useStyles);
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) =>
                value == ''
                    ? 'Email is Required'
                    : /^\S+@\S+$/.test(value)
                        ? null
                        : 'Invalid email',
            password: (value) =>
                value == ''
                && 'Password is Required'
        },
    }
    );
    const formSubmitHandler = async () => {
        const data  = form.validate();
        if(data.hasErrors) return;
        console.log('going to call');
        try {
            const response = await fetch(`${baseURL}/login`, {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify(form.values),
            });
            var result = await response.json();
            if (response.ok) {
              
                let data = {
                    email: result.email,
                    name: result.name,
                    userType: 'Host',
                }
                if (!result.error) {
                    updateLoggedInData(data);
                    setTimeout(function () { navigate(`/dashboard`) }, 1000);
                    ShowNotification('success', result.msg, '');
                }
                else ShowNotification('failure', result.msg, '');
            } else ShowNotification('failure', result.msg, '')
        }
        catch (error) {
            ShowNotification('failure', error.message, '')
        }
    }
    return (
        <Grid className={classes.wrapper}>
            <Grid.Col span={12} sm={6}>
                <Box className={classes.header}> Login</Box>
                <Box className={classes.form}>
                    <form
                        className={classes.formContainer}
                        onSubmit={form.onSubmit(formSubmitHandler)}
                        name='loginForm' >
                        <Input
                            icon={<IconAt />}
                            variant="default"
                            placeholder="Your email"
                            radius="xl"
                            size="md"
                            {...form.getInputProps('email')}
                        />

                        <PasswordInput

                            placeholder="Password"
                            mt="lg"
                            size="md"
                            variant="default"
                            radius="xl"

                            {...form.getInputProps('password')}
                        />
                        <Button
                            type="submit"
                            mt="xl"
                            radius="xl"
                            ta="right"
                            size="lg"
                            variant="filled"
                            className={classes.actionButton}
                            onClick={ (e)=>{e.preventDefault(); formSubmitHandler()}}
                        >
                            {titles.login}
                        </Button>
                    </form>
                </Box>


            </Grid.Col>
            <Grid.Col span={12} sm={6}>
                <Link to='/signup'>
                    <Button
                        type="submit"
                        mt="xl"
                        mb="lg"
                        radius="xl"
                        ta="right"
                        size="lg"
                        variant="filled"
                        className={classes.actionButton}
                    >
                        {titles.signup}
                    </Button>
                </Link>
                <FeatureCarousel />

            </Grid.Col>
        </Grid>


    );
}

export default Login;
