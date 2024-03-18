/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
} from 'react-native';

import { Provider, useSelector } from 'react-redux';
import ManageNavigation from './src/component/navigation/ManageNavigation';
import { store } from './src/component/store/store';
import { SocketConnect, socket } from './src/helper/SocketHandle';
import { Notification, NotificationBackgroundFetchResult, NotificationCompletion, Notifications, Registered, RegistrationError } from 'react-native-notifications';
import RequestNotificationPermission from './src/permissions/RequestNotificationPermission';
import { registerRemoteNotificationsEvent } from './src/notifications/Events';
import { useNetInfo } from '@react-native-community/netinfo';



function App(): JSX.Element {
  SocketConnect()
  console.log('render');
  
  RequestNotificationPermission()

  registerRemoteNotificationsEvent()

  const netInfo = useNetInfo();
  
  return (
    <Provider store={store}>
      <ManageNavigation />
    </Provider>

    // <OrderCompleteScreen/>
  );
}

export default App;
