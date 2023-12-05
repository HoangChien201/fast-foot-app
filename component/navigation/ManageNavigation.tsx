import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer, NavigationProp, RouteProp } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import UserStack from '../stack/UserStack'
import StaffStack from '../stack/StaffStack'
import ShipperStack from '../stack/ShipperStack'
import GroceryStack from '../stack/GroceryStack'

export type navigationType=NavigationProp<ReactNavigation.RootParamList>
type routeType=RouteProp<{ params: { value: string } }, 'params'>

const ManageNavigation = () => {
    const user = useSelector((state: RootState) => state.user.value)

  function StackActive(){
    switch (user?.role){
      case 'client':        
        return <GroceryStack/>
      case 'staff':
        return <StaffStack/>
    }
  }

  return (
    <NavigationContainer>
      {
        !user ? <UserStack/> 
        :
        <StackActive/>
      }
    </NavigationContainer>
  )
}

export default ManageNavigation