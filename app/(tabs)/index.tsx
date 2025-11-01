import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Platform, ScrollView, Text, View } from "react-native";
import { getNotificationHistory } from "../../utils/notificationHistory";

console.log("📄 index.tsx file loaded - notifications handled by Kotlin only");

Notifications.setNotificationHandler({
  handleNotification: async (notification) => {
    console.log("==========================================");
    console.log("📱 setNotificationHandler CALLED (Foreground handler)");
    console.log("==========================================");
    console.log("Notification:", JSON.stringify(notification, null, 2));
    console.log("Title:", notification.request.content.title);
    console.log("Body:", notification.request.content.body);
    console.log(
      "Data:",
      JSON.stringify(notification.request.content.data, null, 2)
    );
    console.log("==========================================");

    return {
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    };
  },
});

async function sendPushNotification(expoPushToken: string) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title: "Original Title",
    body: "And here is the body!",
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);

      // Enable background notifications
      await Notifications.setAutoServerRegistrationEnabledAsync(true);

      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

export default function HomeScreen() {
  console.log("🎬 HomeScreen component rendered");

  const router = useRouter();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const [notificationSource, setNotificationSource] = useState<string>("");
  const [notificationHistory, setNotificationHistory] = useState<any[]>([]);

  useEffect(() => {
    console.log(
      "🚀 HomeScreen useEffect started - setting up notification listeners"
    );

    registerForPushNotificationsAsync()
      .then((token) => {
        console.log("✅ Push token received:", token);
        setExpoPushToken(token ?? "");
      })
      .catch((error: any) => {
        console.error("❌ Error getting push token:", error);
        // setExpoPushToken(`${error}`);
      });

    // Загружаем историю уведомлений из SharedPreferences
    const loadNotificationHistory = async () => {
      try {
        const history = await getNotificationHistory();
        console.log("📚 Notification history loaded : ", history);
        setNotificationHistory(history);
      } catch (error) {
        console.error("❌ Error loading notification history:", error);
      }
    };

    loadNotificationHistory();

    // Обработка уведомлений когда приложение активно (foreground)
    console.log("🔔 Registering notification listener...");
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("==========================================");
        console.log("🔔 NOTIFICATION RECEIVED (Foreground/Active)");
        console.log("==========================================");
        console.log(
          "Full notification object:",
          JSON.stringify(notification, null, 2)
        );
        console.log("Title:", notification.request.content.title);
        console.log("Body:", notification.request.content.body);
        console.log(
          "Data:",
          JSON.stringify(notification.request.content.data, null, 2)
        );
        console.log("==========================================");

        setNotification(notification);
        setNotificationSource("App Active");
      }
    );
    console.log("✅ Notification listener registered");

    // Обработка нажатий на уведомления (когда пользователь тапает на пуш)
    console.log(
      "👆 Registering notification response listener (tap handler)..."
    );
    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("==========================================");
        console.log("👆 NOTIFICATION TAPPED (User clicked on notification)");
        console.log("==========================================");
        console.log("Action identifier:", response.actionIdentifier);
        console.log("Full response object:", JSON.stringify(response, null, 2));
        console.log(
          "Full notification object:",
          JSON.stringify(response.notification, null, 2)
        );
        console.log("Title:", response.notification.request.content.title);
        console.log("Body:", response.notification.request.content.body);
        console.log(
          "Data:",
          JSON.stringify(response.notification.request.content.data, null, 2)
        );
        console.log("==========================================");

        // Устанавливаем уведомление в состояние для отображения
        setNotification(response.notification);
        setNotificationSource("Opened from Background");
      });
    console.log("✅ Notification response listener registered");

    // Проверяем, было ли приложение открыто через уведомление при запуске
    Notifications.getLastNotificationResponseAsync().then((response) => {
      if (response) {
        console.log(
          "App opened from notification on startup: ",
          JSON.stringify(response, null, 2)
        );
        console.log(
          "Full notification object:",
          JSON.stringify(response.notification, null, 2)
        );
        setNotification(response.notification);
        setNotificationSource("App Startup");
      }
    });

    return () => {
      console.log("🧹 Cleaning up notification listeners...");
      notificationListener.remove();
      responseListener.remove();
      console.log("✅ Notification listeners cleaned up");
    };
  }, [router]);

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
      <Text style={{ color: "red" }}>
        Your Expo push token: {expoPushToken}
      </Text>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "blue", fontSize: 16, fontWeight: "bold" }}>
          Source: {notificationSource || "No notification"}
        </Text>
        <Text style={{ color: "red" }}>
          Title: {notification && notification.request.content.title}{" "}
        </Text>
        <Text style={{ color: "red" }}>
          Body: {notification && notification.request.content.body}
        </Text>
        <Text style={{ color: "red" }}>
          Data:{" "}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
      <View style={{ gap: 10 }}>
        <Button
          title="Press to Send Notification"
          onPress={async () => {
            await sendPushNotification(expoPushToken);
          }}
        />
        <Button
          title="Load Notification History"
          onPress={async () => {
            const history = await getNotificationHistory();
            console.log("📚 History:", history);
            setNotificationHistory(history);
            alert(`Loaded ${history.length} notifications`);
          }}
        />
      </View>
      {notificationHistory.length > 0 && (
        <ScrollView
          style={{
            marginTop: 20,
            padding: 10,
            maxHeight: 300,
            borderWidth: 1,
            borderColor: "#ccc",
          }}
        >
          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
            Notification History ({notificationHistory.length}):
          </Text>
          {notificationHistory.map((item, index) => (
            <View
              key={index}
              style={{
                marginBottom: 10,
                padding: 5,
                backgroundColor: "#f0f0f0",
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                #{index + 1}
              </Text>
              <Text style={{ fontSize: 11 }}>
                {JSON.stringify(item, null, 2)}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
