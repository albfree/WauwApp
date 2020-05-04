import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import InfoUser from "./InfoUser";
import AccountOptions from "./AccountOptions";
import { db } from "../population/config";
import { email } from "./QueriesProfile";
import { globalStyles } from "../styles/global";
import Toast from "react-native-easy-toast";

export default function UserGuest(props) {
  const { userInfo } = props;
  const toastRef = useRef();

  return (
    <View>
      <InfoUser
        userInfo={userInfo}
        toastRef={toastRef}
      />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </View>
  );
}
