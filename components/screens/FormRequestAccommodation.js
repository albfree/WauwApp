import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Alert, ScrollView } from "react-native";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../account/QueriesProfile";
import { CheckBox } from "react-native-elements";
import { Button, Icon } from "react-native-elements";
import { globalStyles } from "../styles/global";
import { searchAccommodationStyles } from "../styles/searchAccommodationStyle";
import DateTimePicker from "@react-native-community/datetimepicker";
import _ from "lodash";

function FormRequestAccommodation(props) {
  const { navigation, screenProps } = props;
  const { userInfo } = screenProps;

  const [newStartTime, setStartTime] = useState(new Date());
  const [newEndTime, setEndTime] = useState(new Date());

  const [modeS, setModeS] = useState("date");
  const [showS, setShowS] = useState(false);

  const [modeE, setModeE] = useState("date");
  const [showE, setShowE] = useState(false);

  const [petNumber, setPetNumber] = useState(0);
  const [petNames, setPetNames] = useState([]);

  const startAccommodation = new Date(
    navigation.state.params.accommodation.startTime
  );
  const endAccommodation = new Date(
    navigation.state.params.accommodation.endTime
  );

  const fechaParseadaCorta = (fecha) => {
    var fechaRecibida = new Date(fecha);
    return (
      fechaRecibida.getDate() +
      "/" +
      parseInt(fechaRecibida.getMonth() + 1) +
      "/" +
      fechaRecibida.getFullYear()
    );
  };

  const onChangeS = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowS(Platform.OS === "ios");
    setStartTime(currentDate);
  };

  const showModeS = (currentMode) => {
    setShowS(true);
    setModeS(currentMode);
  };

  const showDatepickerS = () => {
    showModeS("date");
  };

  const onChangeE = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowE(Platform.OS === "ios");
    setEndTime(currentDate);
  };

  const showModeE = (currentMode) => {
    setShowE(true);
    setModeE(currentMode);
  };

  const showDatepickerE = () => {
    showModeE("date");
  };

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

  const sendForm = () => {
    let formData = {
      idAccommodation: navigation.state.params.accommodation.id,
      pending: navigation.state.params.accommodation.pending,
      salary: navigation.state.params.accommodation.salary,
      worker: navigation.state.params.accommodation.worker,
      isCanceled: navigation.state.params.accommodation.isCanceled,
      startTime: newStartTime,
      endTime: newEndTime,
      petNumber: petNumber,
    };

    if (
      newStartTime === null ||
      newEndTime === null ||
      new Date().getTime() - newStartTime.getTime() > 60000 ||
      newEndTime.getTime() - newStartTime.getTime() < 86100000 ||
      petNumber === 0 ||
      startAccommodation.getTime() - newStartTime.getTime() > 43200000 ||
      endAccommodation.getTime() - newEndTime.getTime() < -43200000
    ) {
      let errores = "";
      if (newStartTime === null) {
        errores = errores.concat("Debe escribir una fecha de entrada.\n");
      }
      if (newEndTime === null) {
        errores = errores.concat("Debe escribir una fecha de salida.\n");
      }

      if (new Date().getTime() - newStartTime.getTime() > 60000) {
        errores = errores.concat(
          "La fecha de entrada debe ser posterior o igual a la actual.\n"
        );
      }
      if (newEndTime.getTime() - newStartTime.getTime() < 86100000) {
        errores = errores.concat(
          "La fecha de salida debe ser posterior a la fecha de entrada.\n"
        );
      }
      if (petNumber === 0 && petNames === null) {
        errores = errores.concat(
          "Tienes que añadir alguna mascota a tu perfil.\n"
        );
      }
      if (petNumber === 0) {
        errores = errores.concat(
          "Tienes que seleccionar alguna mascota para el alojamiento.\n"
        );
      }

      if (startAccommodation.getTime() - newStartTime.getTime() > 43200000) {
        errores = errores.concat(
          "La fecha de inicio no puede ser anterior a la fecha de inicio del alojamiento.\n"
        );
      }
      if (endAccommodation.getTime() - newEndTime.getTime() < -43200000) {
        errores = errores.concat(
          "La fecha de fin no puede ser posterior a la fecha de fin del alojamiento.\n"
        );
      }

      Alert.alert("Advertencia", errores.toString());
    } else {
      navigation.navigate("CreateRequestAccommodation", {
        formData: formData,
      });
      Alert.alert("Éxito", "Confirme su solicitud.");
    }
  };

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView>
        <View style={globalStyles.viewFeed}>
          <View style={globalStyles.viewFlex1}>
            <Text style={searchAccommodationStyles.searchAccommodationTxt}>
              Introduzca las fechas que desea
            </Text>
            <View style={searchAccommodationStyles.searchAccommodationView}>
              <Button
                buttonStyle={searchAccommodationStyles.searchAccommodationBtn}
                containerStyle={
                  searchAccommodationStyles.searchAccommodationContainer
                }
                title="Fecha de Entrada"
                onPress={showDatepickerS}
                icon={
                  <Icon
                    type="material-community"
                    name="calendar-import"
                    size={20}
                    color="white"
                    marginLeft={10}
                  />
                }
                titleStyle={searchAccommodationStyles.searchAccommodationTxt4}
              />
              {showS && (
                <DateTimePicker
                  testID="dateTimePickerS"
                  timeZoneOffsetInMinutes={0}
                  value={newStartTime}
                  mode={modeS}
                  is24Hour={true}
                  display="default"
                  onChange={onChangeS}
                />
              )}
              <Button
                buttonStyle={searchAccommodationStyles.searchAccommodationBtn}
                containerStyle={
                  searchAccommodationStyles.searchAccommodationContainer2
                }
                title="Fecha de Salida"
                onPress={showDatepickerE}
                icon={
                  <Icon
                    type="material-community"
                    name="calendar-export"
                    size={20}
                    color="white"
                    marginLeft={10}
                  />
                }
                titleStyle={searchAccommodationStyles.searchAccommodationTxt4}
              />

              {showE && (
                <DateTimePicker
                  testID="dateTimePickerE"
                  timeZoneOffsetInMinutes={0}
                  value={newEndTime}
                  mode={modeE}
                  is24Hour={true}
                  display="default"
                  onChange={onChangeE}
                />
              )}
            </View>

            <Text style={searchAccommodationStyles.searchAccommodationTxt3}>
              Fechas Disponibles
            </Text>
            <Text style={searchAccommodationStyles.searchAccommodationTxt2}>
              Del {fechaParseadaCorta(startAccommodation)} hasta el{" "}
              {fechaParseadaCorta(endAccommodation)}
            </Text>
            <Text style={searchAccommodationStyles.searchAccommodationTxt}>
              ¿Qué mascotas quiere alojar?
            </Text>

            {petNames.map((pet) => (
              <PetCheckbox
                name={pet}
                petNumber={petNumber}
                setPetNumber={setPetNumber}
              />
            ))}

            <Button
              buttonStyle={searchAccommodationStyles.searchAccommodationBtn2}
              containerStyle={
                searchAccommodationStyles.searchAccommodationContainer3
              }
              title="Crear"
              onPress={sendForm}
              icon={
                <Icon
                  type="material-community"
                  name="content-save"
                  size={20}
                  color="white"
                  marginLeft={10}
                />
              }
              titleStyle={searchAccommodationStyles.searchAccommodationTxt4}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withNavigation(FormRequestAccommodation);

function PetCheckbox(props) {
  const { name, petNumber, setPetNumber } = props;
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

  const setChecked = () => {
    setIsChecked(!checked);
  };
  return (
    <View>
      <CheckBox title={name} checked={checked} onPress={setChecked} />
    </View>
  );
}
