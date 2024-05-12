import { Modal, Button, Input, Center } from '@mantine/core';
import { useState } from 'react';
import { DateTimePicker } from '@mantine/dates';
import useStyle from './style';
function ScheduleMeeting({ showScheduleMeet, setShowScheduleMeet, setScheduleDate, createMeeting }) {
    const [name, setName] = useState('');
    const { classes } = useStyle(useStyle);
    return (
        <>
            <Modal size="lg" opened={showScheduleMeet} onClose={() => setShowScheduleMeet(false)} title="Schedule Meeting" className={classes.modalWrapper}>
                <DateTimePicker
                    label="Pick meeting start date and time"
                    placeholder="Pick meeting start date and time"
                    mt="xl"
                    mb="xl"
                    onChange={setScheduleDate}
                    minDate={new Date()}
                />
                <Button
                    mb="xl"
                    mt="xl"
                    onClick={() => { createMeeting('SCHEDULE'); setShowScheduleMeet(false) }}
                    radius="xl"
                    size="md"
                    variant="filled"
                    color='primary.0'
                >
                    Submit
                </Button>
            </Modal>
        </>
    );
}
export default ScheduleMeeting;