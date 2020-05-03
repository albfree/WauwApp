import React, { useRef } from "react";
import { SafeAreaView } from "react-native";
import ListMyNotifications from "./ListMyNotifications";
import Toast from "react-native-easy-toast";
import _ from "lodash";
import { globalStyles } from "../styles/global";

export default function Notifications(props) {
  const { navigation, screenProps } = props;
  const { userInfo } = screenProps;
  const toastRef = useRef();
  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ListMyNotifications
        navigation={navigation}
        toastRef={toastRef}
        userInfo={userInfo}
      />
      <Toast ref={toastRef} position="center" opacity={0.7} />
    </SafeAreaView>
  );
}
