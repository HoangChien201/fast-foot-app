import { addressDeliveryType, addressType, userType } from "../component/store/userReducer";

export function FormatAddress(valueAddress:addressDeliveryType|null):string{
    if(valueAddress){
        return `    ${valueAddress.nameRecipient} | ${valueAddress.phone}, 
        ${valueAddress.detail}, ${valueAddress.ward}, 
        ${valueAddress.district}, ${valueAddress.city}`
    }
    return ''

}

export function formatLocation(location:addressDeliveryType){
    return `${location.detail}, ${location.ward}, ${location.district}, ${location.city}`
}