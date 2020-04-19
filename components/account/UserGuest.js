import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import InfoUser from "./InfoUser";
import AccountOptions from "./AccountOptions";
import { db } from "../population/config";
import { email } from "./QueriesProfile";
import { globalStyles } from "../styles/global";
import Toast from "react-native-easy-toast";

export default function UserGuest() {
  const [userInfo, setUserInfo] = useState([]);
  const [reloadData, setReloadData] = useState(false);
  const toastRef = useRef();

  useEffect(() => {
    db.ref("wauwers")
      .orderByChild("email")
      .equalTo(email)
      .on("value", function (snap) {
        snap.forEach(function (child) {
          setUserInfo(child.val());
        });
      });

    setReloadData(false);
  }, [reloadData]);

  return (
    <View>
      <InfoUser userInfo={userInfo} setReloadData={setReloadData} toastRef={toastRef}/>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </View>
  );
}
