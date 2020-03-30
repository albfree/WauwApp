import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Button,
  View,
  Alert,
  Picker,
  ScrollView
} from "react-native";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../account/QueriesProfile";
import { CheckBox } from "react-native-elements";


function createRequest(props) {
  const { navigation } = props;
  const [newPrice, setNewPrice] = useState(
    navigation.state.params.wauwer.price
  );
  const price = navigation.state.params.wauwer.price;
  const [newInterval, setNewInterval] = useState(null);
  const [newOwner, setNewOwner] = useState([]);
  const newWorker = navigation.state.params.wauwer;
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [petNumber, setPetNumber] = useState(0);
  const [petNames, setPetNames] = useState([]);

  useEffect(() => {
    // To retrieve the current logged user
    db.ref("wauwers")
      .orderByChild("email")
      .equalTo(email)
      .on("value", function(snap) {
        snap.forEach(function(child) {
          setNewOwner(child.val());
        });
      });
    setReloadData(false);
  }, [reloadData]);

  const [availabilities, setAvailabilities] = useState([]);
  const [newAvailability, setNewAvailability] = useState([]);

  useEffect(() => {
    // To retrieve the walker availabilities
    db.ref("availability-wauwers")
      .orderByChild("wauwer/id")
      .equalTo(newWorker.id)
      .on("value", snap => {
        const availabilitiesList = [];
        snap.forEach(child => {
          availabilitiesList.push(child.val().availability);
        });
        setAvailabilities(availabilitiesList);
      });
    setReloadData(false);
  }, [reloadData]);

  useEffect(() => {
    // To retrieve my pets' names
    db.ref("pet")
      .orderByChild("owner/email")
      .equalTo(email)
      .on("value", snap => {
        const pets = [];
        snap.forEach(child => {
          pets.push(child.val().name);
        });
        setPetNames(pets);
      });
  }, []);

  const checkPetNumber = () => {
    if (petNumber > 0) {
      addRequest();
    } else {
      Alert.alert("Sin mascotas... ¡no hay paseo!", "");
    }
  };

  const funct = value => {
    setNewAvailability(value.id);
    setNewInterval(
      value.day + " " + value.startTime + "h - " + value.endDate + "h"
    );
  };

  const addRequest = () => {
    let id = db.ref("requests").push().key;
    setError(null);
    setIsLoading(true);
    let requestData = {
      id: id,
      isCanceled: false,
      isPayed: false,
      owner: newOwner.id,
      pending: true,
      petNumber: petNumber,
      place: "localización",
      price: newPrice,
      type: "walk",
      worker: newWorker.id,
      interval: newInterval,
      availability: newAvailability
    };
    db.ref("requests/" + id)
      .set(requestData)
      .then(() => {
        Alert.alert("Éxito", "Se ha creado su solicitud correctamente.");
        navigation.navigate("Home");
        setIsLoading(false);
        setReloadData(true);
        setIsVisibleModal(false);
      })
      .catch(() => {
        setError("Ha ocurrido un error");
        setIsLoading(false);
      });
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <Text style={styles.text}>
        {"Nombre Paseador\n"}
        <Text style={styles.data}>{newWorker.name}</Text>
      </Text>

      {/* { <Text style={styles.text}>
        {"Información \n"} <Text style={styles.data}>{newDescription}</Text>{" "}
      </Text> } */}
      <Text style={styles.text}>
        {"Precio paseo \n"}
        <Text style={styles.data}>{newPrice}</Text>
      </Text>

      <Text style={styles.text}>
        {"¿Cuándo quiere que " + newWorker.name + " pasee a su perro?"}
      </Text>

      <Picker selectedValue={newInterval} onValueChange={value => funct(value)}>
        {availabilities.map(item => (
          <Picker.Item
            label={
              item.day + " " + item.startTime + "h - " + item.endDate + "h"
            }
            value={item}
          />
        ))}
      </Picker>

      <Text style={styles.text}>
        {"Fecha\n"}
        <Text style={styles.data}>{newInterval}</Text>{" "}
      </Text>
      <View>
        <Text style={styles.text}>
          {"¿Qué mascotas quiere que pasee " + newWorker.name + "?"}
        </Text>
        <View style={styles.container}>
          {petNames.map(pet => (
            <PetCheckBox
              name={pet}
              petNumber={petNumber}
              setPetNumber={setPetNumber}
              newPrice={newPrice}
              setNewPrice={setNewPrice}
              price={price}
            />
          ))}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Crear Solicitud" onPress={checkPetNumber} color="#0de" />
      </View>
    </ScrollView>
  );
}

export default withNavigation(createRequest);

function PetCheckBox(props) {
  const { name, petNumber, setPetNumber, setNewPrice, price } = props;
  const [checked, setIsChecked] = useState(false);

  useEffect(() => {
    let number = petNumber;
    if (checked) {
      number++;
    } else if (!checked && petNumber > 0) {
      number--;
    }
    setPetNumber(number);
  }, [checked]);

  useEffect(() => {
    if (petNumber <= 1) {
      setNewPrice(price);
    } else {
      setNewPrice(price * petNumber);
    }
  }, [petNumber]);

  const setChecked = () => {
    setIsChecked(!checked);
  };
  return (
    <View style={styles.checkbox}>
      <CheckBox title={name} checked={checked} onPress={setChecked} />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: "#ddd"
  },
  data: {
    paddingHorizontal: 8,
    paddingVertical: 9,
    color: "grey"
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
