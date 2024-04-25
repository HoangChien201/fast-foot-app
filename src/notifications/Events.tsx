import { Notification, NotificationCompletion, Notifications, Registered, RegistrationError } from "react-native-notifications";

export const registerRemoteNotificationsEvent = () => {
    Notifications.registerRemoteNotifications();

    Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion) => {
        console.log(`Notification received in foreground: ${notification.title} : ${notification.body}`);
        completion({ alert: true, sound: true, badge: false });
    });

    Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
        console.log(`Notification opened: ${notification.title}`);
        completion();
    });
    Notifications.events().registerNotificationReceivedBackground((notification: Notification, completion: (response: NotificationCompletion) => void) => {
        console.log("Notification Received - Background", notification.payload);

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({ alert: true, sound: true, badge: false });
    });

    Notifications.events().registerRemoteNotificationsRegistered((event: Registered) => {
        // TODO: Send the token to my server so it could send back push notifications...
    });
    Notifications.events().registerRemoteNotificationsRegistrationFailed((event: RegistrationError) => {
        console.error(event);
    });
}
export const postLocalNotification=(notification:any)=>{
    Notifications.postLocalNotification({
        title: notification.title,
        body: notification.body,
    });
}