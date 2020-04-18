import React from "react";
import { Text, View, Button } from "react-native";
import { withNavigation } from "react-navigation";

function AdminPanel(props) {
  const { navigation } = props;

  const goToUserList = () => {
    navigation.navigate("UserList");
  };

  return (
    <View>
      <Button
       title = "Lista de usuarios"
       onPress ={goToUserList}
      />
    </View>
  );
}

export default withNavigation(AdminPanel);
