import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Alert,
  ScrollView,
} from "react-native";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, Icon } from "react-native-elements";
import { globalStyles } from "../styles/global";
import { searchAccommodationStyles } from "../styles/searchAccommodationStyle";
import Toast from "react-native-easy-toast";

function CreateAccommodation(props) {
  const toastRef = useRef();
  const [newStartTime, setStartTime] = useState(new Date());
  const [newEndTime, setEndTime] = useState(new Date());

  const { navigation, screenProps } = props;
  const { userInfo } = screenProps;

  const [modeS, setModeS] = useState("date");
  const [showS, setShowS] = useState(false);

  const [modeE, setModeE] = useState("date");
  const [showE, setShowE] = useState(false);

  const onChangeS = (event, selectedDate) => {
    if (event.type === "set") {
      const currentDate = selectedDate;
      setShowS(false);
      setStartTime(currentDate);
    } else if (event.type === "dismissed") {
      const defaultTime = newStartTime;
      setShowS(false);
      setStartTime(defaultTime);
    }
  };

  const showModeS = (currentMode) => {
    setShowS(true);
    setModeS(currentMode);
  };

  const showDatepickerS = () => {
    showModeS("date");
  };

  const onChangeE = (event, selectedDate) => {
    if (event.type === "set") {
      const currentDate = selectedDate;
      setShowE(false);
      setEndTime(currentDate);
    } else if (event.type === "dismissed") {
      const defaultTime = newEndTime;
      setShowE(false);
      setEndTime(defaultTime);
    }
  };

  const showModeE = (currentMode) => {
    setShowE(true);
    setModeE(currentMode);
  };

  const showDatepickerE = () => {
    showModeE("date");
  };

  const newIsCanceled = false;
  const [newSalary, setNewSalary] = useState(null);

  const all = () => {
    addAccommodation();
  };

  const checkSalary = () => {
    if (newSalary === null || isNaN(newSalary)) {
      toastRef.current.show("Salario inválido");
      setNewSalary(null);
    } else {
      if (!Number.isInteger(Math.round(newSalary * 1000000) / 10000)) {
        toastRef.current.show("Precio con dos decimales máximo");
        setNewSalary(null);
      } else {
        if (newSalary < 10) {
          toastRef.current.show("Salario mínimo de 10");
          setNewSalary(null);
        } else if (newSalary > 500) {
          toastRef.current.show("Precio máximo 500");
          setNewSalary(null);
        } else {
          all();
        }
      }
    }
  };

  const addAccommodation = () => {
    let id = db.ref("accommodation").push().key;

    if (
      newStartTime === null ||
      newEndTime === null ||
      new Date().getTime() - newStartTime.getTime() > 60000 ||
      newEndTime.getTime() - newStartTime.getTime() < 86100000
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
          "La fecha de entrada debe ser anterior a la fecha de salida.\n"
        );
      }
      Alert.alert("Advertencia", errores.toString());
    } else {
      const money = Math.round(newSalary * 1.25 * 100) / 100;
      
      let accommodationData = {
        id: id,
        startTime: newStartTime.toISOString(),
        endTime: newEndTime.toISOString(),
        isCanceled: newIsCanceled,
        salary: Math.round(newSalary * 100) / 100,
        worker: userInfo.id,
        price: money,
      };
      db.ref("accommodation/" + id)
        .set(accommodationData)
        .then(() => {
          Alert.alert(
            "Éxito",
            "Se ha registrado el alojamiento correctamente."
          );
          navigation.popToTop();
        })
        .catch(() => {});
    }
  };

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView keyboardShouldPersistTaps="never">
        <View style={globalStyles.viewFeed}>
          <View style={globalStyles.viewFlex1}>
            <Text style={searchAccommodationStyles.searchAccommodationTxt3}>
              Establecer Fecha
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
              Precio / noche
            </Text>
            <TextInput
              placeholder="10.00"
              keyboardType="numeric"
              maxLength={6}
              style={searchAccommodationStyles.searchAccommodationView3}
              onChange={(v) => {
                if (v.nativeEvent.text !== "") {
                  setNewSalary(v.nativeEvent.text);
                } else {
                  setNewSalary(null);
                }
              }}
            ></TextInput>
            <Button
              buttonStyle={searchAccommodationStyles.searchAccommodationBtn2}
              containerStyle={
                searchAccommodationStyles.searchAccommodationContainer3
              }
              title="Crear"
              onPress={checkSalary}
              icon={
                <Icon
                  type="material-community"
                  name="content-save"
                  size={25}
                  color="white"
                  marginLeft={10}
                />
              }
              titleStyle={searchAccommodationStyles.searchAccommodationTxt4}
            />
          </View>
        </View>
      </ScrollView>
      <Toast ref={toastRef} position="center" opacity={0.8} />
    </SafeAreaView>
  );
}

export default withNavigation(CreateAccommodation);
