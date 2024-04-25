import 'react-native-gesture-handler';
import React, { useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { GroceryRootBottomTabParams, GroceryRootBottomTabScreens } from "./GroceryRootBottomTabParams";
import { Color } from '../../contanst/color';
import { socket } from '../../helper/SocketHandle';
import { postLocalNotification } from '../../notifications/Events';
import { userType } from '../store/userReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { MessageRequest } from '../ui/chat/TextingComponent';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { cartItemType } from '../store/modalAddCartReducer';

const Tab = createBottomTabNavigator<GroceryRootBottomTabParams>();

export default function GroceryBottomTab(): React.JSX.Element {
    const user: userType | null = useSelector((state: RootState) => state.user.value)
    const cart:cartItemType[]=useSelector((state: RootState) => state.cart.value)
    useEffect(() => {

        if(!user) return

        socket.on(`message-${user.id}`, (msg: MessageRequest) => {
            postLocalNotification({
                title: 'FastFood',
                body: 'You have a new message'
            })
            Toast.show({
                type:ALERT_TYPE.SUCCESS,
                title:"FastFost",
                textBody:"You have a new message"
            })
        });

        
    }, [])
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: Color.primary200,
                tabBarLabelStyle: { fontWeight: 'bold' }
            }}
            initialRouteName='HomeScreen'
        >
            {
                GroceryRootBottomTabScreens.map((item, index) => {

                    if(item.name === "CartScreen"){
                        return <Tab.Screen
                        key={item.id}
                        component={item.component}
                        name={item.name}
                        options={{...item.options,tabBarBadge: cart.length}}
                    />
                    }

                    return <Tab.Screen
                        key={item.id}
                        component={item.component}
                        name={item.name}
                        options={item.options}
                    />
                })
            }
        </Tab.Navigator>
    )
}