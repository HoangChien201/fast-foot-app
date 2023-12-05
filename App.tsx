/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text
} from 'react-native';

import UseStack from './component/stack/GroceryStack';
import { Provider, useSelector } from 'react-redux';
import { store } from './component/store/store';
import ManageNavigation from './component/navigation/ManageNavigation';
import { NavigationContainer } from '@react-navigation/native';
import ManagementStack from './component/stack/ManagementStack';
import StaffsScreen from './screen/manager/StaffsScreen';
import StaffStack from './component/stack/StaffStack';
import OrderDetailScreen from './screen/grocery/OrderDetailScreen';
import ShipperStack from './component/stack/ShipperStack';
import OrderShipperDetail from './screen/staff/OrderShipperDetail';
import ManageAddressScreen from './screen/user/ManageAddressScreen';
import SendMailScreen from './screen/user/SendMailScreen';
import SendOTPScreen from './screen/user/SendOTPScreen';
import ChangePasswordSceen from './screen/user/ChangePasswordScreen';


function App(): JSX.Element {
  return (
    <Provider store={store}>
      <ManageNavigation/>
    </Provider>
    // <NavigationContainer>
    //   <ShipperStack/>
    // </NavigationContainer>
    // <SendOTPScreen/>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
