import { cartItemType, cartType } from "../component/store/modalAddCartReducer"
import { OptionIsSelectedType, OptionType, productType} from "../component/store/productReducer"
import { OptionDetailType } from "../component/store/optionDetailReducer"

export function SumPriceOptionAProduct(optionSelected: OptionIsSelectedType,optionDetailRoot:Array<OptionDetailType>): number {
    
    if (optionSelected) {
        //lấy id Option đã chọn
        let idOptions: string[] = []
        idOptions = Object.getOwnPropertyNames(optionSelected).map((item) => {
            return Object.getOwnPropertyDescriptor(optionSelected, item)?.value

        })

        //lấy các option đã chọn
        let optionsSelected = optionDetailRoot.filter((optionDetail) => {
            //nối mảng [['2'],['5]] bằng concat
            //tìm option có trùng id
            if (idOptions.concat(...idOptions).includes(optionDetail._id)) {
                return optionDetail
            }

        })

        let sumOption = optionsSelected.reduce((prevValue, currentValue) => {
            return prevValue += parseFloat(currentValue.price ? currentValue.price : '0')
        }, 0)

        return parseFloat(sumOption.toFixed(2));
    }

    return 0;
}

export function TotalPriceCart(listProduct:Array<productType>,listCart:Array<cartItemType>,optionDetail:Array<OptionDetailType>):number{
    let totalPrice=0;
    totalPrice=listCart.reduce((prevTotal,currentValue)=>{
        const product=listProduct.find(product=>product._id===currentValue.product)
        if(product)
            return prevTotal+=parseInt(currentValue.quantity.toString())*parseFloat(product?.price) + SumPriceOptionAProduct(currentValue.optionIsSelected,optionDetail)

        return 0
    },0)
    return totalPrice;
}

