import React, { useState, useEffect } from "react";
import Navigation from "../navigations/Navigation";
import { db } from "../population/config";
import { Alert } from "react-native";
import firebase from "firebase";

export default function Dashboard(props) {
  const [user, setUserInfo] = useState(props.navigation.state.params.userInfo);
  
  let userInfo = user;
  useEffect(() => {
    db.ref("wauwers")
      .child(userInfo.id)
      .on("value", (snap) => {
        if (snap.val().isBanned) {
          Alert.alert("Atención", "Su cuenta ha sido bloqueada.");
          firebase.auth().signOut();
        } else if (snap.val().hasRequests || snap.val().hasMessages) {
          Alert.alert("Atención", "Tiene notificaciones y/o mensajes sin leer");
        } else {
          setUserInfo(snap.val());
        }
      });
  }, []);

  return <Navigation screenProps={{ userInfo }} />;
}
