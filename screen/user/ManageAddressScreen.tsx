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
import SelectDownDistrict from "../../component/ui/address/SelectDownDistrict";
import SelectDownWard from "../../component/ui/address/SelectDownWard";

function ManageAddressScreen({ route }: any) {
    const navigation: NavigationProp<ReactNavigation.RootParamList> = useNavigation()
    const type = route.params?.type
    const data = route.params?.data
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
    useEffect(() => {
        setValueAddress((prevValue) => {
            return { ...prevValue, ...data }
        })

    }, [])
    function OnSubmit() {
        const { phone, nameRecipient, city, district, addressType, detail, ward } = { ...valueAddress }

        if (!phone || !nameRecipient || !city || !district || !addressType || !detail || !ward) {
            Alert.alert("Notification", "All fields need to be entered");
            return;
        }
        else {
            navigation.navigate("PaymentScreen", {
                address: valueAddress
            })
        }
    }

    function updateValue(type: string, value: string) {
        setValueAddress(prevValue => {
            return { ...prevValue, [type]: value }
        })
    }

    return (
        <KeyboardAvoidingView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View>
                        <TextInput style={[styles.input]} placeholder="Recipient's name"
                            placeholderTextColor={Color.textBrown1}
                            value={valueAddress.nameRecipient}
                            onChangeText={(text) => updateValue("nameRecipient", text)}
                        />
                        <TextInput style={[styles.input]} placeholder='Phone'
                            placeholderTextColor={Color.textBrown1}
                            value={valueAddress.phone}
                            onChangeText={(text) => updateValue("phone", text)}
                        />

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

                        <TextInput style={[styles.input]} placeholder='Detail'
                            placeholderTextColor={Color.textBrown1}
                            value={valueAddress.detail}
                            onChangeText={(text) => updateValue("detail", text)}

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
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        marginTop: 74,
        flex: 1,
        justifyContent: "space-between"
    },
    title: {
        color: Color.textBrown,
        fontWeight: 'bold',
        fontSize: 18
    },
    input: {
        fontSize: 16,
        height: 50,
        backgroundColor: Color.backgroundInput,
        borderRadius: 5,
        marginBottom: 35,
        paddingHorizontal: 27,
        width: '100%'
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
    }
})
