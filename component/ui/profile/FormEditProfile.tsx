import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useState, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Input from '../../../screen/user/user/component/Input'
import { RootState } from '../../store/store'

const FormEditProfile = ({ fieldInValid, onSubmit }) => {

    const navigation = useNavigation();
    const { userName, fullName, email, phone, bio, website,avatar } = fieldInValid
    const user = useSelector((state:RootState) => state.user.value)
    let useInfor={}
    if(user?.role==='client'){
        useInfor={...user.client}
    }
    else if(user?.role==='staff'){
        useInfor={...user.staff}
    }

    const [valueField, setValueField] = useState({
        fullName: useInfor.fullname,
        age: useInfor.age,
        phone: useInfor.phone,
        gender: useInfor.gender,
        avatar: "https://fpoly-hcm.herokuapp.com/uploads/1696859575209-avatar-2-title-1651137698.jpg"
    })

    function OnChangeText(type, value) {
        setValueField((valuePrev) => {
            return { ...valuePrev, [type]: value }
        })
    }

    function OnUpdateValue() {
        onSubmit(valueField)

    }
    return (
        <View style={styles.container}>
            <Input lable='Fullname' value={valueField.fullName} onChangeTextField={OnChangeText.bind(this, 'userName')} />
            <Input lable='Gender' value={valueField.gender} onChangeTextField={OnChangeText.bind(this, 'fullName')} />
            <Input lable='Age' inValid={!email} value={valueField.age} onChangeTextField={OnChangeText.bind(this, 'email')} requireField />
            <Input lable='Phone' inValid={!phone} value={valueField.phone} onChangeTextField={OnChangeText.bind(this, 'phone')} />
        </View>
    )
}

export default FormEditProfile

const styles = StyleSheet.create({
    container: {
    }
})