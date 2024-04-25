
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Notification, Notifications } from 'react-native-notifications';
import { SocketConnect } from './src/helper/SocketHandle';

SocketConnect()
AppRegistry.registerComponent(appName, () => App);
