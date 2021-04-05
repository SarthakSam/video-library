import { useNotifications } from '../../contexts/notifications-context';
import styles from './Notification-container.module.css';
import { Notification } from './notification/Notification';

export function NotificationContainer() {
    const { notifications } = useNotifications();
    console.log(notifications);

    return (
        <ul className={styles.notification__container + " row"}>
            {
                notifications.map( notification => <Notification key = {notification.id} notification = { notification } />)
            }
        </ul>
    )
}