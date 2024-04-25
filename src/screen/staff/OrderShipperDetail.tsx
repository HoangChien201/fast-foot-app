import React, { useEffect, useState } from 'react'
import {
    StyleSheet, View,
    Pressable, Alert,
    FlatList,
    ScrollView,
    Text,
} from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import { getApps, GetAppResult } from 'react-native-map-link';
import axios from 'axios';

import InformationUser from '../../component/ui/shipper/InformationUser';
import { RouteProp } from '@react-navigation/native';
import { order_type } from '../../component/store/billDeliveryReducer';
import { getOneOrderHTTP } from '../../http/BillHTTP';
import InfomationOrder from '../../component/ui/shipper/InfomationOrder';
import OrderDetailItem from '../../component/ui/order-complete/OrderDetailItem';
import ConfirmStaffContainer from '../../component/ui/staff/ConfirmStaffContainer';
import { OrderTrackingType, getOneOrderTrackingHTTP } from '../../http/OrderTrackingHTTP';
import ModalBottomTabSheetComponent from '../../component/ui/ModalBottomTabSheetComponent';

const ORIGIN = { latitude: 10.855552, longitude: 106.655658 };
const DESTINATION = { latitude: 10.837466, longitude: 106.671066 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyDQx98JXENBCkBNPYl89xN1S8RBtcP87cE';

interface OrderShipperDetailProp {
    route: RouteProp<{ params: { data: string } }, 'params'>,
    navigation: any
}

const OrderShipperDetail: React.FC<OrderShipperDetailProp> = ({ route, navigation }) => {
    //gọi api bill
    //lấy tọa độ của user trong bill
    //hiện bản đồ
    const idOrderParam = route?.params?.data

    const [isModalInformation, setIsModalInfomation] = useState(true)
    const [availableApps, setAvailableApps] = useState<GetAppResult[]>([]);

    const [address, setAddress] = useState('Phường 13, Gò Vấp, Thành phố Hồ Chí Minh, Việt Nam');
    const [coordinates, setCoordinates] = useState({ latitude: '', longitude: '' });

    const [orderTracking, setOrderTracking] = useState<OrderTrackingType>()
    const [order, setOrder] = useState<order_type>()
    useEffect(() => {
        (async () => {
            const orderTracking = await getOneOrderTrackingHTTP(parseInt(idOrderParam));
            setOrderTracking(orderTracking)
            const order = await getOneOrderHTTP(parseInt(idOrderParam));

            setOrder(order)

            handleGetCoordinates(order)

        })()
    }, []);


    //lấy vị trí user
    const handleGetCoordinates = async (order: order_type) => {
        try {
            const indexChar=order.address.indexOf('|')
            const address=order.address.slice(indexChar)
            //lấy tọa độ bản đồ
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)
                }`
            );

            if (response.data.length > 0) {
                const { lat, lon } = response.data[0];
                setCoordinates({ latitude: lat, longitude: lon });

                const result = await getApps({
                    latitude: lat,
                    longitude: lon,
                    sourceLatitude: ORIGIN.latitude, // optionally specify starting location for directions
                    sourceLongitude: ORIGIN.longitude,
                    googleForceLatLon: false, // optionally force GoogleMaps to use the latlon for the query instead of the title
                    alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
                    appsWhiteList: ['google-maps'],
                    directionsMode: 'car',
                    // optionally you can set which apps to show (default: will show all supported apps installed on device)
                });
                setAvailableApps(result);
            } else {
                Alert.alert('Location Not Found', 'Please enter a valid address.');
            }
        } catch (error) {
            console.error('Error fetching coordinates:', error);
        }
    };
    //

    function InformationContainer() {
        if (!order) return <Text>Loading !!!</Text>
        return (
            <ScrollView
                style={styles.informationContainer}
                showsVerticalScrollIndicator={false}
            >
                <View >
                    <InformationUser user={order.user} />
                    <InfomationOrder order={order} />
                    {
                        orderTracking && ![4, 5].includes(orderTracking?.status) &&
                        <ConfirmStaffContainer order_id={order.id} closeModal={() => { navigation.goBack() }} />
                    }

                </View>
            </ScrollView>
        )
    }


    return (
        <View style={styles.container}>
            {availableApps.map(({ icon, name, id, open }) => (
                <Pressable style={{ flex: 1 }} key={id} onLongPress={open}>
                    <MapView
                        style={{ flex: 1 }}
                        region={{
                            latitude: coordinates.latitude ? parseFloat(coordinates.latitude) : 10.838006,
                            longitude: coordinates.longitude ? parseFloat(coordinates.longitude) : 106.679501,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                    >
                        {
                            coordinates.latitude && <Marker
                                coordinate={{ latitude: parseFloat(coordinates.latitude), longitude: parseFloat(coordinates.longitude) }}
                                title="Marker Title"
                                description="Marker Description"

                            />
                        }

                    </MapView>
                </Pressable>
            ))}

            <ModalBottomTabSheetComponent children={InformationContainer()} snapPointsProp={['4%','40%','50%']} />



        </View>
    )
}

export default OrderShipperDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    informationContainer: {
        backgroundColor: '#fff',
        height: '100%',
        width: '100%',
        position: "absolute",
        bottom: 0,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        paddingHorizontal: 24

    },

})