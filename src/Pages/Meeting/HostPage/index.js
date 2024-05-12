
import { Grid, Box } from '@mantine/core';
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
import ShareLinkModal from '../../../Components/ShareLinkModal';
import ShowNotification from '../../../Utils/notification.js';
import raiseHand from '../../../assets/images/raiseHand.png'
function HostPage({ meetingId }) {
    const { classes } = useStyles(useStyles);
    const [timer, setTimer] = useState(0);
    const timerRef = useRef(0);
    const navigate = useNavigate();
    const [updateTimerToDB, setUpdateTimerToDB] = useState(null);
    const [ready, wsResponse, send] = useContext(WebsocketContext);
    const reducer = (state, action) => {
        if (action && action.type == 'SET') {
            return action.timer
        }
        if (state <= 1) clearInterval(timerRef.current);
        const data = {
            meetingId,
            clientMsg: state - 1,
            type: 'TIMER'
        }
        if (updateTimerToDB) {
            data.updateTimerToDB = updateTimerToDB;
            setUpdateTimerToDB('');
        }
        send(JSON.stringify(data));
        return state - 1;
    };
    const [timeLeft, dispatchTimeLeft] = useReducer(reducer, 0)
    const [hostMic, setHostAudio] = useState(false);
    const [hostVideo, setHostVideo] = useState(false);
    const timerList = [15, 30, 45, 60];
    useEffect(() => {

        if (!wsResponse) return;
        let responseData = (JSON.parse(wsResponse)).data;
        // hand raise by the participant
        if (responseData.type === 'RAISEHAND') {
            let PL = participantList.map((participant) => {
                return responseData.participantId === participant.id ? { ...participant, isHandRaised: true } : { ...participant };
            })
            setParticipantList(PL);
        }
        else if (responseData.type === 'ENDCALL') {
            // redirect the user to Thank you page and if host show the option to view stats of the meeting.
            navigate(`/thankyou`);

        }
        // update the new list of participant
        if (responseData.participant) {
            let newList = responseData.participant.map((listData) => { return { name: listData.name, id: listData.id } })
            setParticipantList(newList);
        }
        if (responseData.msg) {
            ShowNotification('success', responseData.msg, '');
        }
    }, [wsResponse]);
    useEffect(() => {
        console.log('is ready', ready)
        if (ready) {
            //   send(`timer left is ${timeLeft}`);
            console.log('send');
        }
    }, [timer]);
    const [participantList, setParticipantList] = useState([]);
    console.log(participantList)
    const startTimer = () => {
        console.log('timeLeft is ', timeLeft);
        dispatchTimeLeft();
    };
    useEffect(() => {
        console.log('timer is ', timer);
        if (timer <= 0) return;
        dispatchTimeLeft({ type: 'SET', timer })
        timerRef.current = setInterval(() => startTimer(), 1000);
        return () => clearInterval(timerRef.current);
    }, [timer]);
    const endMeeting = () => {
        // end the call once the host clicks on end button.
        // fire an event with type ENDCALL to end the call.
        let data = {
            type: 'ENDCALL',
            clientMsg: 'call ended by the Host',
            meetingId: meetingId,
            userType: 'Host'
        }
        send(JSON.stringify(data));
    }
    return (
        <Box className={participantList.length > 0 && participantList.length % 2 === 0 ? classes.wrapper : classes.wrapperBlack} >
            {/* Show timer left */}
            {timeLeft && timeLeft > 0 && <Box className={classes.showTimer}>Time Left {timeLeft}s</Box>}
            {/* List of Participant */}
            <Box className={classes.participantWrapper}>
                {participantList.length > 0 && participantList.map((participant) => {
                    return (
                        <Box className={classes.participant}>
                            <img src={malePersonAvatar} width="150px"></img>
                            <h1> {participant.name} </h1>
                            {
                                participant.isHandRaised && <img className={classes.handRaised} src={raiseHand} width="50px"></img>
                            }

                        </Box>
                    )
                })
                }
            </Box>
            {/* Host Camera and Functionality */}
            <Grid className={classes.hostDetailsWrapper}>
                {/* set timer */}
                <Grid.Col span={12} sm={6} className={classes.hostTimer}>
                    <Box className={classes.timerHeading}>
                        Countdown timer
                    </Box>
                    {timerList.length > 0 && timerList.map((timer) => {
                        return (
                            <Box onClick={() => { setTimer(timer); setUpdateTimerToDB(timer) }} className={classes.timer}>
                                {timer + 's'}
                            </Box>
                        )
                    })}
                </Grid.Col>
                {/* Functions */}
                <Grid.Col span={8} sm={4} className={classes.hostFunctions}>
                    {hostVideo === true ? <img src={videoOn} width="50px" onClick={() => setHostVideo(false)}></img> : <img src={videoOff} width="50px" onClick={() => setHostVideo(true)}></img>}
                    {hostMic === true ? <img src={micOn} width="50px" onClick={() => setHostAudio(false)}></img> : <img src={micOff} width="50px" onClick={() => setHostAudio(true)}></img>}
                    <img src={endCall} onClick={() => endMeeting()} width="50px" />
                </Grid.Col>
                {/* Host Camera */}
                <Grid.Col span={4} sm={2} className={classes.hostCamera}>
                    <img src={malePersonAvatar} width="100%"></img>
                </Grid.Col>
            </Grid>
            {/* Shareable link to share meeting invite */}
            <ShareLinkModal meetingId={meetingId} />
        </Box >
    );
}

export default HostPage;
