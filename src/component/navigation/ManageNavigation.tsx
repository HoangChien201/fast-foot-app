import React, { useCallback } from 'react'
import { NavigationContainer, RouteProp } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import StaffStack from '../stack/StaffStack'
import GroceryStack from '../stack/GroceryStack'
import AuthenticationUserScreen from '../../screen/user/AuthenticationUserScreen'
import { StackNavigationProp } from '@react-navigation/stack'

export type navigationType=StackNavigationProp<RootStackParamList>
type routeType=RouteProp<{ params: { value: string } }, 'params'>
export type RootStackParamList = {
  SendOTPScreen: { email: string } | undefined,
  SearchScreen:undefined,
};
const ManageNavigation = () => {
    const user = useSelector((state: RootState) => state.user.value)

  const StackActive = useCallback(()=>{
    
    switch (user?.role){  
      case 2:
        return <StaffStack/>
      default:
        return <GroceryStack/>
    }
  },[user])

  return (
    <NavigationContainer>
      {
        !user ? <AuthenticationUserScreen/> 
        :
        <StackActive/>
      }
    </NavigationContainer>
  )
}

export default ManageNavigation