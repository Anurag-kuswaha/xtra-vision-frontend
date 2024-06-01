
import { Grid, Input, Text, PasswordInput, Button, Loader, Box } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FeatureCarousel from '../../Components/FeatureCarousel'
import useStyles from './style';
import { titles } from './properties.js';
import { baseURL, getHeader, updateLoggedInData, getLoggedInUserDetails } from '../../Utils/const.js';
import ShowNotification from '../../Utils/notification.js';
import ScheduleMeeting from '../../Components/ScheduleMeeting';
import ListOfScheduldedMeeting from '../../Components/ListOfScheduldedMeeting'

function Login() {
    const { classes } = useStyles(useStyles);
    const userDetails = getLoggedInUserDetails();
    const [inputMeetingId, setInputMeetingId] = useState('');
    const [showScheduleMeet, setShowScheduleMeet] = useState(false);
    const [scheduleDate, setScheduleDate] = useState('');
    const[loadMetingList, setLoadMeetingList] = useState('');
    const navigate = useNavigate();
    const createMeeting = async (meetingType) => {
       // meeting type can be INSTANT or SCHEDULDED , do API call to create the meeting

        let body = {
            type: meetingType,
            email: userDetails.email,
            startDate: Date.now(),
            endDate: Date.now(),
            // in case of schedulde pass the meeting date
        }
        if (meetingType == 'SCHEDULE') {
            body.startDate = new Date(scheduleDate).getTime();
            body.endDate = new Date(scheduleDate).getTime();
        }
        try {
            const response = await fetch(`${baseURL}/createMeeting`, {
                method: 'POST',
                headers: getHeader(),
                body: JSON.stringify(body),
            });
            var result = await response.json();
            if (response.ok) {


                if (!result.error)
                    ShowNotification('success', result.msg, '');
                else ShowNotification('failure', result.msg, '');
                if (meetingType !== 'SCHEDULE')
                    setTimeout(function () { navigate(`/meeting/${result.meetingId}`) }, 1000);
                else setLoadMeetingList(true);
               
            } else ShowNotification('failure', result.msg, '')
        }
        catch (error) {
            ShowNotification('failure', error.message, '')
        }
    }
    const getMeetingDetails = async () => {
        try {
            const response = await fetch(`${baseURL}/meeting/details/${inputMeetingId}`, {
                method: 'GET',
                headers: getHeader(),
            });
            var result = await response.json()
            if (response.ok) {
                if (!result.error) {
                    setTimeout(function () { navigate(`/meeting/${inputMeetingId}`) }, 1000);
                    ShowNotification('success', result.msg, '');
                }
                else ShowNotification('failure', result.msg, '');
            } else ShowNotification('failure', result.msg, '')
        } catch (error) {
            ShowNotification('failure', error.message, '')
        }

    }
    return (
        <Grid className={classes.wrapper}>
            <Grid.Col span={12} sm={6}>
                <Box className={classes.header}> Welcome {userDetails ? userDetails.name: ''}</Box>
                <Grid className={classes.left}>
                    <Grid.Col span={12}>
                        <Grid >
                            <Grid.Col span={8} >
                                <Input
                                    variant="default"
                                    placeholder="enter code to join meeting"
                                    radius="xl"
                                    size="md"
                                    onChange={(e) => setInputMeetingId(e.target.value)}
                                />
                            </Grid.Col>
                            <Grid.Col span={4} >
                                <Button
                                    radius="xl"
                                    size="md"
                                    variant="filled"
                                    className={classes.secondaryButton}
                                    onClick={getMeetingDetails}
                                >
                                    {titles.joinMeeting}
                                </Button>
                            </Grid.Col>
                        </Grid>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Button
                            type="submit"
                            mt="xl"
                            mb="lg"
                            radius="xl"
                            ta="right"
                            size="lg"
                            variant="filled"
                            className={classes.actionButton}
                            onClick={() => createMeeting('INSTANT')}
                        >
                            {titles.instantMeeting}
                        </Button>
                    </Grid.Col>
                    <Grid.Col span={12} >
                        <Button

                            mt="xl"
                            mb="lg"
                            radius="xl"
                            ta="right"
                            size="lg"
                            variant="filled"
                            className={classes.actionButton}
                            onClick={() => setShowScheduleMeet(true)}
                        >
                            {titles.scheduleMeeting}
                        </Button>
                    </Grid.Col>
                </Grid>
                <Grid>

                <Grid.Col span={12} sm={10}>
                    <Text color='secondary.0' fz="xl" fw={700}> List of Schedulded Meeting</Text>
                <ListOfScheduldedMeeting loadMetingList={loadMetingList}/>
            </Grid.Col>
                </Grid>
            </Grid.Col>
            <Grid.Col span={12} sm={6}>
                <FeatureCarousel />
            </Grid.Col>
            <ScheduleMeeting showScheduleMeet={showScheduleMeet} setShowScheduleMeet={setShowScheduleMeet} setScheduleDate={setScheduleDate} createMeeting={createMeeting} />
        </Grid>
    );
}
export default Login;
