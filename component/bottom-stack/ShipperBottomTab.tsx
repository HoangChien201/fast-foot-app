import 'react-native-gesture-handler';
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ShipperRootBottomTabParams,ShipperRootBottomTabScreens } from "./ShipperRootBottomTabParams";
import { Color } from '../../contanst/color';

const Tab=createBottomTabNavigator<ShipperRootBottomTabParams>();

export default function ShipperBottomTab():React.JSX.Element{
    return (
        <Tab.Navigator
            screenOptions={{
            tabBarActiveTintColor: Color.primary200,
            tabBarLabelStyle:{fontWeight:'bold'}
            }}
            initialRouteName='HomeShipperScreen'
        >
            {
                ShipperRootBottomTabScreens.map((item,index)=>{
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