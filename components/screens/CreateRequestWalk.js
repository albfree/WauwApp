import React, { useState, useEffect, useRef } from "react";
import { Text, View, Alert, SafeAreaView, ScrollView } from "react-native";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import _ from "lodash";
import { Button, Icon, CheckBox } from "react-native-elements";
import { globalStyles } from "../styles/global";
import { searchWalksStyles } from "../styles/searchWalkStyle";
import Toast from "react-native-easy-toast";

function createRequest(props) {
  const { navigation, screenProps } = props;
  const { userInfo } = screenProps;
  const toastRef = useRef();
  const [newPrice, setNewPrice] = useState(navigation.state.params.price);
  const [salary, setSalary] = useState(navigation.state.params.salary);
  const price = navigation.state.params.price;
  const [newInterval, setNewInterval] = useState(null);
  const newWorker = navigation.state.params.wauwer;
  const [reloadData, setReloadData] = useState(false);
  const [petNumber, setPetNumber] = useState(0);
  const [petNames, setPetNames] = useState([]);
  const newIsFinished = false;
  const newIsRated = false;
  const [select, setSelect] = useState(null);

  const [availabilities, setAvailabilities] = useState([]);
  const [newAvailability, setNewAvailability] = useState([]);

  const [wauwerPrices, setWauwerPrices] = useState([]);
  const value = navigation.state.params.interval;

  // useEffect(() => {
  //   // To retrieve the walker availabilities

  //   const ref = db
  //     .ref("availabilities-wauwers")
  //     .child(newWorker.id)
  //     .child("availabilities");
  //   ref
  //     .once("value", (snap) => {
  //       var availabilitiesList = [];
  //       snap.forEach((child) => {
  //         availabilitiesList.push(child.val().availability);
  //       });
  //       setAvailabilities(availabilitiesList);
  //     })
  //     .then(() => {
  //       ref.once("value", (snap) => {
  //         const prices = [];
  //         snap.forEach((child) => {
  //           prices.push(child.val().price);
  //         });
  //         setWauwerPrices(prices);
  //       });
  //     });
  //   setReloadData(false);
  // }, [reloadData]);

  useEffect(() => {
    // To retrieve my pets' names
    db.ref("pet/" + userInfo.id).once("value", (snap) => {
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

  // const funct = (value, itemPosition) => {
  //   setNewAvailability(value.id);
  //   setNewInterval(
  //     value.day + " " + value.startTime + "h - " + value.endDate + "h"
  //   );
  //   setSelect(value);
  //   //setNewPrice(wauwerPrices[itemPosition]);
  // };

  const addRequest = () => {
    const intervalo =
      value.day + " " + value.startTime + "h - " + value.endDate + "h";
    let id = db.ref("requests").push().key;
    let requestData = {
      id: id,
      isCanceled: false,
      isPayed: false,
      owner: userInfo.id,
      pending: true,
      petNumber: petNumber,
      place: "localización",
      price: newPrice,
      type: "walk",
      worker: newWorker.id,
      interval: intervalo,
      availability: value.id,
      isFinished: newIsFinished,
      isRated: newIsRated,
      salary: salary,
    };
    db.ref("requests/" + id)
      .set(requestData)
      .then(() => {
        db.ref("wauwers/" + newWorker.id)
          .update({ hasRequests: true })
          .then(() => {
            Alert.alert("Éxito", "Se ha creado su solicitud correctamente.");
            navigation.popToTop();
          })
          .catch(() => {
            toastRef.current.show("Error. Vuelva a intentarlo");
          });
      })
      .catch(() => {
        toastRef.current.show("Error. Vuelva a intentarlo");
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
              {"Intervalo seleccionado\n"}
              {value.day + " " + value.startTime + "h - " + value.endDate + "h"}
            </Text>

            <Text style={searchWalksStyles.searchWalkTxt7}>
              {"¿Qué perro desea que pasee ?"}
            </Text>
            {petNames.map((pet, index) => (
              <PetCheckBox
                key={index}
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
                  marginLeft={"15%"}
                />
              }
              titleStyle={searchWalksStyles.searchWalksBtnTxt}
            />
          </View>
        </View>
      </ScrollView>
      <Toast ref={toastRef} position="center" opacity={0.8} />
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
