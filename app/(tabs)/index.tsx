import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Platform, Text, View } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
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
  const router = useRouter();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const [notificationSource, setNotificationSource] = useState<string>("");

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => {
        console.log("token : ", token);
        setExpoPushToken(token ?? "");
      })
      .catch((error: any) => {
        console.log("error : ", error);
        setExpoPushToken(`${error}`);
      });

    // Обработка уведомлений когда приложение активно
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log(
          "notificationListener (app active): ",
          JSON.stringify(notification, null, 2)
        );
        setNotification(notification);
        setNotificationSource("App Active");
      }
    );

    // Обработка нажатий на уведомления (когда приложение в фоне или закрыто)
    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(
          "responseListener (app opened from notification): ",
          JSON.stringify(response, null, 2)
        );
        console.log(
          "Full notification object:",
          JSON.stringify(response.notification, null, 2)
        );

        // Устанавливаем уведомление в состояние для отображения
        setNotification(response.notification);
        setNotificationSource("Opened from Background");

        // Навигация на вкладку Explore ТОЛЬКО если приложение было открыто из фона
        // НЕ навигацию если приложение активно
        router.push("/(tabs)/explore");
      });

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

        // Навигация на вкладку Explore при открытии из фона
        router.push("/(tabs)/explore");
      }
    });

    return () => {
      notificationListener.remove();
      responseListener.remove();
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
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
    </View>
  );
}
