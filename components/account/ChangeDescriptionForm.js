import React, { useState } from "react";
import { View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { db } from "../population/config.js";
import { globalStyles } from "../styles/global";

export default function ChangeDescriptionForm(props) {
  const { id, desc, setIsVisibleModal, setReloadData } = props;
  const [newDesc, setNewDesc] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateDescription = () => {
    setError(null);
    if (!newDesc) {
      setError("La descripción no puede ser la misma.");
    } else if(newDesc.length > 200){
      setError("La descripción no debe superar los 200 caracteres.\nLongitud actual: " + newDesc.length + " caracteres");
      setIsLoading(false);
    }else{
      setIsLoading(true);
      let userData = {
        description: newDesc
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
    <View>
      <View>
        <View style={globalStyles.profileFormView}>
          <Input
            placeholder="Descripción"
            containerStyle={globalStyles.profileFormInput}
            defaultValue={desc && desc}
            onChange={v => setNewDesc(v.nativeEvent.text)}
            rightIcon={{
              type: "material-community",
              name: "lead-pencil",
              color: "#443099"
            }}
            errorMessage={error}
          />
          <Button
            title="Cambiar descripción"
            containerStyle={globalStyles.profileFormBtnContainer}
            buttonStyle={globalStyles.profileFormBtn}
            onPress={updateDescription}
            loading={isLoading}
          />
        </View>
      </View>
    </View>
  );
}
