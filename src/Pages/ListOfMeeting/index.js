import { useRef } from 'react';
import { Box, Table, Pagination, TextInput } from '@mantine/core';
import { useStyles } from './style.js';
import { useEffect, useState } from 'react';
import filter from "../../assets/images/filterIcon.svg"
import SearchIcon from '../../assets/images/search.svg';
import { data } from './properties.js';
import { baseURL, getHeader } from '../../Utils/const.js';
function ListOfMeeting() {
    const { classes, theme } = useStyles(useStyles)
    const [activePage, setActivePage] = useState(1);
    const [entries, setEntries] = useState([]);
    const [pageLoadEntries, setPageLoadEntries] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const cacheListing = useRef({});
    const params = new URLSearchParams();
    params.append('page', activePage)
    params.append('pSize', pageSize)
    const pageChangeHandler = (page) => {
        setActivePage(page)
    }
    const fetchMeetingList = async (isReset) => {

        const response = await fetch(`${baseURL}/meeting/list?` + params.toString(), {
            method: 'GET',
            headers: getHeader(),

        })
        console.log(response)
        if (response.ok) {
            let UserListing = await response.json();

            setEntries(UserListing.data);
            setPageLoadEntries(UserListing.data);

            setTotalPage((UserListing.totalCount + pageSize - 1) / pageSize);
            cacheListing[params] = UserListing.data;
        }
    }

    useEffect(() => {
        fetchMeetingList()
    }, [activePage])

    const rows = entries.map((element, index) => (
        <tr className={index % 2 === 0 ? classes.tableRowWhite : classes.tableRow} key={`${element.Id}`}>
            <td className={classes.tableData}>{new Date(element.startDate).toDateString() + new Date(element.startDate).toLocaleString().split(',')[1]}</td>
            <td className={classes.tableData}>{element.participant ? element.participant.length : 0}</td>
            <td className={classes.tableData}>{Math.abs(((new Date(element.endDate)).getTime() - (new Date(element.startDate)).getTime()) / 1000).toString().split('.')[0]} seconds</td>
            <td className={classes.tableData}>{element.timerCounter && element.timerCounter.length ? element.timerCounter.length : '0'} </td>
            <td className={classes.tableData}>{element.handRaised && element.handRaised.length ? element.handRaised.length : '0'}</td>
        </tr>
    ));

    const handleSearch = (e) => {
        const value = e.target.value;
        if (value === "") {
            setEntries(pageLoadEntries);
        } else {
            const filteredEntries = pageLoadEntries.filter(item => `${new Date(item.startDate).toDateString().toLowerCase()}`.includes(value.toLowerCase()) || (item.participant && item.participant.length.toString().includes(value)) ||
                (item.handRaised && item.handRaised.length.toString().includes(value))
            );
            setEntries(filteredEntries);
        }
    }


    return (
        <Box className={classes.wrapper}>
            <Box className={classes.headerAndSearch}>
                <p className={classes.title} >{data.titles.pageTitle}</p>
                <Box className={classes.searchAndFilter}>
                    <TextInput icon={<img className={classes.action} src={SearchIcon} alt='view' />} onChange={handleSearch} radius={"xl"} className={classes.searchInput} placeholder={data.titles.search} />
                    <Box className={classes.filterContainer} >
                        <img className={classes.filterIcon} src={filter} alt='search-input' />
                        <p className={classes.filter}>{data.titles.filter}</p>
                    </Box>

                </Box>
            </Box>
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
                rows.length === 0 ? <p className='no-record-found'>{"No record found"}</p>
                    :
                    <Pagination size={"md"} defaultValue={activePage} onChange={pageChangeHandler} className={classes.pagination} siblings={1} total={totalPage} />
            }

        </Box>
    );
}

export default ListOfMeeting;