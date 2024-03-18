import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import IconEntypo from 'react-native-vector-icons/Entypo'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { StaffRootStackParams, StaffRootStackScreen } from './StaffRootStackParams'
import { Color } from '../../contanst/color'
import { ShipperRootStackParams, ShipperRootStackScreen } from './ShipperRootStackParams'

// const StackStaff = createStackNavigator<StaffRootStackParams>()
// const StackShipper = createStackNavigator<ShipperRootStackParams>()
const StackStaff = createMaterialTopTabNavigator<StaffRootStackParams>();
const StaffStack = () => {

    const user = useSelector((state: RootState) => state.user.value)

    function StackShipperComponent() {
        console.log('shipper');

        return (
            <StackStaff.Navigator
                screenOptions={{
                    headerBackImage: () => {
                        return <IconEntypo name='chevron-thin-left' size={24} color={Color.primary200} style={{ marginStart: 6 }} />
                    },
                    headerTitleStyle: {
                        color: Color.primary200,
                        fontSize: 24,
                        fontWeight: 'bold',
                        fontFamily: 'Klarna Text',
                        letterSpacing: -0.165,
                    },
                    headerTitleAlign: 'center',
                    cardStyle: {
                        backgroundColor: "#fff"
                    }
                }}
            >
                {


                    ShipperRootStackScreen.map((screen) => {
                        return <StackShipper.Screen name={screen.name} component={screen.component} options={screen.option} key={screen.id} />
                    })
                }
            </StackStaff.Navigator>
        )
    }


    return (
        <>
            <StackStaff.Navigator
                screenOptions={{
                    tabBarLabelStyle: {
                        textTransform:'capitalize',
                        fontWeight:'600',
                        fontSize:15,
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