import { db } from "../population/config.js";
import { Alert } from "react-native";
import firebase from "firebase";
import { email } from "./QueriesProfile";

export const popUp = () => {
  let userInfo;
  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .once("child_added", (snap) => {
      userInfo = snap.val();
      if (userInfo.hasMessages && userInfo.hasRequests) {
        Alert.alert("Atención", "Tiene mensajes y notificaciones sin leer");
      } else if (userInfo.hasRequests) {
        Alert.alert("Atención", "Tiene notificaciones sin leer");
      } else if (userInfo.hasMessages) {
        Alert.alert("Atención", "Tiene mensajes sin leer");
      }
    });

  return userInfo;
};
