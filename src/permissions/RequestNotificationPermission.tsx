import { PermissionsAndroid, Platform } from "react-native";

export default async function RequestNotificationPermission() {
    if (Platform.OS === "android") {
      try {
        PermissionsAndroid.check('android.permission.POST_NOTIFICATIONS').then(
          response => {
            if (!response) {
              PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS', {
                title: 'Thông báo',
                message:
                  'Ứng dụng cần truy cập thông báo ' +
                  'Bạn có thể cập nhật',
                buttonNeutral: 'Nhắc tôi sau',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              })
            }
          }
        ).catch(
          err => {
            console.log("Notification Error=====>", err);
          }
        )
      } catch (err) {
        console.log(err);
      }
    }
  };