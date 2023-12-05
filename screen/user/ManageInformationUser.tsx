import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView,Alert } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import FormEditProfile from '../../component/ui/profile/FormEditProfile'



const ManageInformationUser = () => {
    const [fieldInValid, setFieldInvalid] = useState({
        email: true,
        phone: true,
    })
    async function OnSubmit(value) {
        let { fullName, age, phone, gender } = value
        phone = phone.trim()
        const phoneInValid = phone.length > 9

            // try {
            //     const result=await updateProfile(value)
            //     dispatch(SetUser(result.data))
            //     console.log(result);
            //     Alert.alert('Thông báo','Sửa thành công',[{text:'OK'}])
            // } catch (error) {
            //     console.log('errorScreen',error);
            // }

    }
    return (
        <KeyboardAvoidingView
        >
            <ScrollView 
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <View>
                        <View style={styles.avatar}>
                            {/* <Image style={{ width: '100%', height: '100%' }} source={{ uri: user.avatar }} /> */}
                        </View>
                        <View style={styles.iconCameraContainer}>
                            <Image style={{ width: 16, height: 16 }} source={require('../../assets/images/icon/icon-camera.png')} />
                        </View>

                    </View>
                    <View style={styles.form}>
                        <FormEditProfile fieldInValid={fieldInValid} onSubmit={OnSubmit} />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default ManageInformationUser

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 24,
        paddingBottom: 8
    },
    avatar: {
        alignItems: "center",
        height: 120,
        width: 120,
        borderRadius: 60,
        backgroundColor: '#ccc',
        overflow: 'hidden'
    },
    iconCameraContainer: {
        width: 30,
        height: 30,
        backgroundColor: '#1877F2',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        position: 'absolute',
        bottom: 0,
        right: 17
    },
    form: {
        width: '100%',
        flex: 1
    }
})