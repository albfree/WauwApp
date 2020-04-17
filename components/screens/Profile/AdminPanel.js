import React from "react";
import { Text, View, Button } from "react-native";
import { withNavigation } from "react-navigation";

function AdminPanel(props) {
  const { navigation } = props;

  const goToUserList = () => {
    navigation.navigate("UserList");
  }

  const goToBroadcastForm = () => {
    navigation.navigate("BroadcastMsg");
  }

  return (
    <View>
      <Button
       title = "Lista de usuarios"
       onPress ={goToUserList}
      />
      <Button
       title = "Mensaje a los usuarios"
       onPress ={goToBroadcastForm}
      />
    </View>
  );
}

export default withNavigation(AdminPanel);
