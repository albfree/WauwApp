import React, { useState, useEffect } from "react";
import { View } from "react-native";
import InfoUser from "./InfoUser";
import AccountOptions from "./AccountOptions";
import { db } from "../population/config";
import { email } from "./QueriesProfile";
import { globalStyles } from "../styles/global";

export default function UserGuest() {
  const [userInfo, setUserInfo] = useState([]);
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    db.ref("wauwers")
      .orderByChild("email")
      .equalTo(email)
      .on("value", function(snap) {
        snap.forEach(function(child) {
          setUserInfo(child.val());
        });
      });
  }, []);

  return (
    <View style={globalStyles.profileUserGuestView}>
      <InfoUser userInfo={userInfo} />
      <AccountOptions userInfo={userInfo} setReloadData={setReloadData} />
    </View>
  );
}
