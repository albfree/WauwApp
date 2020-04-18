import React, { useState, useEffect } from "react";
import { Text, View, Alert, SafeAreaView, ScrollView } from "react-native";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../account/QueriesProfile";
import _ from "lodash";
import { Button, Icon } from "react-native-elements";
import { globalStyles } from "../styles/global";
import { searchAccommodationStyles } from "../styles/searchAccommodationStyle";

function createRequestAccommodation(props) {
  const { navigation } = props;

  const [reloadData, setReloadData] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //Atributos del props
  const newIdAccommodation = navigation.state.params.formData.idAccommodation;
  const startTime = navigation.state.params.formData.startTime;

  const endTime = navigation.state.params.formData.endTime;
  const newPetNumber = navigation.state.params.formData.petNumber;

  //Poner fechas medianamente bonitas
  const newStartTime = startTime;
  const newEndTime = endTime;

  var x = new Date(startTime);
  var y = new Date(endTime);
 
  //Atributos definidos

  const newIsCanceled = false;
  const newType = "sitter";
  const newIsPayed = false;
  const newIsFinished = false;
  const newIsRated = false;

  const newPending = true;

  //Worker y owner

  const [newWorker, setNewWorker] = useState([]);
  const [newOwner, setNewOwner] = useState([]);

  const [newPrice, setNewPrice] = useState(
    navigation.state.params.formData.salary
  );

  //Owner logueado actualmente que realizada la request
  useEffect(() => {
    db.ref("wauwers")
      .orderByChild("email")
      .equalTo(email)
      .on("value", function (snap) {
        snap.forEach(function (child) {
          setNewOwner(child.val());
        });
      });
  }, [reloadData]);

  //Búsqueda por id del worker que creó el alojamiento
  useEffect(() => {
    db.ref("wauwers")
      .orderByChild("id")
      .equalTo(navigation.state.params.formData.worker)
      .on("value", function (snap) {
        snap.forEach(function (child) {
          setNewWorker(child.val());
        });
      });
  }, [reloadData]);

  //Funcion llamada en el botón

  const all = () => {
    addRequestAccommodation();
    Alert.alert("Éxito", "Se ha creado su solicitud correctamente.");
    navigation.popToTop();
  };

  //Añadir la request a la db

  const addRequestAccommodation = () => {
    let id = db.ref("requests").push().key;
    setError(null);
    setIsLoading(true);
    let requestData = {
      id: id,
      pending: newPending,
      owner: newOwner.id,
      price: newPrice,
      type: newType,
      isCanceled: newIsCanceled,
      startTime: x.toISOString(),
      endTime: y.toISOString(),
      worker: newWorker.id,
      petNumber: newPetNumber,
      accommodation: newIdAccommodation,
      isPayed: newIsPayed,
      isFinished: newIsFinished,
      isRated: newIsRated,
    };

    setIsLoading(true);

    db.ref("requests/" + id)
      .set(requestData)
      .then(() => {
        setIsLoading(false);
        setReloadData(false);
        setIsVisibleModal(false);
      })
      .catch(() => {
        setError("Ha ocurrido un error");
        setIsLoading(false);
      });
  };

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <View style={globalStyles.viewFeed}>
        <View style={globalStyles.viewFlex1}>
          <View style={searchAccommodationStyles.searchAccommodationView2}>
            <Text style={searchAccommodationStyles.searchAccommodationTxt}>
              {"Nombre del Cuidador\n"}

              <Text style={searchAccommodationStyles.searchAccommodationTxt2}>
                {newWorker.name}
              </Text>
            </Text>
            <Text style={searchAccommodationStyles.searchAccommodationTxt5}>
              {newWorker.description}
            </Text>

            <Text style={searchAccommodationStyles.searchAccommodationTxt6}>
              {"Fecha de inicio\n"}
              <Text style={searchAccommodationStyles.searchAccommodationTxt2}>
                {newStartTime.toISOString()}
              </Text>{" "}
            </Text>
            <Text style={searchAccommodationStyles.searchAccommodationTxt6}>
              {"Fecha de finalización\n"}
              <Text style={searchAccommodationStyles.searchAccommodationTxt2}>
                {newEndTime.toISOString()}
              </Text>{" "}
            </Text>

            <Precio
              startTime={startTime}
              endTime={endTime}
              petNumber={newPetNumber}
              newPrice={newPrice}
              setNewPrice={setNewPrice}
            />

            <Button
              buttonStyle={searchAccommodationStyles.searchAccommodationBtn2}
              containerStyle={
                searchAccommodationStyles.searchAccommodationContainer3
              }
              title="Enviar Solicitud"
              onPress={all}
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
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default withNavigation(createRequestAccommodation);

function Precio(props) {
  const { startTime, endTime, petNumber, newPrice, setNewPrice } = props;

  let duration =
    (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60 * 24);
  const days = parseInt(duration, 10) + 1;

  // Si cambia de mes coge los dias bien, pero si esta en el mismo mes coge 1 dia menos
  // estaria bien darle una vuelta a esto. Mientras se queda que suma un dia a todo.

  // const [DefDays, setDefDays] = useState(days);
  //  console.log(DefDays);

  useEffect(() => {
    // if(startTime.getMonth() != endTime.getMonth()){
    //   setDefDays(DefDays);
    //   console.log("Entra if");
    // }else{
    //   setDefDays(DefDays + 1);
    //   console.log("Entra else");

    // }

    // console.log(days);
    let precio = newPrice * days;
    let withPets = precio * petNumber;
    setNewPrice(withPets);
  }, []);

  return (
    <View>
      <Text style={searchAccommodationStyles.searchAccommodationTxt6}>
        {"Precio Total del Alojamiento\n"}
        <Text style={searchAccommodationStyles.searchAccommodationTxt2}>
          {newPrice} €
        </Text>
      </Text>
    </View>
  );
}
