import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { Avatar } from "react-native-elements";
import { globalStyles } from "../styles/global";
import * as ImagePicker from "expo-image-picker";
import { db } from "../population/config.js";

export default function InfoUser(props) {
  const { userInfo } = props;
  const [ error, setError ] = useState("");
  const [ avatar, setAvatar ] = useState(userInfo.photo);

  const changeAvatar = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.1,
      });
      if (!result.cancelled) {
        if (result.height <= 400 && result.width <= 400){
          setAvatar(result.uri);
          let userData = {
            photo: avatar
          };
          await db.ref("wauwers")
            .child(userInfo.id)
            .update(userData)
            .then(() => {
            })
            .catch(() => {
              setError("Ha ocurrido un error");
              Alert.alert("Error", error.toString(), [{text: "Atrás"}], {cancelable: true});
            });
        }else{
          setError("Seleccione una imagen de menor tamaño.\nEl tamaño máximo permitido es 400x400 píxeles.");
          Alert.alert("Aviso", error, [{text: "OK"}], {cancelable: true});
        }
      }
      
    } catch (E) {
      // console.log(E);
    }

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
            uri: (avatar !== undefined) ? avatar : userInfo.photo
          }}
          errorMessage={error}
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
