import { SafeAreaView, View, Text, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import React, { useState, useEffect } from "react";
import { Color } from "../../contanst/color";
import AddressTypeComponent from "../../component/ui/address/AddressTypeComponent";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";
import { Alert } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { PROVINCES_VIETNAM_API } from "../../contanst/ProvinceVietNamAPI";
import SelectDownComponent from "../../component/ui/address/SelectDownComponent";
import Input from "./component/Input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../component/store/store";
import { updateUser } from "../../component/store/userReducer";
import { ALERT_TYPE, AlertNotificationRoot, Dialog, Toast } from "react-native-alert-notification";
import { setLocationDelivery } from "../../component/store/locationDelireryReducer";

function ManageAddressScreen({ route }: any) {
    const navigation: NavigationProp<ReactNavigation.RootParamList> = useNavigation()
    const dispatch = useDispatch()
    // const user = useSelector((state: RootState) => state.user.value)
    // const type = route.params?.type


    // const data = route.params?.data
    const [valueAddress, setValueAddress] = useState({
        nameRecipient: '',
        phone: '',
        province: '',
        district: '',
        detail: '',
        ward: ''
    })

    const [indexValueAddress, setIndexValueAddress] = useState(
        {
            province: null,
            district: null,
        }
    )
    async function OnSubmit() {
        const { phone, nameRecipient, province, district, detail, ward } = { ...valueAddress }
            if(!phone || !nameRecipient || !province || !district || !detail || !ward){
                
                Dialog.show({
                    type: ALERT_TYPE.WARNING,
                    title: 'Warning',
                    textBody: 'Have the field is empty',
                    button: 'OK',
                  })

                  return;
            }

            dispatch(setLocationDelivery(valueAddress))
            navigation.goBack();
    }

    function updateValue(value:any) {
        setValueAddress(prevValue => {
            return { ...prevValue, ...value }
        })
    }
        
    return (

        <KeyboardAvoidingView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.inputContainer}>
                    <Input placeholder="Recipient's name"
                        placeholderTextColor={Color.placeholderTextColor}
                        value={valueAddress.nameRecipient}
                        onChangeTextField={(text: string) => updateValue({"nameRecipient":text})}
                    />
                    <Input placeholder='Phone'
                        placeholderTextColor={Color.placeholderTextColor}
                        value={valueAddress.phone}
                        onChangeTextField={(text: string) => updateValue({"phone": text})}
                    />

                    {/* province */}
                    <SelectDownComponent
                        data={PROVINCES_VIETNAM_API}
                        updateValue={updateValue}
                        setIndexProvince={setIndexValueAddress}
                        type="province"
                    />
                    {/* district */}
                    <SelectDownComponent
                        data={PROVINCES_VIETNAM_API}
                        updateValue={updateValue}
                        setIndexProvince={setIndexValueAddress}
                        type="district"
                        province={indexValueAddress.province}
                        disabled={indexValueAddress.province ===0 ? false : indexValueAddress.province}
                    />

                    {/* ward */}

                    <SelectDownComponent
                        data={PROVINCES_VIETNAM_API}
                        updateValue={updateValue}
                        setIndexProvince={setIndexValueAddress}
                        type="ward"
                        province={indexValueAddress.province}
                        district={indexValueAddress.district}
                        disabled={indexValueAddress.district === 0 ? false : indexValueAddress.district}

                    />

                    <Input placeholder='Detail'
                        placeholderTextColor={Color.placeholderTextColor}
                        value={valueAddress.detail}
                        onChangeTextField={(text: string) => updateValue({"detail":text})}
                    />


                </View>
                <TouchableOpacity style={styles.buttonSubmit} onPress={OnSubmit}>
                    <Text style={styles.textButton}>Complete</Text>
                </TouchableOpacity>
            </ScrollView>

        </KeyboardAvoidingView>

    );
}

export default ManageAddressScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.backgroundGray,
        paddingHorizontal: 16,
        paddingTop:20,
        flex: 1,
        justifyContent: "space-between",
    },
    title: {
        color: Color.textBrown,
        fontWeight: 'bold',
        fontSize: 18
    },
    buttonSubmit: {
        width: '100%',
        height: 60,
        borderRadius: 30,
        backgroundColor: Color.primary200,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        marginBottom: 16

    },
    textButton: {
        fontSize: 18,
        color: '#fff',
        marginStart: 10,
        fontWeight: 'bold'
    },
    inputContainer: {
        height: 450,
        justifyContent: 'flex-start'
    }

})
