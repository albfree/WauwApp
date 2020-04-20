import React from "react";
import { Text, View, SafeAreaView, Image } from "react-native";
import { withNavigation } from "react-navigation";
import { globalStyles } from "../../styles/global";
import { Button, Icon } from "react-native-elements";
import { profileStyles } from "../../styles/profileStyle";

function AdminPanel(props) {
  const { navigation } = props;

  const goToUserList = () => {
    navigation.navigate("UserList");
  };

  const goToBroadcastForm = () => {
    navigation.navigate("BroadcastMsg");
  };

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <View style={globalStyles.blankView5}>
        <Image
          source={require("../../../assets/images/PoliceDog.jpg")}
          style={globalStyles.blankImage3}
        />
        <Button
          buttonStyle={profileStyles.profileBtn3}
          containerStyle={profileStyles.profileBtnContainer3}
          title="Lista de usuarios"
          onPress={goToUserList}
          icon={
            <Icon
              type="material-community"
              name="account-multiple"
              size={30}
              color="white"
              marginLeft={20}
            />
          }
          titleStyle={profileStyles.profileBtnTittle}
        />
        <Button
          buttonStyle={profileStyles.profileBtn3}
          containerStyle={profileStyles.profileBtnContainer3}
          title="Mensaje a los usuarios"
          onPress={goToBroadcastForm}
          icon={
            <Icon
              type="material-community"
              name="message"
              size={30}
              color="white"
              marginLeft={20}
            />
          }
          titleStyle={profileStyles.profileBtnTittle}
        />
      </View>
    </SafeAreaView>
  );
}

export default withNavigation(AdminPanel);
