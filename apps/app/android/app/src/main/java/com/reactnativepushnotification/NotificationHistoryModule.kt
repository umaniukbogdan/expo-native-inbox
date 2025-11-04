package com.reactnativepushnotification

import android.content.Context
import android.content.SharedPreferences
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule
import org.json.JSONArray
import org.json.JSONObject

class NotificationHistoryModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "NotificationHistoryModule"
    }

    // Сохраняем ссылку на контекст для отправки событий
    companion object {
        private var reactApplicationContext: ReactApplicationContext? = null

        fun setReactContext(context: ReactApplicationContext?) {
            reactApplicationContext = context
        }

        /**
         * Сохранить remoteMessage.data в историю уведомлений
         * Отправляет событие в JS при добавлении нового уведомления
         */
        fun saveNotificationToHistory(context: Context, data: Map<String, String>) {
            try {
                val prefs: SharedPreferences = context.getSharedPreferences("notification_history_prefs", Context.MODE_PRIVATE)

                val historyJson = prefs.getString("notification_history", "[]")
                val historyArray = JSONArray(historyJson)

                // Конвертируем data Map в JSONObject
                val dataJson = JSONObject(data as Map<*, *>)
                historyArray.put(0, dataJson)

                prefs.edit()
                    .putString("notification_history", historyArray.toString())
                    .apply()

                android.util.Log.d("NotificationHistoryModule", "✅ Saved notification to history")

                // Отправляем событие в JS о новом уведомлении
                sendNewNotificationEvent(dataJson)
            } catch (e: Exception) {
                android.util.Log.e("NotificationHistoryModule", "❌ Error saving notification", e)
            }
        }

        /**
         * Отправляет событие в JS о новом уведомлении
         */
        private fun sendNewNotificationEvent(dataJson: JSONObject) {
            val reactContext = reactApplicationContext
            if (reactContext != null) {
                try {
                    val params = Arguments.createMap()
                    val dataMap = Arguments.createMap()
                    
                    // Конвертируем JSONObject в WritableMap
                    val keys = dataJson.keys()
                    while (keys.hasNext()) {
                        val key = keys.next()
                        val value = dataJson.getString(key)
                        dataMap.putString(key, value)
                    }
                    
                    params.putMap("data", dataMap)
                    // Получаем общее количество уведомлений
                    val prefs = reactContext.getSharedPreferences("notification_history_prefs", Context.MODE_PRIVATE)
                    val historyJson = prefs.getString("notification_history", "[]")
                    val totalCount = JSONArray(historyJson).length()
                    params.putInt("totalCount", totalCount)
                    
                    reactContext
                        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                        .emit("notificationHistoryUpdated", params)
                    
                    android.util.Log.d("NotificationHistoryModule", "📡 Event sent to JS: notificationHistoryUpdated")
                } catch (e: Exception) {
                    android.util.Log.e("NotificationHistoryModule", "❌ Error sending event", e)
                }
            } else {
                android.util.Log.w("NotificationHistoryModule", "⚠️ React context not available, event not sent")
            }
        }
    }

    override fun initialize() {
        super.initialize()
        // Сохраняем контекст при инициализации модуля
        setReactContext(reactApplicationContext)
        android.util.Log.d("NotificationHistoryModule", "✅ Module initialized, context saved")
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        // Очищаем контекст при уничтожении
        setReactContext(null)
    }

    @ReactMethod
    fun getNotificationHistory(promise: Promise) {
        try {
            val prefs: SharedPreferences = reactApplicationContext.getSharedPreferences("notification_history_prefs", Context.MODE_PRIVATE)
            val historyJson = prefs.getString("notification_history", "[]")
            promise.resolve(historyJson)
        } catch (e: Exception) {
            promise.reject("ERROR", "Failed to get notification history", e)
        }
    }
}

