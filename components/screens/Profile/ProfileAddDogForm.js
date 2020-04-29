import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { db } from "../../population/config.js";
import { withNavigation } from "react-navigation";
import { Button, Icon } from "react-native-elements";
import { globalStyles } from "../../styles/global";
import { addDogStyles } from "../../styles/addDogStyle";
import { bannedAssertion } from "../../account/bannedAssertion";

function ProfileAddDogForm(props) {
  const {
    owner,
    setIsVisibleForm,
    setReloadMascotas,
    setIsVisibleLoading,
    toastRef,
  } = props;
  const [newName, setNewName] = useState(null);
  const [newBreed, setNewBreed] = useState(null);
  const [newDescription, setNewDescription] = useState(null);
  bannedAssertion();

  const addPet = () => {
    let id = db.ref("pet").push().key;
    let petData = {
      id: id,
      name: newName,
      breed: newBreed,
      description: newDescription,
      owner: owner,
    };
    var regex = /\w/;
    if (
      newName === null ||
      !regex.test(newName) ||
      newBreed === null ||
      !regex.test(newBreed) ||
      newDescription === null ||
      !regex.test(newDescription)
    ) {
      let errores = "";
      if (newName === null || !regex.test(newName)) {
        errores = errores.concat("Debe escribir un nombre.\n");
      }
      if (newBreed === null || !regex.test(newBreed)) {
        errores = errores.concat("Debe escribir una raza.\n");
      }
      if (newDescription === null || !regex.test(newDescription)) {
        errores = errores.concat(
          "Debe dar una breve descripción de su perro.\n"
        );
      }
      Alert.alert("Advertencia", errores.toString());
    } else {
      setIsVisibleLoading(true);
      db.ref("pet/" + owner + "/" + id)
        .set(petData)
        .then(() => {
          toastRef.current.show("Mascota añadida");
        })
        .catch(() => {
          toastRef.current.show("Error al añadir mascota");
        });
      setIsVisibleForm(false);
      setReloadMascotas(true);
    }
  };

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView keyboardShouldPersistTaps="never">
        <View style={globalStyles.viewFeed}>
          <View style={globalStyles.viewFlex1}>
            <Text style={addDogStyles.addDogTxt}>¿Cómo se llama su perro?</Text>
            <TextInput
              style={addDogStyles.addDogTxt2}
              placeholder="Ej.: Fluffy"
              onChange={(v) => setNewName(v.nativeEvent.text)}
            />
            <Text style={addDogStyles.addDogTxt}>¿De qué raza es?</Text>
            <TextInput
              style={addDogStyles.addDogTxt2}
              placeholder="Ej.: Chiguagua"
              onChange={(v) => setNewBreed(v.nativeEvent.text)}
            />
            <Text style={addDogStyles.addDogTxt}>Describa a su perro</Text>
            <TextInput
              style={addDogStyles.addDogTxt2}
              placeholder="Ej.: Muy manso"
              multiline={true}
              numberOfLines={5}
              onChange={(v) => setNewDescription(v.nativeEvent.text)}
            />
            <Button
              buttonStyle={addDogStyles.addDogBtn}
              containerStyle={addDogStyles.addDogBtnContainer}
              title="Crear"
              onPress={addPet}
              icon={
                <Icon
                  type="material-community"
                  name="content-save"
                  size={25}
                  color="white"
                  marginLeft={30}
                />
              }
              titleStyle={addDogStyles.addDogBtnTxt}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withNavigation(ProfileAddDogForm);
