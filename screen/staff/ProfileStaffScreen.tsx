import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Color } from '../../contanst/color';
import ButtonIcon from '../../component/ui/ButtonIcon';
import IntroduceProfile from '../../component/ui/profile/IntroduceProfile';
import ProfileUser from '../../component/ui/profile/ProfileUser';
import RecentOrder from '../../component/ui/profile/RecentOrder';
import { billDeliveryResType } from '../../component/store/billDeliveryReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../../component/store/store';
import { getAllBillDeliveryByClientHTTP } from '../../http/BillHTTP';
import { navigationProp } from '../../component/navigation/ManageNavigation';

const ProfileStaffScreen = () => {
  const user=useSelector((state:RootState)=>state.user.value)
  const [valueBillClient,setValueBillClient]=useState<billDeliveryResType[]>([])
  useEffect(() => {
    // (async function getBillByClient() {
    //   if(user?.client?._id){
    //     const billByClient=await getAllBillDeliveryByClientHTTP(user?.client?._id)
    //     setValueBillClient([...billByClient])
    //   }
    // })()
  }, [])
  const navigation:navigationProp=useNavigation()

  function editOnPressHandle(){
    navigation.navigate('ManageInformationUser')
  }

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <View style={styles.edit}>
          <ButtonIcon name='edit' size={20} color='#000' onPress={editOnPressHandle}/>
        </View>
        <ProfileUser/>
        {/* <IntroduceProfile valueBillClient={valueBillClient}/> */}
      </View>
      {/* <RecentOrder valueBillClient={valueBillClient}/> */}
    </View>
  )
}

export default ProfileStaffScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex:1
  },
  headingContainer: {
    width: '100%',
    height: 250,
    backgroundColor: Color.primary200,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  edit: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    overflow: 'hidden',
    position: "absolute",
    right: 10,
    top: 10,
  },
  
  
})