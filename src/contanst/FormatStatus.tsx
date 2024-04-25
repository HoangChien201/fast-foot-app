export function Status(status: number) {
    switch (status) {
        case 0:
            return 'Unconfimred'
        case 1:
            return 'Confimred'
        case 2:
            return 'Waiting for delivering'
        case 3:
            return 'Delivering'
        case 4:
            return 'Delivered'
        case 5:
            return 'Cancle'
    }
}

export function TextButtonStatus(status?: number) {
    switch (status) {
        case 0:
        case 2:
            return 'Accept'
        case 1:
            return 'Next'
        case 3:
            return 'Done'
        default:
            return ''
    }
}