import React, { useState } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { globalStyles } from "../styles/global";
import * as ImagePicker from "expo-image-picker";
import { db } from "../population/config.js";
import { profileStyles } from "../styles/profileStyle";
import ChangeNameForm from "./ChangeNameForm";
import ChangeDescriptionForm from "./ChangeDescriptionForm";
import Modal from "./Modal";

export default function InfoUser(props) {
  const { userInfo, setReloadData } = props;
  const [error, setError] = useState("");
  const [avatar, setAvatar] = useState(userInfo.photo);
  const [renderName, setRenderName] = useState(false);
  const [renderDescription, setRenderDescription] = useState(false);

  const changeAvatar = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.1,
      });
      if (!result.cancelled) {
        if (result.height <= 400 && result.width <= 400) {
          setAvatar(result.uri);
          let userData = {
            photo: avatar,
          };
          await db
            .ref("wauwers")
            .child(userInfo.id)
            .update(userData)
            .then(() => {})
            .catch(() => {
              setError("Ha ocurrido un error");
              Alert.alert("Error", error.toString(), [{ text: "Atrás" }], {
                cancelable: true,
              });
            });
        } else {
          setError(
            "Seleccione una imagen de menor tamaño.\nEl tamaño máximo permitido es 400x400 píxeles."
          );
          Alert.alert("Aviso", error, [{ text: "OK" }], { cancelable: true });
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
      <View style={profileStyles.profileView3}>
        <Avatar
          rounded
          size="large"
          showEditButton
          onEditPress={changeAvatar}
          containerStyle={profileStyles.profileAvatar}
          source={{
            uri: avatar !== undefined ? avatar : userInfo.photo,
          }}
          errorMessage={error}
        />

        <View style={profileStyles.profileView4}>
          <View style={profileStyles.profileView7}>
            {renderName ? (
              <ChangeNameForm
                id={userInfo.id}
                name={userInfo.name}
                setRenderName={setRenderName}
                setReloadData={setReloadData}
              />
            ) : (
              <Text style={profileStyles.profileTxt}>{userInfo.name} </Text>
            )}

            <TouchableOpacity
              onPress={() => {
                if (renderName) {
                  setRenderName(false);
                } else {
                  setRenderName(true);
                }
              }}
            >
              <Icon
                type="material-community"
                name="pencil"
                size={20}
                color="white"
                marginTop={10}
                marginLeft={10}
              />
            </TouchableOpacity>
          </View>
          <Text style={profileStyles.profileTxt2}>{userInfo.email}</Text>
        </View>
      </View>

      <View>
        <Text style={profileStyles.profileView5}>
          Wauw points: {` `}
          {` `}
          {userInfo.wauwPoints}
        </Text>
      </View>

      <View style={profileStyles.profileView6}>
        <View style={profileStyles.profileView7}>
          <Text style={profileStyles.profileTxt3}>Descripción</Text>
          <TouchableOpacity
            onPress={() => {
              if (renderDescription) {
                setRenderDescription(false);
              } else {
                setRenderDescription(true);
              }
            }}
          >
            <Icon
              type="material-community"
              name="pencil"
              size={20}
              color="black"
              marginTop={10}
              marginLeft={10}
            />
          </TouchableOpacity>
        </View>
        {renderDescription ? (
          <ChangeDescriptionForm
            id={userInfo.id}
            desc={userInfo.description}
            setRenderDescription={setRenderDescription}
            setReloadData={setReloadData}
          />
        ) : (
          <Text style={profileStyles.profileTxt4}>{userInfo.description}</Text>
        )}
      </View>
    </View>
  );
}
