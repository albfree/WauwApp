import React, { useRef } from "react";
import { SafeAreaView } from "react-native";
import ListMyNotifications from "./ListMyNotifications";
import Toast from "react-native-easy-toast";
import _ from "lodash";
import { globalStyles } from "../styles/global";

export default function Notifications(props) {
  const { userInfo } = props.screenProps;
  const toastRef = useRef();
  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ListMyNotifications toastRef={toastRef} userInfo={userInfo} />
      <Toast ref={toastRef} position="center" opacity={0.7} />
    </SafeAreaView>
  );
}
