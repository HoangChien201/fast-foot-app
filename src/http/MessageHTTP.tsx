import { MessageRequest, MessageRespone } from "../component/ui/chat/TextingComponent";
import AxiosInstance from "./AxiosInstance";

export const getMessageHttp = async (user_id_receice:number,user_id_send:number) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = `/message/get-message-by-room?user_id_receice=${user_id_receice}&user_id_send=${user_id_send}`
        const response:Array<MessageRespone> = await axiosInstance.get(url);
        return response;
    } catch (error) {
        console.log('lấy tin nhắn trong room bị lỗi');

        throw error;
    }
}