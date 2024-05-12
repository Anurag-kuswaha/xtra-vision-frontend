import { Box, Table, Button } from '@mantine/core';
import { useStyles } from './style.js';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { data } from './properties.js';
import { baseURL, getHeader } from '../../Utils/const.js';
function ListOfMeeting({loadMetingList}) {
    const { classes, theme } = useStyles(useStyles)
    const [entries, setEntries] = useState([]);
    const fetchMeetingList = async (isReset) => {
       const meetingType='SCHEDULE'
        const response = await fetch(`${baseURL}/meeting/list?type=${meetingType}` , {
            method: 'GET',
            headers: getHeader(),
        })
        console.log(response)
        if (response.ok) {
            let UserListing = await response.json();
            setEntries(UserListing.data);
        }
    }
    useEffect(() => {
        fetchMeetingList()
    }, [])
    useEffect(() => {
        fetchMeetingList()
    }, [loadMetingList])
    const rows = entries.map((element, index) => (
        <tr className={index % 2 === 0 ? classes.tableRowWhite : classes.tableRow} key={`${element.Id}`}>
            <td className={classes.tableData}>{new Date(element.startDate).toDateString()}</td>
            <td className={classes.tableData}>{new Date(element.startDate).toLocaleString().split(',')[1]}</td>
            <td className={classes.tableData}><Link to={`/meeting/${element.Id}`}> <Button  color='primary.0'> Start Now</Button></Link> </td>
        </tr>
    ));
    return (
        <Box className={classes.wrapper}>
            <Box className={classes.tableContainer}>
                <Table className={classes.table}>
                    <thead className={classes.tableHead}>
                        <tr >
                            {data.tableHeading.map(heading => {
                                return <th className={classes.columnHeading}>{heading}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Box>
            {
                rows.length === 0 && <p className='no-record-found'>{"No upcoming meetings found"}</p>
                  
            }
        </Box>
    );
}

export default ListOfMeeting;