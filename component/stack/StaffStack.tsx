import { StyleSheet, Text, Image } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { StaffRootStackParams, StaffRootStackScreen } from './StaffRootStackParams'
import { Color } from '../../contanst/color'
import IconEntypo from 'react-native-vector-icons/Entypo'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { staffByIdUser } from '../../http/UserHTTP'
import { ShipperRootStackParams, ShipperRootStackScreen } from './ShipperRootStackParams'

const StackStaff = createStackNavigator<StaffRootStackParams>()
const StackShipper = createStackNavigator<ShipperRootStackParams>()

const StaffStack = () => {
    
    const user = useSelector((state: RootState) => state.user.value)

    function StackStaffComponent() {
        console.log('staff');

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

                    StaffRootStackScreen.map((screen) => {
                        return <StackStaff.Screen name={screen.name} component={screen.component} options={screen.option} key={screen.id} />
                    })
                }
            </StackStaff.Navigator>
        )
    }

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

    function Screen(){
        switch(user.staff.job){
            case 'staff':{
                return <StackStaffComponent />
            }
            case 'shipper':{
                return <StackShipperComponent />
            }
            case 'table':{
                return <StackStaffComponent />
            }
        }
    }
    return (
        <>
            <Screen/>
        </>

    )
}

export default StaffStack

const styles = StyleSheet.create({})