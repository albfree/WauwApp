import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Alert,
  Picker,
  SafeAreaView,
  ScrollView
} from "react-native";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../account/QueriesProfile";
import { CheckBox } from "react-native-elements";
import _ from "lodash";
import { Button, Icon } from "react-native-elements";
import { globalStyles } from "../styles/global";

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

    db.ref("availabilities-wauwers")
      .child(newWorker.id)
      .child("availabilities")
      .on("value", snap => {
        var availabilitiesList = [];
        snap.forEach(child => {
          availabilitiesList.push(child.val());
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
    <SafeAreaView style={globalStyles.safeShowRequestArea}>
      <ScrollView>
        <Text style={globalStyles.accommodationSitter}>
          {"Nombre del Paseador\n"}
          <Text style={globalStyles.accommodationSitter2}>
            {newWorker.name}
          </Text>
        </Text>

        <Text style={globalStyles.walkTxt}>
          {"Precio del Paseo \n"}
          <Text style={globalStyles.walkTxt}>{newPrice} €</Text>
        </Text>

        <Text style={globalStyles.walkTxt2}>
          {"¿Cuándo quiere que " + newWorker.name + " pasee a su perro?"}
        </Text>

        <Picker
          selectedValue={newInterval}
          onValueChange={value => funct(value)}
        >
          {availabilities.map(item => (
            <Picker.Item
              label={
                item.day + " " + item.startTime + "h - " + item.endDate + "h"
              }
              value={item}
            />
          ))}
        </Picker>
        <Text style={globalStyles.accommodationSitter2}>
          {"¿Qué mascotas quiere que pasee " + newWorker.name + "?"}
        </Text>
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
        <Button
          buttonStyle={globalStyles.accommodationBtn}
          containerStyle={globalStyles.accommodationBtnCnt}
          title="Enviar Solicitud"
          onPress={checkPetNumber}
          icon={
            <Icon
              type="material-community"
              name="send"
              size={20}
              color="white"
              marginLeft={10}
            />
          }
          titleStyle={globalStyles.editAccommodationEditDateTittle}
        />
      </ScrollView>
    </SafeAreaView>
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
    <View>
      <CheckBox title={name} checked={checked} onPress={setChecked} />
    </View>
  );
}
