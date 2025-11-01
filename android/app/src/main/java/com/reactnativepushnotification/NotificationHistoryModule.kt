package com.reactnativepushnotification

import android.content.Context
import android.content.SharedPreferences
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap
import org.json.JSONArray
import org.json.JSONObject
import java.util.Date

class NotificationHistoryModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "NotificationHistoryModule"
    }

    /**
     * Получить историю уведомлений из SharedPreferences
     */
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

    /**
     * Отметить уведомление как прочитанное
     */
    @ReactMethod
    fun markNotificationAsRead(id: String, promise: Promise) {
        try {
            val prefs: SharedPreferences = reactApplicationContext.getSharedPreferences("notification_history_prefs", Context.MODE_PRIVATE)
            val historyJson = prefs.getString("notification_history", "[]")
            val historyArray = JSONArray(historyJson)
            
            // Обновляем isRead в массиве
            for (i in 0 until historyArray.length()) {
                val item = historyArray.getJSONObject(i)
                if (item.getString("id") == id) {
                    item.put("isRead", true)
                    break
                }
            }
            
            prefs.edit()
                .putString("notification_history", historyArray.toString())
                .apply()
            
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("ERROR", "Failed to mark as read", e)
        }
    }

    /**
     * Отметить все как прочитанные
     */
    @ReactMethod
    fun markAllAsRead(promise: Promise) {
        try {
            val prefs: SharedPreferences = reactApplicationContext.getSharedPreferences("notification_history_prefs", Context.MODE_PRIVATE)
            val historyJson = prefs.getString("notification_history", "[]")
            val historyArray = JSONArray(historyJson)
            
            // Обновляем все isRead
            for (i in 0 until historyArray.length()) {
                historyArray.getJSONObject(i).put("isRead", true)
            }
            
            prefs.edit()
                .putString("notification_history", historyArray.toString())
                .apply()
            
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("ERROR", "Failed to mark all as read", e)
        }
    }

    /**
     * Сохранить уведомление в историю из JS
     */
    @ReactMethod
    fun saveNotification(title: String, body: String, dataJson: String, promise: Promise) {
        try {
            val prefs: SharedPreferences = reactApplicationContext.getSharedPreferences("notification_history_prefs", Context.MODE_PRIVATE)
            
            // Читаем существующую историю
            val historyJson = prefs.getString("notification_history", "[]")
            val historyArray = JSONArray(historyJson)

            // Создаем новое уведомление
            val notification = JSONObject().apply {
                put("id", System.currentTimeMillis().toString())
                put("title", title)
                put("body", body)
                put("date", Date().time)
                put("isRead", false)
                if (dataJson.isNotEmpty()) {
                    put("data", JSONObject(dataJson))
                }
            }

            // Добавляем в начало массива
            val newHistoryArray = JSONArray()
            newHistoryArray.put(notification)
            for (i in 0 until historyArray.length()) {
                newHistoryArray.put(historyArray[i])
            }

            // Сохраняем в SharedPreferences
            prefs.edit()
                .putString("notification_history", newHistoryArray.toString())
                .apply()

            android.util.Log.d("NotificationHistoryModule", "✅ Saved notification from JS: $title")
            android.util.Log.d("NotificationHistoryModule", "📊 Total notifications in history: ${newHistoryArray.length()}")
            
            promise.resolve(null)
        } catch (e: Exception) {
            android.util.Log.e("NotificationHistoryModule", "❌ Error saving notification", e)
            promise.reject("ERROR", "Failed to save notification", e)
        }
    }
}

