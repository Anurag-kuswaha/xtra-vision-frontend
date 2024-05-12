import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Input, Center } from '@mantine/core';
import { useState } from 'react';
function NameModal({participantName, setParticipantName}) {
  const [name, setName]=  useState('');
  const [error, setError]=  useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const addParticipantPage = () =>{
    console.log('added name is ', name);
    if(name =='') return setError(true);
    setParticipantName(name)

  }
  return (
    <>
      <Modal opened={true} onClose={close} title="Full Name">
       
       
        <Input
          variant="default"
          placeholder="Enter Full Name"
          radius="xl"
          size="md"
           mb="xl"
           {...participantName}
           onChange={ (e) => setName(e.target.value)}
           error={error}
        />
        <Button
          onClick={() => addParticipantPage()}
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
export default NameModal;