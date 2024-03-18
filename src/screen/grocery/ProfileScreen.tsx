import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import { Color } from '../../contanst/color';
import ButtonIcon from '../../component/ui/ButtonIcon';
import IntroduceProfile from '../../component/ui/profile/IntroduceProfile';
import ProfileUser from '../../component/ui/profile/ProfileUser';
import RecentOrder from '../../component/ui/profile/RecentOrder';
import { billDeliveryResType } from '../../component/store/billDeliveryReducer';
import { useSelector } from 'react-redux';
import { RootState } from '../../component/store/store';
import { getAllBillDeliveryByClientHTTP } from '../../http/BillHTTP';
import OptionProfile from '../../component/ui/profile/OptionProfile';
import ButtonCustom from '../../component/ui/ButtonCustom';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation=useNavigation();
  const user = useSelector((state: RootState) => state.user.value)
  const [valueBillClient, setValueBillClient] = useState<billDeliveryResType[]>([])

  function updateOnPressHandle(){

  }
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Thông tin cá nhân</Text>
          <TouchableOpacity onPress={()=>navigation.navigate('EditProfileScreen')}>
            <Text style={styles.edit}>Chỉnh sửa</Text>
          </TouchableOpacity>
        </View>
        <ProfileUser />
        <OptionProfile />

        <ButtonCustom children='Update' textColor='#fff' onPress={updateOnPressHandle} style={styles.button}/>
      </View>
    </ScrollView>
  )
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    backgroundColor:Color.backgroundGray
  },
  headingContainer: {
    width: '100%',
    height: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: "space-between",
    marginBottom: 34
  },
  heading: {
    color: "#000",
    fontSize: 18,
    fontWeight:'700'
  },
  edit: {
    color: Color.primary200,
    fontSize: 15
  },
  button:{
    height:50,
    backgroundColor:Color.primary200,
    marginVertical:44,
    borderRadius:40
  }

})