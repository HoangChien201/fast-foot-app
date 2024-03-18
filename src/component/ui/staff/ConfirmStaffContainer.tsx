import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Color } from '../../../contanst/color'
import ButtonCustom from '../ButtonCustom'
import { OrderTrackingType, createOrderTrackingHTTP } from '../../../http/OrderTrackingHTTP'
import { SendNotification, socket } from '../../../helper/SocketHandle'
import { Notifications } from 'react-native-notifications'
import { postLocalNotification } from '../../../notifications/Events'

const ConfirmStaffContainer = ({ orderTracking, closeModal }: { orderTracking: OrderTrackingType, closeModal: any }) => {
    const statusOT = orderTracking.status
    async function onCancle() {
        const notiCancle: SendNotification = {
            to: orderTracking.user.id,
            content: "Đơn hàng bạn bị hủy"
        }
        postLocalNotification({
            title:'Đơn hàng bị hủy',
            body:'Vậy đó'
        })
        
        const hasPermissions: boolean = await Notifications.isRegisteredForRemoteNotifications();
        console.log(hasPermissions);
        // const body={
        //     user_id:orderTracking.user.id,
        //     order_id:orderTracking.order.id,
        //     status:4
        // }
        // await createOrderTrackingHTTP(body)
        socket.emit('notification', notiCancle)

    }
    async function onConfirm() {
        const statusCurrent = statusOT + 1


        const body = {
            user_id: orderTracking.user.id,
            order_id: orderTracking.order.id,
            status: statusCurrent
        }
        await createOrderTrackingHTTP(body)
        closeModal()

        const notiCancle: SendNotification = {
            to: orderTracking.user.id,
        }
        //xử lý gửi thông báo theo trạng thái
        switch (statusCurrent) {
            case 1:
                socket.emit('notification', { ...notiCancle, content: 'Đơn hàng của bạn đang được chuẩn bị' })
                break;

            case 2:
                socket.emit('notification', { ...notiCancle, content: 'Đơn hàng của bạn đã được giao cho tài xế' })
                break;
        }
    }
    return (
        <View style={styles.buttonContainer}>
            <View style={styles.btnCancle}>
                <ButtonCustom children='Hủy' onPress={onCancle} />
            </View>
            <View style={styles.btnConfirm}>
                <ButtonCustom children={statusOT === 0 ? 'Nhận đơn' : 'Giao hàng'} onPress={onConfirm} />
            </View>
        </View>
    )
}

export default ConfirmStaffContainer

const styles = StyleSheet.create({
    buttonContainer: {
        height: 60,
        width: '100%',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 5,
        position: 'absolute',
        bottom: 0

    },
    btnCancle: {
        backgroundColor: "red",
        flex: 0.3,
        borderRadius: 30
    },
    btnConfirm: {
        backgroundColor: Color.statusOnTheWay,
        borderRadius: 30,
        flex: 0.6
    }
})