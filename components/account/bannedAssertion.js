import { db } from "../population/config.js";
import { Alert } from "react-native";
import firebase from "firebase";
import { email } from "./QueriesProfile";

export const bannedAssertion = () => {
  let userInfo;
  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .once("child_added", (snap) => {
      userInfo = snap.val();
      if (userInfo.isBanned) {
        Alert.alert("Atención", "Su cuenta ha sido bloqueada.");
        firebase.auth().signOut();
      }
    });

  return userInfo;
};
