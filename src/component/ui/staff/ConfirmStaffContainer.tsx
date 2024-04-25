import { Alert, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Color } from '../../../contanst/color'
import ButtonCustom from '../ButtonCustom'
import { OrderTrackingType, createOrderTrackingHTTP, getOneOrderTrackingHTTP } from '../../../http/OrderTrackingHTTP'
import { SendNotification, socket } from '../../../helper/SocketHandle'
import { Notifications } from 'react-native-notifications'
import { postLocalNotification } from '../../../notifications/Events'
import { TextButtonStatus } from '../../../contanst/FormatStatus'
import { userType } from '../../store/userReducer'
import { RootState } from '../../store/store'
import { useSelector } from 'react-redux'
import { getOneOrderHTTP } from '../../../http/BillHTTP'

const ConfirmStaffContainer = ({ order_id, closeModal }: { order_id: number, closeModal?: any }) => {
    const [orderTracking, setOrderTracking] = useState<OrderTrackingType>()
    const user: userType|null = useSelector((state: RootState) => state.user.value)
    useEffect(() => {
        (async function getOrderTrackingAPI() {
            const respone = await getOneOrderTrackingHTTP(order_id)
            setOrderTracking(respone)
        })()
    }, [])

    const statusOT = orderTracking && orderTracking.status
    async function onCancle() {
        if (orderTracking) {
            const order = await getOneOrderHTTP(orderTracking.order.id)
            if (order) {
                const notiCancle: SendNotification = {
                    to: order.user.id,
                    content: "Đơn hàng bạn bị hủy"
                }
                const body = {
                    user_id: orderTracking.user.id,
                    order_id: orderTracking.order.id,
                    status: 5
                }
                await createOrderTrackingHTTP(body)
                socket.emit('notification', notiCancle)
                closeModal()

            }

        }

    }
    async function onConfirm() {
        try {
            if(!user) return
            if (statusOT || statusOT === 0 && orderTracking) {
                const statusCurrent = statusOT + 1
                const body = {
                    user_id: user.id,
                    order_id: orderTracking.order.id,
                    status: statusCurrent
                }
                await createOrderTrackingHTTP(body)

                const order = await getOneOrderHTTP(orderTracking.order.id)
                if (order) {

                    //xử lý gửi thông báo theo trạng thái
                    switch (statusCurrent) {
                        case 1:
                            socket.emit('notification', {
                                to: order.user.id,
                                content: 'Your order is confirmed'
                            })
                            break;

                        case 2:
                            //gửi thông báo cho shipper
                            socket.emit('notification', {
                                to: 'shipper',
                                content: 'Có đơn hàng được giao cho bạn'
                            })
                            break;
                        case 3:
                            socket.emit('notification', {
                                to: order.user.id,
                                content: 'Your order is delivering'
                            })
                            break;
                        case 4:
                            socket.emit('notification', {
                                to: order.user.id,
                                content: 'Your order is delivered'
                            })
                            break;
                    }
                }
                ToastAndroid.show("Confirm success", ToastAndroid.SHORT);
                closeModal()

            }
        } catch (error) {
            ToastAndroid.show("Confirm failed" + error, ToastAndroid.SHORT);
            closeModal()

        }

    }

    return (
        <View style={styles.buttonContainer}>
            <View style={styles.btnCancle}>
                <ButtonCustom children='Cancle' onPress={onCancle} />
            </View>
            <View style={styles.btnConfirm}>
                <ButtonCustom children={TextButtonStatus(statusOT)} onPress={onConfirm} />
            </View>
        </View>
    )
}

export default ConfirmStaffContainer

const styles = StyleSheet.create({
    buttonContainer: {
        height: 50,
        width: '100%',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 5,
        marginTop:10

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