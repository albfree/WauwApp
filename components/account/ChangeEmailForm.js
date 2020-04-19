import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { db } from "../population/config.js";

export default function ChangeEmailForm(props) {
  const { id, email, setIsVisibleModal, setReloadData } = props;
  const [newEmail, setNewEmail] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateEmail = () => {
    setError(null);
    if (!newEmail) {
      setError("Debes introducir un nuevo email.");
    } else {
      setIsLoading(true);
      let userData = {
        email: newEmail,
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
      <View style={styles.view}>
        <Input
          placeholder="Email"
          containerStyle={styles.input}
          defaultValue={email && email}
          onChange={(v) => setNewEmail(v.nativeEvent.text)}
          rightIcon={{
            type: "material-community",
            name: "at",
            color: "#c2c2c2",
          }}
          errorMessage={error}
        />
        <Button
          title="Cambiar email"
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btn}
          onPress={updateEmail}
          loading={isLoading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#00a680",
  },
});
