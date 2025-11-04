import { navigateFromNotification } from "@/utils/navigation";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";

export const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

TaskManager.defineTask<Notifications.NotificationTaskPayload>(
  BACKGROUND_NOTIFICATION_TASK,
  async ({ data, error, executionInfo }) => {
    console.log("🔔 Background notification task received!");
    console.log("Data:", JSON.stringify(data, null, 2));
    console.log("Error:", JSON.stringify(error, null, 2));
    console.log("Execution info:", JSON.stringify(executionInfo, null, 2));

    const isNotificationResponse = "actionIdentifier" in (data || {});

    if (isNotificationResponse) {
      // User interacted with the notification
      console.log("✅ Notification response from user");
      console.log("Action identifier:", (data as any).actionIdentifier);

      // Если есть notification в data, выполняем навигацию
      if ((data as any)?.notification) {
        await navigateFromNotification((data as any).notification);
      }
    } else {
      // Notification was received in background
      console.log("📬 Notification received in background");

      // Если есть notification в data, выполняем навигацию
      if ((data as any)?.notification) {
        await navigateFromNotification((data as any).notification);
      }
    }
  }
);

// Register the task for push notifications
Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
