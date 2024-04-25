/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
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
import { EventPayZalo } from './src/helper/ZaloPayment';
import ManageAddressScreen from './src/screen/user/ManageAddressScreen';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';



function App(): JSX.Element {

  console.log('render');
  useEffect(()=>{
    RequestNotificationPermission()

    registerRemoteNotificationsEvent()
  
  })



  return (
      <AlertNotificationRoot>
        <Provider store={store}>
          <ManageNavigation />
        </Provider>
      </AlertNotificationRoot>



  );
}

export default App;
