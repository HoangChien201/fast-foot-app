export function CURRENCY_VND(price:number){
    return Intl.NumberFormat('vi-VN',{ style: 'currency', currency: 'VND' }).format(price)
}