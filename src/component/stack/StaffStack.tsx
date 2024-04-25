import { StyleSheet } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { StaffRootStackParams, StaffRootStackScreen } from './StaffRootStackParams'
import { Color } from '../../contanst/color'
const StackStaff = createMaterialTopTabNavigator<StaffRootStackParams>();
const StaffStack = () => {
    return (
        <>
            <StackStaff.Navigator
                screenOptions={{
                    tabBarLabelStyle: {
                        textTransform:'capitalize',
                        fontWeight:'600',
                        fontSize:14,
                        color:Color.primary200
                    },
                    tabBarActiveTintColor:'red',
                    
                    
            }}
            >
            {
                StaffRootStackScreen.map((screen) => {
                    return <StackStaff.Screen name={screen.name} component={screen.component} options={screen.option} key={screen.id} />
                })
            }
        </StackStaff.Navigator >
        </>

    )
}

export default StaffStack

const styles = StyleSheet.create({})