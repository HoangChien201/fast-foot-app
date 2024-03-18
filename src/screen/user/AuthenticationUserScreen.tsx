import React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SignUpScreen from './SignUpScreen';
import MyTopTasbBar from './component/MyTopTabsBar';
import UserStack from '../../component/stack/UserStack';

const Tab = createMaterialTopTabNavigator();

const AuthenticationUserScreen = () => {
    
    return (
            <Tab.Navigator
                tabBar={props => <MyTopTasbBar {...props} />}>
                <Tab.Screen name="Login" component={UserStack} />
                <Tab.Screen name="Sign-up" component={SignUpScreen} />
            </Tab.Navigator>

    )
}

export default AuthenticationUserScreen

