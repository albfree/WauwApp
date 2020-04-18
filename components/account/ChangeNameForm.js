import React, { useState } from "react";
import { View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { db } from "../population/config.js";
import { globalStyles } from "../styles/global";

export default function ChangeNameForm(props) {
  const { id, name, setIsVisibleModal, setReloadData } = props;
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
        name: newName
      };
      db.ref("wauwers")
        .child(id)
        .update(userData)
        .then(() => {
          setIsLoading(false);
          setReloadData(true);
          setIsVisibleModal(false);
        })
        .catch(() => {
          setError("Ha ocurrido un error");
          setIsLoading(false);
        });
    }
  };

  return (
    <View style={globalStyles.profileFormView}>
      <Input
        placeholder="Nombre"
        containerStyle={globalStyles.profileFormInput}
        defaultValue={name && name}
        onChange={v => setNewName(v.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "rename-box",
          color: "#443099"
        }}
        errorMessage={error}
      />
      <Button
        title="Cambiar nombre"
        containerStyle={globalStyles.profileFormBtnContainer}
        buttonStyle={globalStyles.profileFormBtn}
        onPress={updateName}
        loading={isLoading}
      />
    </View>
  );
}
