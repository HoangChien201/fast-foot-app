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
import SelectDownProvince from "../../component/ui/address/SelectDownProvince";
import Input from "./component/Input";
import { addAddressHTTP, updateClientHTTP } from "../../http/UserHTTP";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../component/store/store";
import { updateUser } from "../../component/store/userReducer";

function ManageAddressScreen({ route }: any) {
    const navigation: NavigationProp<ReactNavigation.RootParamList> = useNavigation()
    const dispatch = useDispatch()
    const user = useSelector((state: RootState) => state.user.value)
    const type = route.params?.type


    // const data = route.params?.data
    const [valueAddress, setValueAddress] = useState({
        nameRecipient: '',
        phone: '',
        city: '',
        district: '',
        addressType: '',
        detail: '',
        ward: ''
    })

    const [indexValueAddress, setIndexValueAddress] = useState(
        {
            province: 0,
            district: 0,
        }
    )
    // useEffect(() => {
    //     setValueAddress((prevValue) => {
    //         return { ...prevValue, ...data }
    //     })

    // }, [])
    async function OnSubmit() {
        const { phone, nameRecipient, city, district, addressType, detail, ward } = { ...valueAddress }



        if (type === 'address-delivery') {
            if (!phone || !nameRecipient || !city || !district || !addressType || !detail || !ward) {
                Alert.alert("Notification", "All fields need to be entered");
                return;
            } else {
                navigation.navigate("PaymentScreen", {
                    address: valueAddress
                })
            }
        }
        else {
            if (!city || !district || !addressType || !detail || !ward) {
                Alert.alert("Notification", "All fields need to be entered");
                return;
            } else {
                const { nameRecipient, phone, ...address } = valueAddress
                if (user?.client) {
                    const addressReq = { ...address, client: user.client._id }
                    // const result = await addAddressHTTP(addressReq)

                }
                dispatch(updateUser({ address: address }))
                navigation.goBack()
            }
        }
    }

    function updateValue(type: string, value: string) {
        setValueAddress(prevValue => {
            return { ...prevValue, [type]: value }
        })
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View >
                    <View style={styles.inputContainer}>
                        {
                            type === 'delivery-address' &&
                            <View>
                                <Input placeholder="Tên người nhận"
                                    placeholderTextColor={Color.placeholderTextColor}
                                    value={valueAddress.nameRecipient}
                                    onChangeTextField={(text: string) => updateValue("nameRecipient", text)}
                                />
                                <Input placeholder='Điện thoại'
                                    placeholderTextColor={Color.placeholderTextColor}
                                    value={valueAddress.phone}
                                    onChangeTextField={(text: string) => updateValue("phone", text)}
                                />
                            </View>
                        }

                        {/* province */}
                        <SelectDownProvince
                            data={PROVINCES_VIETNAM_API}
                            updateValue={updateValue}
                            setIndexProvince={setIndexValueAddress}
                            type="province"
                        />
                        {/* district */}
                        <SelectDownProvince
                            data={PROVINCES_VIETNAM_API}
                            updateValue={updateValue}
                            setIndexProvince={setIndexValueAddress}
                            type="district"
                            province={indexValueAddress.province}
                        />

                        {/* ward */}
                        <SelectDownProvince
                            data={PROVINCES_VIETNAM_API}
                            updateValue={updateValue}
                            setIndexProvince={setIndexValueAddress}
                            type="ward"
                            province={indexValueAddress.province}
                            district={indexValueAddress.district}

                        />

                        <Input placeholder='Chi tiết'
                            placeholderTextColor={Color.placeholderTextColor}
                            value={valueAddress.detail}
                            onChangeTextField={(text: string) => updateValue("detail", text)}
                        />

                        <AddressTypeComponent updateValueAddress={updateValue} />

                    </View>
                    <TouchableOpacity style={styles.buttonSubmit} onPress={OnSubmit}>
                        <Text style={styles.textButton}>Add</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </KeyboardAvoidingView>
    );
}

export default ManageAddressScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.backgroundGray,
        paddingHorizontal: 16,
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
        backgroundColor: "red",
        height: 500,
        justifyContent: "space-around"
    }

})
