import { locationDeliveryType } from "../component/store/locationDelireryReducer";
import { addressDeliveryType, addressType, userType } from "../component/store/userReducer";

export function FormatAddressRecipient(location:locationDeliveryType){
    return `${location.nameRecipient} ${location.phone}|${location.detail}, ${location.ward}, ${location.district}, ${location.province}`
}