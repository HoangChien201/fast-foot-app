package com.app;
import android.app.Activity;
import android.content.Intent;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

import vn.zalopay.sdk.ZaloPayError;
import vn.zalopay.sdk.ZaloPaySDK;
import vn.zalopay.sdk.listeners.PayOrderListener;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "App";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled());
  }
  //Cần bắt sự kiện OnNewIntent vì ZaloPay App sẽ gọi deeplink về app của Merchant
  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    ZaloPaySDK.getInstance().onResult(intent);
  }


  //Implement interface PayOrderListener để nhận kết quả thanh toán
  private static class MyZaloPayListener implements PayOrderListener {
    @Override
    public void onPaymentSucceeded(final String transactionId, final String transToken, final String appTransID) {
      //Handle Success
    }

    @Override
    public void onPaymentCanceled(String zpTransToken, String appTransID) {
      //Handle User Canceled
    }

    @Override
    public void onPaymentError(ZaloPayError zaloPayError, String zpTransToken, String appTransID) {
      //Redirect to Zalo/ZaloPay Store when zaloPayError == ZaloPayError.PAYMENT_APP_NOT_FOUND
      //Handle Error
    }
  }
}
