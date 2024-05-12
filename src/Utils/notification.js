import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

const ShowNotification = (notificationType, message, title) => {
    
    let colorCode = notificationType == 'success' ? 'secondary.0' : 'red';
    notifications.show({
      id: 'notification',
      withCloseButton: true,
      autoClose: 5000,
      title: title,
      message: message,
      color: colorCode,  
      icon:
        notificationType == 'success' ? <IconCheck size="1.1rem" /> : <IconX />,
      style: { backgroundColor: 'background.0' },
      loading: false
    });
  };


export default ShowNotification;