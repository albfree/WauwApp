import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Alert,
  SafeAreaView,
  Keyboard,
  ScrollView,
} from "react-native";
import { db } from "../../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../../account/QueriesProfile";
import { Button, Icon } from "react-native-elements";
import { globalStyles } from "../../styles/global";
import { addDogStyles } from "../../styles/addDogStyle";
import { bannedAssertion } from "../../account/bannedAssertion";

function ProfileAddDogForm(props) {
  const { setIsVisibleModal, navigation } = props;
  const [newName, setNewName] = useState(null);
  const [newBreed, setNewBreed] = useState(null);
  const [newDescription, setNewDescription] = useState(null);
  const [newOwner, setnewOwner] = useState(null);
  const [reloadData, setReloadData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  bannedAssertion();

  useEffect(() => {
    db.ref("wauwers")
      .orderByChild("email")
      .equalTo(email)
      .once("child_added", (snap) => {
        const newNewOwner = {
          avgScore: snap.val().avgScore,
          homeDescription: snap.val().homeDescription,
          email: snap.val().email,
          id: snap.val().id,
          name: snap.val().name,
          photo: snap.val().photo,
          surname: snap.val().surname,
          wauwPoints: snap.val().wauwPoints,
        };
        setnewOwner(snap.val());
      });
    setReloadData(false);
  }, [reloadData]);

  const addPet = () => {
    let id = db.ref("pet").push().key;
    let petData = {
      id: id,
      name: newName,
      breed: newBreed,
      description: newDescription,
      owner: newOwner.id,
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
      setIsLoading(true);

      db.ref("pet/" + newOwner.id + "/" + id)
        .set(petData)
        .then(() => {
          db.ref("wauwers/" + newOwner.id)
            .update({ petNumber: newOwner.petNumber + 1 })
            .then(() => {
              Alert.alert("Éxito", "Se ha registrado el perro correctamente.");
              navigation.navigate("ProfileDrawer");
              setIsLoading(false);
              setIsVisibleModal(false);
            })
            .catch(() => {
              setError("Ha ocurrido un error");
              setIsLoading(false);
            });
        })
        .catch(() => {
          setError("Ha ocurrido un error");
          setIsLoading(false);
        });
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
