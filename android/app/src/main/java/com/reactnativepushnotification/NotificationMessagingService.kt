package com.reactnativepushnotification

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Intent
import android.content.Context
import android.content.SharedPreferences
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

    companion object {
        private const val DEFAULT_CHANNEL_ID = "default_channel"
        private const val DEFAULT_CHANNEL_NAME = "Notification"
        private const val DEFAULT_CHANNEL_DESCRIPTION = "Application's Notification"
    }

    private var defaultChannelCreated = false


    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        handleRemoteMessage(remoteMessage, "onMessageReceived")
    }


    private fun handleRemoteMessage(remoteMessage: RemoteMessage, source: String) {
        val messageId = remoteMessage.messageId ?: "${remoteMessage.sentTime}_${remoteMessage.data.hashCode()}"
        if (!processedMessageIds.add(messageId)) {
            return
        }
        val bodyJsonString = remoteMessage.data?.get("body") ?: ""
        var rawTitle = remoteMessage.data?.get("title") ?: ""
        var rawBody = ""

        try {
            val bodyJson = JSONObject(bodyJsonString)
            rawTitle = bodyJson.optString("title", "")
            rawBody = bodyJson.optString("body", "")
        } catch (e: Exception) {
            rawBody = bodyJsonString
        }

        val data = remoteMessage.data


        // if (rawTitle.isNotEmpty() || rawBody.isNotEmpty() || data.isNotEmpty()) {
        //   saveNotificationToHistory(rawTitle, rawBody, data)
        // }


        if (rawTitle.isNotEmpty() || rawBody.isNotEmpty()) {
            showNotification(rawTitle, rawBody, data)
        } else {
            android.util.Log.w("NotificationService", "⚠️ Skipped notification display because both title and body are empty after resolution")
        }
    }

    private fun showNotification(title: String, body: String, data: Map<String, String>) {
        val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        ensureDefaultChannelExists(notificationManager)
        val intent = buildNotificationIntent()
        val pendingIntent = PendingIntent.getActivity(
            this,
            0,
            intent,
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
        )

        val notificationBuilder = NotificationCompat.Builder(this, DEFAULT_CHANNEL_ID)
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentTitle(title)
            .setContentText(body)
            .setStyle(NotificationCompat.BigTextStyle().bigText(body))
            .setAutoCancel(true)
            .setContentIntent(pendingIntent)
            .setPriority(NotificationCompat.PRIORITY_HIGH)

        val notificationId = data["notification_id"]?.toIntOrNull() ?: System.currentTimeMillis().toInt()
        notificationManager.notify(notificationId, notificationBuilder.build())
    }


    private fun ensureDefaultChannelExists(notificationManager: NotificationManager) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            return
        }
        if (defaultChannelCreated) {
            return
        }

        val existingChannel = notificationManager.getNotificationChannel(DEFAULT_CHANNEL_ID)
        if (existingChannel != null) {
            defaultChannelCreated = true
            return
        }

        val channel = NotificationChannel(
            DEFAULT_CHANNEL_ID,
            DEFAULT_CHANNEL_NAME,
            NotificationManager.IMPORTANCE_HIGH
        ).apply {
            description = DEFAULT_CHANNEL_DESCRIPTION
            enableVibration(true)
            enableLights(true)
        }

        notificationManager.createNotificationChannel(channel)
        defaultChannelCreated = true
    }


    private fun buildNotificationIntent(): Intent {
        return Intent(this@NotificationMessagingService, MainActivity::class.java).apply {
            flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_CLEAR_TASK
        }
    }

    private fun saveNotificationToHistory(title: String, body: String, data: Map<String, String>) {
        try {
            val prefs: SharedPreferences = getSharedPreferences("notification_history_prefs", Context.MODE_PRIVATE)

            val historyJson = prefs.getString("notification_history", "[]")
            val historyArray = JSONArray(historyJson)

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

            val newHistoryArray = JSONArray()
            newHistoryArray.put(notification)
            for (i in 0 until historyArray.length()) {
                newHistoryArray.put(historyArray[i])
            }

            prefs.edit()
                .putString("notification_history", newHistoryArray.toString())
                .apply()
        } catch (e: Exception) {
            android.util.Log.e("NotificationService", "❌ Error saving notification", e)
        }
    }

}


