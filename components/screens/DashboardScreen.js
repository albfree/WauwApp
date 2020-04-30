import React from "react";
import Navigation from "../navigations/Navigation";
import { db } from "../population/config";
import { Alert } from "react-native";
import firebase from "firebase";

export default function Dashboard(props) {
  const { userInfo } = props.navigation.state.params;

  db.ref("wauwers")
    .child(userInfo.id)
    .on("value", (snap) => {
      if (snap.val().isBanned) {
        Alert.alert("Atención", "Su cuenta ha sido bloqueada.");
        firebase.auth().signOut();
      } else if (snap.val().hasRequests || snap.val().hasMessages) {
        Alert.alert("Atención", "Tiene notificaciones y/o mensajes sin leer");
      }
    });

  return <Navigation screenProps={{ userInfo }} />;
}
