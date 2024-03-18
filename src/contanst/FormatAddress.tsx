import { addressDeliveryType, addressType, userType } from "../component/store/userReducer";

export function FormatAddressRecipient(user:userType):string{
    if(user?.address){
        return `${user.fullname}, ${user.phone}\n${user.address}`
    }
    return ''

}

export function formatLocation(location:addressDeliveryType){
    return `${location.detail}, ${location.ward}, ${location.district}, ${location.city}`
}