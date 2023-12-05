import AsyncStorage from "@react-native-async-storage/async-storage";

export const setToken = async (key:string, token:string) => {
    try {
        await AsyncStorage.setItem(key, token)
    } catch (error) {
        console.log(error)
    }
}

export const getToken = async (key:string) => {
    try {
        const token = await AsyncStorage.getItem(key)
        return token
    } catch (error) {
        console.log(error)
    }
}