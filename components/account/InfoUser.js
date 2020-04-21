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
import * as Permissions from "expo-permissions";
import * as firebase from "firebase";

export default function InfoUser(props) {
  const { userInfo, setReloadData, toastRef } = props;
  const [error, setError] = useState("");
  const [renderName, setRenderName] = useState(false);
  const [renderDescription, setRenderDescription] = useState(false);

  let pointsToMoney = Math.round(userInfo.wauwPoints * 0.65 * 100) / 100;
  let moneyPoints = "(" + pointsToMoney + "€)";

  const changeAvatar = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermission.permissions.cameraRoll.status;

    if (resultPermissionCamera === "denied") {
      toastRef.current.show(
        "Es necesario aceptar los permisos de la galería.",
        3000
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      if (result.cancelled) {
        toastRef.current.show(
          "Has cerrado la galería sin seleccionar una imagen.",
          3000
        );
      } else {
        uploadImage(result.uri, userInfo.id).then(() => {
          toastRef.current.show("Foto de perfil actualizada.", 3000);
        });
        updatePhotoURL(userInfo.id);
      }
    }
  };

  const uploadImage = async (uri, nameImage) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const ref = firebase.storage().ref().child(`avatar/${nameImage}`);

    return ref.put(blob);
  };

  const updatePhotoURL = (id) => {
    firebase
      .storage()
      .ref(`avatar/${id}`)
      .getDownloadURL()
      .then(async (result) => {
        const updatePhoto = {
          photo: result,
        };

        await db.ref("wauwers").child(userInfo.id).update(updatePhoto);

        setReloadData(true);
      })
      .catch(() => {
        toastRef.current.show("Error al recuperar la foto de perfil.", 3000);
      });
  };

  return (
    <View>
      <View style={profileStyles.profileView3}>
        <Avatar
          rounded
          size="large"
          containerStyle={profileStyles.profileAvatar}
          source={{
            uri: userInfo.photo,
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
          Wauw Points: {userInfo.wauwPoints} {moneyPoints}
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
