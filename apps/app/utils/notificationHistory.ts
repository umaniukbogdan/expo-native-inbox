import { NativeEventEmitter, NativeModules } from "react-native";

const { NotificationHistoryModule } = NativeModules;

export interface NotificationData {
  [key: string]: string;
}

// Создаем EventEmitter для подписки на события
const eventEmitter = new NativeEventEmitter(NotificationHistoryModule);

/**
 * Получить всю историю уведомлений из SharedPreferences
 * @returns Массив всех remoteMessage.data объектов, отсортированных от новых к старым
 */
export const getNotificationHistory = async (): Promise<NotificationData[]> => {
  try {
    const historyJson =
      await NotificationHistoryModule.getNotificationHistory();
    const history = JSON.parse(historyJson) as NotificationData[];
    return history;
  } catch (error) {
    console.error("Ошибка получения истории уведомлений:", error);
    return [];
  }
};

/**
 * Получить последнее уведомление (самое новое)
 * @returns Последний remoteMessage.data объект или null
 */
export const getLastNotification =
  async (): Promise<NotificationData | null> => {
    try {
      const history = await getNotificationHistory();
      return history.length > 0 ? history[0] : null;
    } catch (error) {
      console.error("Ошибка получения последнего уведомления:", error);
      return null;
    }
  };

/**
 * Получить уведомления по определенному полю
 * @param fieldName - Название поля для фильтрации
 * @param fieldValue - Значение поля
 * @returns Массив уведомлений, где fieldName === fieldValue
 */
export const getNotificationsByField = async (
  fieldName: string,
  fieldValue: string
): Promise<NotificationData[]> => {
  try {
    const history = await getNotificationHistory();
    return history.filter((item) => item[fieldName] === fieldValue);
  } catch (error) {
    console.error("Ошибка фильтрации уведомлений:", error);
    return [];
  }
};

/**
 * Парсит JSON из поля body, если оно содержит JSON строку
 * @param notificationData - Объект с данными уведомления
 * @returns Распарсенный JSON из body или исходный объект
 */
export const parseNotificationBody = (
  notificationData: NotificationData
): NotificationData => {
  if (notificationData.body && notificationData.body.trim().startsWith("{")) {
    try {
      const bodyData = JSON.parse(notificationData.body);
      return { ...notificationData, parsedBody: bodyData };
    } catch {
      // Если не JSON - возвращаем как есть
      return notificationData;
    }
  }
  return notificationData;
};

/**
 * Подписаться на события обновления истории уведомлений
 * @param callback - Функция, которая будет вызвана при получении нового уведомления
 * @returns Функция для отписки от события
 */
export const subscribeToNotificationHistory = (
  callback: (data: NotificationData, totalCount: number) => void
): (() => void) => {
  const subscription = eventEmitter.addListener(
    "notificationHistoryUpdated",
    (event: { data: NotificationData; totalCount: number }) => {
      console.log("📬 New notification received:", event.data);
      callback(event.data, event.totalCount);
    }
  );

  // Возвращаем функцию для отписки
  return () => {
    subscription.remove();
  };
};
