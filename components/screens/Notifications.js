import React, { useRef } from "react";
import { View, SafeAreaView } from "react-native";
import ListMyNotifications from "./ListMyNotifications";
import Toast from "react-native-easy-toast";
import { YellowBox } from "react-native";
import _ from "lodash";
import { globalStyles } from "../styles/global";

export default function Notifications() {
  const toastRef = useRef();
  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ListMyNotifications toastRef={toastRef} />
      <Toast ref={toastRef} position="center" opacity={0.7} />
    </SafeAreaView>
  );
}
