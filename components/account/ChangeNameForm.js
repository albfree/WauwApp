import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { Input, Button } from "react-native-elements";
import { db } from "../population/config.js";
import { profileStyles } from "../styles/profileStyle";

export default function ChangeNameForm(props) {
  const { id, name, setRenderName } = props;
  const [newName, setNewName] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateName = () => {
    setError(null);
    if (!newName) {
      setError("El nombre debe ser diferente.");
    } else {
      setIsLoading(true);
      let userData = {
        name: newName,
      };
      db.ref("wauwers")
        .child(id)
        .update(userData)
        .then(() => {
          setIsLoading(false);
          setRenderName(false);
        })
        .catch(() => {
          setError("Ha ocurrido un error");
          setIsLoading(false);
        });
    }
  };

  return (
    <SafeAreaView style={profileStyles.profileView9}>
      <Input
        placeholder="Nombre"
        containerStyle={profileStyles.profileTxt4}
        defaultValue={name && name}
        onChange={(v) => setNewName(v.nativeEvent.text)}
        errorMessage={error}
        inputStyle={profileStyles.profileTxt6}
      />
      <Button
        title="Cambiar"
        containerStyle={profileStyles.profileBtnContainer2}
        buttonStyle={profileStyles.profileBtn2}
        onPress={updateName}
        loading={isLoading}
        titleStyle={profileStyles.textBtn2}
      />
    </SafeAreaView>
  );
}
