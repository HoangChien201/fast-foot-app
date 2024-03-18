import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Color } from '../../../contanst/color'
import AvatarUserComponet from '../../../component/ui/profile/AvatarUserComponet'
import FormEditProfile from '../../../component/ui/profile/FormEditProfile'
import { updateClientHTTP, updateUserHTTP } from '../../../http/UserHTTP'
import { useSelector } from 'react-redux'
import { RootState } from '../../../component/store/store'

export type valueFormEdit = {
  fullname: string,
  gender: string,
  avatar: string,
  phone:string
}

const EditProfileScreen = () => {
  const navigation = useNavigation()

  const user=useSelector((state:RootState)=>state.user.value)

  const [valueForm, setValueForm] = useState<valueFormEdit>({
    fullname:user?.client?.fullname ? user?.client?.fullname :'',
    gender: user?.client?.gender ? user?.client?.gender : '',
    avatar: user?.client?.avatar ? user?.client?.avatar : '',
    phone:user?.client?.phone ? user?.client?.phone : ''
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity style={styles.buttonSave} onPress={onSubmit}>
            <Text style={{ color: '#000' }}>Lưu</Text>
          </TouchableOpacity>
        )
      }
    })
  }, [])

  function updateValue(key:string,value:string,) {
    setValueForm(prevValue=>{
      return {...prevValue,[key]:value}
    })
  }

  async function onSubmit(){

    try {
      console.log(valueForm);
      if(user?.client){
        const result= await updateClientHTTP(user?.client?._id,valueForm);
      }
    } catch (error) {
      console.log(error);
      
    }
    
  }

  return (
    <View style={styles.container}>
      <AvatarUserComponet updateValue={updateValue} valueForm={valueForm}/>
      <FormEditProfile updateValue={updateValue} valueForm={valueForm}/>
    </View>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1
  },
  buttonSave: {
    width: 64,
    height: 25,
    borderRadius: 5,
    backgroundColor: Color.backgroundGray,
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 10
  }
})