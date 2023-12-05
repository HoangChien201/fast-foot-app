import { StyleSheet, Text, Image } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ManagementRootStackParams,ManagementRootStackScreen } from './ManagementRootStackParams'
import { Color } from '../../contanst/color'
import IconEntypo from 'react-native-vector-icons/Entypo'

const Stack=createStackNavigator<ManagementRootStackParams>()
const ManagementStack = () => {
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
            ManagementRootStackScreen.map((screen)=>{
                return <Stack.Screen name={screen.name} component={screen.component} options={screen.option} key={screen.id}/>
            })
        }
    </Stack.Navigator>
  )
}

export default ManagementStack

const styles = StyleSheet.create({})