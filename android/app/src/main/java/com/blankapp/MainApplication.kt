package com.blankapp

import android.app.Application
import android.util.Log
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
import com.netcore.android.Smartech
import com.netcore.android.smartechpush.SmartPush
import com.smartechbasereactnative.SmartechBasePlugin
import java.lang.ref.WeakReference

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // Packages that cannot be autolinked yet can be added manually here, for example:
              // add(MyReactNativePackage())
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
      val smartech = Smartech.getInstance(WeakReference(applicationContext))
      smartech.initializeSdk(this)
      smartech.trackAppInstallUpdateBySmartech()
      smartech.setDebugLevel(9)
      val smartechBasePlugin = SmartechBasePlugin.getInstance()
      smartechBasePlugin.init(this)
      try {
          val smartPush = SmartPush.getInstance(WeakReference(applicationContext))
          smartPush.fetchAlreadyGeneratedTokenFromFCM()
      } catch (e: Exception) {
          Log.e("TAG", "Fetching FCM token failed.")
      }
    SoLoader.init(this, false)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      load()
    }
  }
}
