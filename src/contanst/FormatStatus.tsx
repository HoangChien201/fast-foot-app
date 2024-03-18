export function Status(status:number){
    switch (status){
        case 0:
            return 'Chưa xác nhận'
        case 1:
            return 'Đã xác nhận'
        case 2:
            return 'Đang giao'
        case 3:
            return 'Đã giao'
    }
}