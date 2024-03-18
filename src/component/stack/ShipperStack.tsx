import { StyleSheet, Text, Image } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Color } from '../../contanst/color'
import IconEntypo from 'react-native-vector-icons/Entypo'
import { ShipperRootStackParams, ShipperRootStackScreen } from './ShipperRootStackParams'

const Stack=createStackNavigator<ShipperRootStackParams>()
const ShipperStack = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerBackImage:()=>{
                return <IconEntypo name='chevron-thin-left' size={24} color={Color.primary200} style={{marginStart:6}}/>
            },
            headerTitleStyle:{
                color:Color.primary200,
                fontSize:24,
                fontWeight:'bold',
                fontFamily:'Klarna Text',
                letterSpacing:-0.165,
            },
            headerTitleAlign:'center',
            cardStyle:{
                backgroundColor:"#fff"
            }
        }}
    >
        {
            ShipperRootStackScreen.map((screen)=>{
                return <Stack.Screen name={screen.name} component={screen.component} options={screen.option} key={screen.id}/>
            })
        }
    </Stack.Navigator>
  )
}

export default ShipperStack

const styles = StyleSheet.create({})