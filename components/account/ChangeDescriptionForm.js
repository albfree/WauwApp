import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";
import { db } from "../population/config.js";
import { profileStyles } from "../styles/profileStyle";

export default function ChangeDescriptionForm(props) {
  const { id, desc, setRenderDescription } = props;
  const [newDesc, setNewDesc] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateDescription = () => {
    setError(null);
    if (!newDesc) {
      setError("La descripción no puede ser la misma.");
    } else if (newDesc.length > 200) {
      setError(
        "La descripción no debe superar los 200 caracteres.\nLongitud actual: " +
          newDesc.length +
          " caracteres"
      );
      setIsLoading(false);
    } else {
      setIsLoading(true);
      let userData = {
        description: newDesc,
      };
      db.ref("wauwers")
        .child(id)
        .update(userData)
        .then(() => {
          setIsLoading(false);
          setRenderDescription(false);
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
        <View style={profileStyles.profileView8}>
          <Input
            placeholder="Descripción"
            containerStyle={profileStyles.profileTxt5}
            defaultValue={desc && desc}
            onChange={(v) => setNewDesc(v.nativeEvent.text)}
            rightIcon={{
              type: "material-community",
              name: "lead-pencil",
              color: "#443099",
            }}
            errorMessage={error}
          />
          <Button
            title="Cambiar descripción"
            containerStyle={profileStyles.profileBtnContainer}
            buttonStyle={profileStyles.profileBtn}
            onPress={updateDescription}
            loading={isLoading}
          />
        </View>
      </View>
    </View>
  );
}
