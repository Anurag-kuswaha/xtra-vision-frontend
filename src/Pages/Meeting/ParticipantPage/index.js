
import { Grid, Input, TextInput, PasswordInput, Button, Loader, Box } from '@mantine/core';
import React, { useEffect, useState, useReducer, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useStyles from './style.js';
import videoOn from '../../../assets/images/videoOn.png'
import videoOff from '../../../assets/images/videoOff.png'
import micOff from '../../../assets/images/micOff.png'
import micOn from '../../../assets/images/micOn.png'
import endCall from '../../../assets/images/endCall.png'
import malePersonAvatar from '../../../assets/images/malePersonAvatar.svg'
import { WebsocketContext } from '../index.js';
import { Carousel } from '@mantine/carousel';
import ShowNotification from '../../../Utils/notification.js';
import raiseHand from '../../../assets/images/raiseHand.png'
function ParticipantPage({ meetingId }) {

    const { classes } = useStyles(useStyles);
    const [ready, wsResponse, send] = useContext(WebsocketContext);
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(0)
    const [hostMic, setHostAudio] = useState(false);
    const [hostName, setHostName] = useState(false);

    const [hostVideo, setHostVideo] = useState(false);
    const [participantId, setParticipantId] = useState();
    const [participantList, setParticipantList] = useState([]);
    useEffect(() => {

        console.log('is connection established', ready);
        console.log('val is ', wsResponse);
        if (!wsResponse) return;
        let responseData = (JSON.parse(wsResponse)).data;
        if (responseData.type === 'ENDCALL') {
            // redirect the user to Thank you page and if host show the option to view stats of the meeting.
            navigate(`/thankyou`);
        }
        // update participant id on connection 
        if (responseData.participantId) {
            setParticipantId(responseData.participantId);
        }
        if (responseData.hostName) {
            setHostName(responseData.hostName);

        }
        // update the new list of participant
        if (responseData.participant) {
            let newList = responseData.participant.map((listData) => { return { name: listData.name, id: listData.id } })
            setParticipantList(newList);

        }
        if (responseData.msg) {
            ShowNotification('success', responseData.msg, '');
        }
        if ('timeLeft' in responseData)
            setTimeLeft(responseData.timeLeft);
    }, [wsResponse]);
    const handleRaiseHand = () => {
        const data = {
            meetingId: meetingId,
            participantId: participantId,
            clientMsg: '',
            type: 'RAISEHAND'
        }
        console.log('data', data);
        send(JSON.stringify(data));
    }
    const leftCall = () => {
        // call left by participant on click of close button.
        // fire an event with type LEFTCALL to end the call.
        let data = {
            type: 'LEFTCALL',
            clientMsg: 'call Left by participant',
            meetingId: meetingId,
            participantId: participantId,
            userType: 'Participant'
        }
        send(JSON.stringify(data));
        navigate(`/thankyou`);
    }
    return (

        <Box className={classes.wrapper}>
            {/* Show timer left */}
            {timeLeft && timeLeft > 0 && <Box className={classes.showTimer}>Time Left {timeLeft}s</Box>}
            {/* List of Participant */}
            <Box className={classes.participantWrapper}>
                <Carousel orientation="vertical" height="100%" mx="auto" initialSlide={1} slideGap="md">
                    {participantList.length > 0 && participantList.map((participant) => {
                        return (
                            <Carousel.Slide className={classes.participant}>
                                <img src={malePersonAvatar} width="150px"></img>
                                <h1> {participant.name} </h1>
                            </Carousel.Slide>
                        )
                    })
                    }
                </Carousel>
            </Box>
            {/* Host Camera for participant */}
            <Box className={classes.hostWrapper}>
                <Box className={classes.hostDetails}>
                    <img src={malePersonAvatar} width="150px"></img>
                    <h1> {hostName} </h1>
                </Box>
            </Box>
            {/* Participant Camera and Functionality */}
            <Grid className={classes.hostDetailsWrapper}>
                {/* Functions */}
                <Grid.Col span={5} sm={10} className={classes.hostFunctions}>
                    {hostVideo === true ? <img src={videoOn} width="50px" onClick={() => setHostVideo(false)}></img> : <img src={videoOff} width="50px" onClick={() => setHostVideo(true)}></img>}
                    {hostMic === true ? <img src={micOn} width="50px" onClick={() => setHostAudio(false)}></img> : <img src={micOff} width="50px" onClick={() => setHostAudio(true)}></img>}
                    <img src={endCall} width="50px" onClick={() => leftCall()} />
                    <img src={raiseHand} width="50px" onClick={() => handleRaiseHand()} />

                </Grid.Col>
                {/* Host Camera */}
                <Grid.Col span={7} sm={2} className={classes.hostCamera}>
                    <img src={malePersonAvatar} width="100%"></img>
                </Grid.Col>
            </Grid>
        </Box >
    );
}

export default ParticipantPage;
