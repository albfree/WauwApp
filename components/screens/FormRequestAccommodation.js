import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, Alert } from "react-native";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../account/QueriesProfile";
import { CheckBox } from "react-native-elements";
import { Button, Icon } from "react-native-elements";
import { globalStyles } from "../styles/global";

import DateTimePicker from "@react-native-community/datetimepicker";
import _ from "lodash";

function FormRequestAccommodation(props) {
  const { navigation } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [reloadData, setReloadData] = useState(false);

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

  const onChangeS = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowS(Platform.OS === "ios");
    setStartTime(currentDate);
  };

  const showModeS = currentMode => {
    setShowS(true);
    setModeS(currentMode);
  };

  const showDatepickerS = () => {
    showModeS("date");
  };

  const onChangeE = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowE(Platform.OS === "ios");
    setEndTime(currentDate);
  };

  const showModeE = currentMode => {
    setShowE(true);
    setModeE(currentMode);
  };

  const showDatepickerE = () => {
    showModeE("date");
  };

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

  const sendForm = () => {
    let formData = {
      idAccommodation: navigation.state.params.accommodation.id,
      pending: navigation.state.params.accommodation.pending,
      salary: navigation.state.params.accommodation.salary,
      worker: navigation.state.params.accommodation.worker,
      isCanceled: navigation.state.params.accommodation.isCanceled,
      startTime: newStartTime,
      endTime: newEndTime,
      petNumber: petNumber
    };

    if (
      newStartTime === null ||
      newEndTime === null ||
      newStartTime < new Date() ||
      newEndTime.getDate() - newStartTime.getDate() == 0 ||
      petNumber === null ||
      newStartTime.getTime() - startAccommodation.getTime() < 0 ||
      newEndTime.getTime() - endAccommodation.getTime() > 0
    ) {
      let errores = "";
      if (newStartTime === null) {
        errores = errores.concat("Debe escribir una fecha de entrada.\n");
      }
      if (newEndTime === null) {
        errores = errores.concat("Debe escribir una fecha de salida.\n");
      }

      if (newStartTime < new Date()) {
        errores = errores.concat(
          "La fecha de entrada debe ser posterior o igual a la actual.\n"
        );
      }
      if (newEndTime.getDate() - newStartTime.getDate() == 0) {
        errores = errores.concat(
          "La fecha de entrada debe ser anterior o igual a la fecha de salida.\n"
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
      if (newStartTime.getTime() - startAccommodation.getTime() < 0) {
        errores = errores.concat(
          "La fecha de inicio no puede ser anterior a la fecha de inicio del alojamieto.\n"
        );
      }
      if (newEndTime.getTime() - endAccommodation.getTime() > 0) {
        errores = errores.concat(
          "La fecha de fin no puede ser posterior a la fecha de fin del alojamieto.\n"
        );
      }

      Alert.alert("Advertencia", errores.toString());
    } else {
      let errores = "";
      if (newStartTime < new Date() || newEndTime < newStartTime) {
        errores = errores.concat(
          "La fecha de entrada debe ser posterior o igual a la actual.\n"
        );
        errores = errores.concat(
          "La fecha de entrada debe ser anterior o igual a la fecha de salida.\n"
        );

        Alert.alert("Advertencia", errores.toString());
      } else {
        setIsLoading(true);

        navigation.navigate("CreateRequestAccommodation", {
          formData: formData
        });
        Alert.alert("Éxito", "Confirme su solicitud.");
      }
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeShowRequestArea}>
      <View style={globalStyles.showRequestFeed}>
        <View style={globalStyles.viewFlex1}>
          <View style={globalStyles.showRequestRow}>
            <View style={globalStyles.editAccommodationColumn1}>
              <Button
                buttonStyle={globalStyles.editAccommodationEditDateBtn}
                containerStyle={
                  globalStyles.editAccommodationEditDateBtnContainer
                }
                title="Fecha de Entrada"
                onPress={showDatepickerS}
                icon={
                  <Icon
                    type="material-community"
                    name="calendar-import"
                    size={20}
                    color="white"
                  />
                }
                titleStyle={globalStyles.editAccommodationEditDateTittle}
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
            </View>
            <View style={globalStyles.editAccommodationColumn2}>
              <Text style={globalStyles.accommodationDate}>
                Introduzca las fechas que desea
              </Text>
              <Text style={globalStyles.accommodationDate2}>
                Fechas Disponibles
              </Text>
              <Text style={globalStyles.accommodationDate3}>
                Del{" "}
                {startAccommodation.toLocaleString("en-US").substring(0, 10)}{" "}
                hasta el{" "}
                {endAccommodation.toLocaleString("en-US").substring(0, 10)}
              </Text>
              <Text style={globalStyles.accommodationPets}>
                ¿Qué mascotas quiere que pasee?
              </Text>
              <View>
                {petNames.map(pet => (
                  <PetCheckbox
                    name={pet}
                    petNumber={petNumber}
                    setPetNumber={setPetNumber}
                  />
                ))}
              </View>
              <Button
                buttonStyle={globalStyles.accommodationBtn}
                containerStyle={globalStyles.accommodationBtnCnt}
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
                titleStyle={globalStyles.editAccommodationEditDateTittle}
              />
            </View>
            <View style={globalStyles.editAccommodationColumn3}>
              <Button
                buttonStyle={globalStyles.editAccommodationEditDateBtn}
                containerStyle={
                  globalStyles.editAccommodationEditDateBtnContainer2
                }
                title="Fecha de Salida"
                onPress={showDatepickerE}
                icon={
                  <Icon
                    type="material-community"
                    name="calendar-export"
                    size={20}
                    color="white"
                  />
                }
                titleStyle={globalStyles.editAccommodationEditDateTittle}
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
          </View>
        </View>
      </View>
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
