import { db } from "../population/config.js";
import { Alert } from "react-native";
import firebase from "firebase";
import { email } from "./QueriesProfile";

export const BannedAssertion = () => {
  let userInfo;
  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .on("child_added", (snap) => {
      userInfo = snap.val();
      id = userInfo.id;
      if(userInfo.isBanned){
        Alert.alert("Atención", "Su cuenta ha sido bloqueada.");
        firebase.auth().signOut();
      }
    });

  return userInfo;
}

export var userInfo = userInfo;
