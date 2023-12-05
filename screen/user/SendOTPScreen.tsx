import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useState,useMemo, useEffect } from 'react'
import ButtonCustom from '../../component/ui/ButtonCustom'
import { Color } from '../../contanst/color'
import { RouteProp } from '@react-navigation/native'
import { navigationType } from '../../component/navigation/ManageNavigation'
import { validateOTP } from '../../http/UserHTTP'

interface SendOTPScreenProp {
  route: RouteProp<{ params: { email: string } }, 'params'>
  navigation: navigationType
}


const SendOTPScreen: React.FC<SendOTPScreenProp> = ({ route, navigation }) => {
  const email = route.params?.email
  const [duration, setDuration] = useState(60)
  const [valueOTP, setValueOTP] = useState({
    1: '',
    2: '',
    3: '',
    4: '',
    5: '',
    6: '',

  })

  useEffect(()=>{
    const durationTime=setTimeout(()=>{
      setDuration(d=>d-1)
    },1000)
    if(!durationTime) clearTimeout(durationTime)
  },[duration])

  function onSubmit() {
    if (duration <= 0) {
      Alert.alert("Notification", "Time out")
    }
    else {
      //sử lí gửi otp
      try {
        (async function validateOTPUser() {
          const otp = Object.values(valueOTP)

          const result = await validateOTP(email, otp.join(''))
          if(result){
            navigation.navigate("ChangePasswordScreen",{
              id:result.idUser
            })
          }
        })()

      } catch (error) {
        throw error
      }
    }
  }
  function onChangeOTPHanlde(type: string, value: string) {
    setValueOTP((prevValue) => {
      return { ...prevValue, [type]: value }
    })

  }


  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text style={[styles.text, styles.heading]}>OTP Verification</Text>
          <Text style={[styles.text, styles.description]}>Enter the OTP sent to {email}</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} onChangeText={onChangeOTPHanlde.bind(this, '1')} maxLength={1} value={valueOTP[1]} />
          <TextInput style={styles.input} onChangeText={onChangeOTPHanlde.bind(this, '2')} maxLength={1} value={valueOTP[2]} />
          <TextInput style={styles.input} onChangeText={onChangeOTPHanlde.bind(this, '3')} maxLength={1} value={valueOTP[3]} />
          <TextInput style={styles.input} onChangeText={onChangeOTPHanlde.bind(this, '4')} maxLength={1} value={valueOTP[4]} />
          <TextInput style={styles.input} onChangeText={onChangeOTPHanlde.bind(this, '5')} maxLength={1} value={valueOTP[5]} />
          <TextInput style={styles.input} onChangeText={onChangeOTPHanlde.bind(this, '6')} maxLength={1} value={valueOTP[6]} />


        </View>
        {
          duration > 0 ? <Text style={[styles.text, styles.duration]}>Resend code in <Text style={{ color: 'red' }}>{duration}s</Text></Text>
            :
            <Text style={styles.text}>Time out</Text>

        }

      </View>
      <View style={styles.button}>
        <ButtonCustom textColor='#fff' children='Submit' onPress={onSubmit} />
      </View>
    </View>
  )
}

export default SendOTPScreen

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: "space-between",
    flex: 1
  },
  text: {
    color: "#4E4B66",
    /* Display/Medium Bold */
    fontFamily: "poppins",
    letterSpacing: 0.12,
    marginBottom: 8,
    textAlign: 'center'
  },
  heading: {

    fontSize: 32,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 48, /* 150% */
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24, /* 150% */
  },
  lable: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 21, /* 150% */
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 20
  },
  input: {
    height: 50,
    width: 50,
    borderRadius: 6,
    borderColor: "#4E4B66",
    borderWidth: 1,
    fontSize: 20,
    textAlign: 'center'
  },
  button: {
    borderRadius: 6,
    backgroundColor: Color.primary200,
    height: 50
  },
  duration: {

  },
})