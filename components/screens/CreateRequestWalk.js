import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Alert,
  Picker,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../account/QueriesProfile";
import { CheckBox } from "react-native-elements";
import _ from "lodash";
import { Button, Icon } from "react-native-elements";
import { globalStyles } from "../styles/global";
import { searchWalkStyles, searchWalksStyles } from "../styles/searchWalkStyle";

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
  const newIsFinished = false;
  const newIsRated = false;
  const [select, SetSelect] = useState(null);
  useEffect(() => {
    // To retrieve the current logged user
    db.ref("wauwers")
      .orderByChild("email")
      .equalTo(email)
      .on("value", function (snap) {
        snap.forEach(function (child) {
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
      .on("value", (snap) => {
        var availabilitiesList = [];
        snap.forEach((child) => {
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
      .on("value", (snap) => {
        const pets = [];
        snap.forEach((child) => {
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

  const funct = (value) => {
    setNewAvailability(value.id);
    setNewInterval(
      value.day + " " + value.startTime + "h - " + value.endDate + "h"
    );
    SetSelect(value);
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
      availability: newAvailability,
      isFinished: newIsFinished,
      isRated: newIsRated,
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
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView>
        <View style={globalStyles.viewFeed}>
          <View style={globalStyles.viewFlex1}>
            <Text style={searchWalksStyles.searchWalkTxt4}>
              {"Nombre del Paseador\n"}
              <Text style={searchWalksStyles.searchWalkTxt5}>
                {newWorker.name}
              </Text>
            </Text>

            <Text style={searchWalksStyles.searchWalkTxt6}>
              {"Precio del Paseo \n"}
              <Text style={searchWalksStyles.searchWalkTxt5}>{newPrice} €</Text>
            </Text>

            <Text style={searchWalksStyles.searchWalkTxt7}>
              {"¿Cuándo quiere que pasee a su perro?"}
            </Text>
            <View style={searchWalksStyles.searchWalksView2}>
              <Picker
                selectedValue={select}
                onValueChange={(value) => funct(value)}
              >
                {availabilities.map((item) => (
                  <Picker.Item
                    label={
                      item.day +
                      " " +
                      item.startTime +
                      "h - " +
                      item.endDate +
                      "h"
                    }
                    value={item}
                  />
                ))}
              </Picker>
            </View>
            <Text style={searchWalksStyles.searchWalkTxt7}>
              {"¿Qué perro desea que pasee ?"}
            </Text>
            {petNames.map((pet) => (
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
              buttonStyle={searchWalksStyles.searchWalksBtn}
              containerStyle={searchWalksStyles.searchWalksBtnContainer}
              title="Enviar Solicitud"
              onPress={checkPetNumber}
              icon={
                <Icon
                  type="material-community"
                  name="send"
                  size={20}
                  color="white"
                  marginLeft={20}
                />
              }
              titleStyle={searchWalksStyles.searchWalksBtnTxt}
            />
          </View>
        </View>
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
