import 'react-native-gesture-handler';
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { GroceryRootBottomTabParams,GroceryRootBottomTabScreens } from "./GroceryRootBottomTabParams";
import { Color } from '../../contanst/color';

const Tab=createBottomTabNavigator<GroceryRootBottomTabParams>();

export default function GroceryBottomTab():React.JSX.Element{
    return (
        <Tab.Navigator
            screenOptions={{
            tabBarActiveTintColor: Color.primary200,
            tabBarLabelStyle:{fontWeight:'bold'}
            }}
            initialRouteName='HomeScreen'
        >
            {
                GroceryRootBottomTabScreens.map((item,index)=>{
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