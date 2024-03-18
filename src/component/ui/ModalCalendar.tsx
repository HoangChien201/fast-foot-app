import { StyleSheet, Text, View, Image, Modal, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import CalendarPicker, { CalendarPickerProps, MomentParsable } from 'react-native-calendar-picker';

const ModalCalendar = ({ isVisible, onSubmit }: { isVisible: boolean, onSubmit: any }) => {
    const [valueCalendar,setValueCalendar]=useState('')
    function onDateChange(date: MomentParsable) {
        setValueCalendar(date as typeof String)

    }
    function OnSubmit() {
        onSubmit(valueCalendar)
    }
    return (
        <Modal
            visible={isVisible}
            animationType='slide'
        >
            <View style={styles.container}>
                <TouchableOpacity onPress={OnSubmit} style={styles.iconTick}>
                    <Image source={require('../../assets/images/icon/icon-tick-green.png')} style={{ margin: 16 }} />
                </TouchableOpacity>
                <CalendarPicker
                    onDateChange={onDateChange}
                />
            </View>
        </Modal>
    )
}

export default ModalCalendar

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end',
        flex:1,
    },
    iconTick: {
        width: 30,
        marginEnd:24
    }
})