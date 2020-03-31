import React, { useState, useEffect } from "react";
import { View, Button } from "react-native";
import InfoUser from "./InfoUser";
import AccountOptions from "./AccountOptions";
import * as firebase from "firebase";
import { db } from "../population/config";
import { email } from "./QueriesProfile";
import { globalStyles } from "../styles/global";

export default function UserGuest() {
  const [userInfo, setUserInfo] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  //const [isLoading, setIsLoading] = useState(false);
  //const toastRef = useRef();
  //console.log(email);

  useEffect(() => {
    db.ref("wauwers")
      .orderByChild("email")
      .equalTo(email)
      .on("value", function(snap) {
        snap.forEach(function(child) {
          setUserInfo(child.val());
        });
      });
    setReloadData(false);
  }, [reloadData]);

  return (
    <View style={globalStyles.profileUserGuestView}>
      <InfoUser userInfo={userInfo} setReloadData={setReloadData} />
      <AccountOptions userInfo={userInfo} setReloadData={setReloadData} />
    </View>
  );
}
