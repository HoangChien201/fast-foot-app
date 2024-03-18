import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Image, Button, 
    Pressable, TextInput, Alert, TouchableOpacity,
    Linking
} from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { getApps, GetAppResult } from 'react-native-map-link';
import axios from 'axios';

import { Color } from '../../contanst/color';
import InformationUser from '../../component/ui/shipper/InformationUser';
import { RouteProp } from '@react-navigation/native';
import { billDeliveryResType } from '../../component/store/billDeliveryReducer';
import { getBillDeliveryHTTP } from '../../http/BillHTTP';
import { formatLocation } from '../../contanst/FormatAddress';

const ORIGIN = { latitude: 10.855552, longitude: 106.655658 };
const DESTINATION = { latitude: 10.837466, longitude: 106.671066 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyDQx98JXENBCkBNPYl89xN1S8RBtcP87cE';

interface OrderShipperDetailProp {
    route: RouteProp<{ params: { data: string } }, 'params'>
}

const OrderShipperDetail: React.FC<OrderShipperDetailProp> = ({ route }) => {
    //gọi api bill
    //lấy tọa độ của user trong bill
    //hiện bản đồ
    const idBill = route?.params?.data

    const [isModalInformation, setIsModalInfomation] = useState(true)
    const [availableApps, setAvailableApps] = useState<GetAppResult[]>([]);

    const [address, setAddress] = useState('Phường 13, Gò Vấp, Thành phố Hồ Chí Minh, Việt Nam');
    const [coordinates, setCoordinates] = useState({ latitude: '', longitude: '' });

    const [bill, setBill] = useState<billDeliveryResType>()
    useEffect(() => {
        (async () => {
            const billRes = await getBillDeliveryHTTP(idBill);
            setBill(billRes)
            handleGetCoordinates(billRes)

        })()
    }, []);


    //lấy vị trí user
    const handleGetCoordinates = async (bill: billDeliveryResType) => {
        try {
            //lấy tọa độ bản đồ
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(`${bill?.deliveryLocation.detail},${bill?.deliveryLocation.ward}
                ,${bill?.deliveryLocation.district},${bill?.deliveryLocation.city} `)
                }`
            );

            if (response.data.length > 0) {
                const { lat, lon } = response.data[0];
                setCoordinates({ latitude: parseFloat(lat), longitude: parseFloat(lon) });

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

            <View style={styles.informationContainer}>
                {
                    bill &&
                    <View>
                        <InformationUser bill={bill}/>
                        <View style={styles.informationShipmentContainer}>
                            <View style={styles.shipmentWrapper}>
                                <Text style={styles.shipmentText}>Shipment #</Text>
                                <Text style={styles.idText}>{bill._id}</Text>
                            </View>
                        </View>

                        <View style={styles.locationDeliveryContainer}>
                            <View style={styles.addressWrapper}>
                                <Image
                                    source={require('../../assets/images/icon/icon-restaurant.png')}
                                    style={styles.icon}
                                    resizeMode='contain' />
                                <Text style={styles.address}>Quán</Text>
                            </View>

                            <View style={styles.addressWrapper}>
                                <Image
                                    source={require('../../assets/images/icon/icon-location.png')}
                                    style={styles.icon}
                                    resizeMode='contain' />
                                <Text style={styles.address}>{formatLocation(bill.deliveryLocation)}</Text>

                            </View>
                        </View>
                    </View>
                }
                </View>


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
        height: 300,
        width: '100%',
        position: "absolute",
        bottom: 0,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        paddingHorizontal: 24

    },
    informationShipmentContainer: {
        height: 80,
        width: '100%',
        borderColor: '#000',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        justifyContent: "center"
    },
    shipmentWrapper: {
        alignItems: 'center'
    },
    shipmentText: {
        color: "#000",
        fontFamily: "Klarna Text",
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "700",
    },
    idText: {
        color: "#6D3805",
        fontFamily: "Klarna Text",
        fontSize: 18,
        fontStyle: "normal",
        fontWeight: "700",
    },
    locationDeliveryContainer: {},
    addressWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    address: {
        color: Color.primary200,
        fontFamily: "Klarna Text",
        fontSize: 15,
        fontStyle: "normal",
        fontWeight: "400",
        flex: 1
    },
    icon: {
        width: 24,
        height: 24,
        marginRight: 10
    },

})