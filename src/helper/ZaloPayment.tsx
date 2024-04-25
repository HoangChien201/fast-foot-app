import { NativeEventEmitter } from "react-native";
import PayZaloBridge from "../module/PayZaloBridge";


export const EventPayZalo = (callBackSuccess:any,callBackFail:any) => {
  const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);
  payZaloBridgeEmitter.addListener(
    'EventPayZalo', 
    (data) => {
      if (data.returnCode == 1) {
        callBackSuccess()
      } else {
        callBackFail()
      }
    }
  );
  
}
