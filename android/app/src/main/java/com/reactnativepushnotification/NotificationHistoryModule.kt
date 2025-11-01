package com.reactnativepushnotification

import android.content.Context
import android.content.SharedPreferences
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import org.json.JSONArray
import org.json.JSONObject

class NotificationHistoryModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "NotificationHistoryModule"
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

    companion object {
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
            } catch (e: Exception) {
                android.util.Log.e("NotificationHistoryModule", "❌ Error saving notification", e)
            }
        }
    }
}

