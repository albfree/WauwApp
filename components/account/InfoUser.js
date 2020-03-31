import React from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import { globalStyles } from "../styles/global";

export default function InfoUser(props) {
  const { userInfo, setReloadData } = props;

  changeAvatar = () => {
    console.log("Estás cambiando el avatar...");
    setReloadData(false);
  };

  //const actualizaNombre = () => {
  //  var userData = {
  //    avgScore: 668
  //  };
  //  db.ref("wauwers")
  //    .child(userInfo.id)
  //    .update(userData);
  //};

  return (
    <View>
      <View style={globalStyles.infoUserView}>
        <Avatar
          rounded
          size="large"
          showEditButton
          onEditPress={changeAvatar}
          containerStyle={globalStyles.userInfoAvatar}
          source={{
            uri: userInfo.photo
          }}
        />

        <View>
          <Text style={globalStyles.userInfoDisplayName}>{userInfo.name}</Text>
          <Text style={globalStyles.userInfoEmail}>{userInfo.email}</Text>
        </View>
      </View>

      <View>
        <Text style={globalStyles.userInfoWauwPoints}>
          Wauw points: {` `}
          {` `}
          {userInfo.wauwPoints}
        </Text>
      </View>

      <View style={globalStyles.userInfoDescriptionGlobal}>
        <Text style={globalStyles.userInfoTitleDescription}>Descripción</Text>
        <Text style={globalStyles.userInfoDescription}>
          {userInfo.description}
        </Text>
      </View>
    </View>
  );
}
