package com.reactnativepushnotification

import android.content.Context
import android.content.SharedPreferences
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Intent
import android.os.Build
import androidx.core.app.NotificationCompat
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import org.json.JSONArray
import org.json.JSONObject
import java.util.Date
import java.util.concurrent.ConcurrentHashMap

class NotificationMessagingService : FirebaseMessagingService() {

    private val processedMessageIds = ConcurrentHashMap.newKeySet<String>()


    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        // НЕ вызываем super.onMessageReceived() чтобы Firebase ВСЕГДА вызывал этот метод
        android.util.Log.d("NotificationService", "✅✅✅ onMessageReceived")
        handleRemoteMessage(remoteMessage, "onMessageReceived")
    }


    private fun handleRemoteMessage(remoteMessage: RemoteMessage, source: String) {
        val messageId = remoteMessage.messageId ?: "${remoteMessage.sentTime}_${remoteMessage.data.hashCode()}"
        if (!processedMessageIds.add(messageId)) {
            android.util.Log.w("NotificationService", "⚠️ Duplicate message skipped (source=$source, id=$messageId)")
            return
        }

        android.util.Log.d("NotificationService", "========== handleRemoteMessage ($source) ==========")

        val hasNotification = remoteMessage.notification != null
        val hasData = remoteMessage.data.isNotEmpty()

        android.util.Log.d("NotificationService", "📬 Message type:")
        android.util.Log.d("NotificationService", "   - Has notification: $hasNotification")
        android.util.Log.d("NotificationService", "   - Has data: $hasData")
        android.util.Log.d("NotificationService", "   - Message type: ${if (hasNotification && hasData) "Both" else if (hasNotification) "Notification-only" else "Data-only"}")

        if (hasNotification && !hasData) {
            android.util.Log.w("NotificationService", "⚠️ Notification-only message detected. Firebase may auto-display it when app is backgrounded")
        }

        android.util.Log.d("NotificationService", "Message ID: ${remoteMessage.messageId}")
        android.util.Log.d("NotificationService", "From: ${remoteMessage.from}")

        val title = remoteMessage.notification?.title ?: ""
        val body = remoteMessage.notification?.body ?: ""
        val data = remoteMessage.data

        android.util.Log.d("NotificationService", "Title: $title")
        android.util.Log.d("NotificationService", "Body: $body")
        android.util.Log.d("NotificationService", "Data: $data")

        saveNotificationToHistory(title, body, data)

        // Показываем уведомление только если у него есть текст.
        if (title.isNotEmpty() || body.isNotEmpty()) {
            showNotification(title, body)
        }

        android.util.Log.d("NotificationService", "========== handleRemoteMessage completed ($source) ==========")
    }

    private fun showNotification(title: String, body: String) {
        val channelId = "default_channel"
        val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

        // Создаем канал для Android 8.0+
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                channelId,
                "Default Channel",
                NotificationManager.IMPORTANCE_HIGH
            ).apply {
                description = "Default Notification Channel"
            }
            notificationManager.createNotificationChannel(channel)
        }

        // Intent для открытия приложения
        val intent = Intent(this, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        }
        val pendingIntent = PendingIntent.getActivity(
            this, 0, intent,
            PendingIntent.FLAG_IMMUTABLE
        )

        // Создаем уведомление
        val notificationBuilder = NotificationCompat.Builder(this, channelId)
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentTitle(title)
            .setContentText(body)
            .setAutoCancel(true)
            .setContentIntent(pendingIntent)
            .setPriority(NotificationCompat.PRIORITY_HIGH)

        notificationManager.notify(System.currentTimeMillis().toInt(), notificationBuilder.build())

        android.util.Log.d("NotificationService", "📱 Showing notification: $title")
    }


    private fun saveNotificationToHistory(title: String, body: String, data: Map<String, String>) {
        try {
            // Используем SharedPreferences для хранения истории уведомлений
            val prefs: SharedPreferences = getSharedPreferences("notification_history_prefs", Context.MODE_PRIVATE)

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
                if (data.isNotEmpty()) {
                    put("data", JSONObject(data as Map<*, *>))
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

            android.util.Log.d("NotificationService", "✅ Saved notification to history: $title")
            android.util.Log.d("NotificationService", "📊 Total notifications in history: ${newHistoryArray.length()}")
        } catch (e: Exception) {
            android.util.Log.e("NotificationService", "❌ Error saving notification", e)
        }
    }

}


