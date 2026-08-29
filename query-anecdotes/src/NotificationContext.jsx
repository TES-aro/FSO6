import { createContext, useState } from "react";

const NotificationContext = createContext();

export default NotificationContext;

export const NotificationContextProvider = (props) => {
  const [notification, setNotificationState] = useState("");
  const setNotification = (newNotification) => {
    setNotificationState(newNotification);
    setTimeout(() => setNotificationState(""), 5000);
  }

  return (
    <NotificationContext.Provider value={{ notification, setNotification }} >
      {props.children}
    </NotificationContext.Provider>
  )
}
