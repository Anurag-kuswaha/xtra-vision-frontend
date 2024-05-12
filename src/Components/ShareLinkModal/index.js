import { useDisclosure } from '@mantine/hooks';
import { Dialog, Group, Button, TextInput, Text , Box, CopyButton} from '@mantine/core';
import useStyle from './style';
function ShareLinkModal({meetingId}) {
    const {classes} = useStyle(useStyle);
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <Box className={classes.shareLinkWrapper}>
      <Group position="center">
        <Button onClick={toggle} color='primary.0' className={classes.shareLinkButton}> Share Link</Button>
      </Group>

      <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md"  zIndex={1004} className={classes.shareLinkModal}>
        <Text size="sm" mb="xs" weight={500}>
       Copy Meeting URL to share... 
        </Text>

        <Group align="flex-start">
          <TextInput placeholder={window.location.href} sx={{ flex: 1 }} value={window.location.href}/>
          <CopyButton value={window.location.href} >
        {({ copied, copy }) => (
        <Button color={copied ? 'teal' : 'secondary.0'} onClick={copy}>
          {copied ? 'Copied url' : 'Copy url'}
        </Button>
      )}
    </CopyButton>
        </Group>
      </Dialog>
    </Box>
  );
}
export default ShareLinkModal;