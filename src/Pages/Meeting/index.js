
import React, { useEffect, useState, createContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import HostPage from './HostPage'
import ParticipantPage from './ParticipantPage'
import NameModal from '../../Components/NameModal'
import { baseURLSocket, getLoggedInUserDetails } from '../../Utils/const.js';
export const WebsocketContext = createContext(false, null, () => { })
function Meeting() {
    const [isReady, setIsReady] = useState(false)
    const [wsResponse, setWsResponse] = useState(null)
    const ws = useRef(null);
    const { meetingId } = useParams();
    const userDetails = getLoggedInUserDetails();
    const userType = userDetails && userDetails.userType ? userDetails.userType : 'Participant';
    const [participantName, setParticipantName] = useState('')
    useEffect(() => {
        if (!userType || (userType == 'Participant' && !participantName)) return;
        let relativUrl;
        if (userType == 'Host') relativUrl = `?meetingId=${encodeURIComponent(meetingId)}&host=${encodeURIComponent(true)}&email=${encodeURIComponent(userDetails.email)}`
        else relativUrl = `?meetingId=${encodeURIComponent(meetingId)}&name=${encodeURIComponent(participantName)}`
        const socket = new WebSocket(baseURLSocket + relativUrl)
        socket.onopen = () => setIsReady(true)
        socket.onclose = () => {
            console.log('closing the connection');
            ws.current.send(JSON.stringify({ msg: 'connection closed by me' }));
            setIsReady(false);
        }
        socket.onmessage = (event) => setWsResponse(event.data)
        ws.current = socket
        return
    }, [userType, participantName])

    const ret = [isReady, wsResponse, ws.current?.send.bind(ws.current)]
    // UI will be based on user profile whether it is host or participant

    return (
        <>
            {
                userType === 'Participant' && participantName == '' ? <NameModal participantName={participantName} setParticipantName={setParticipantName} /> :
                    <WebsocketContext.Provider value={ret}>
                        {userType === 'Host' ? <HostPage meetingId={meetingId} /> : <ParticipantPage meetingId={meetingId} participantName={participantName}></ParticipantPage>}
                    </WebsocketContext.Provider>
            }
        </>
    );
}

export default Meeting;
