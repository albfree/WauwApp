import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Alert,
  ScrollView,
  Keyboard,
  Platform,
} from "react-native";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import DateTimePicker from "@react-native-community/datetimepicker";
import { email } from "../account/QueriesProfile";
import { Button, Icon } from "react-native-elements";
import { globalStyles } from "../styles/global";
import { searchAccommodationStyles } from "../styles/searchAccommodationStyle";
import { bannedAssertion } from "../account/bannedAssertion";

function CreateAccommodation(props) {
  bannedAssertion();
  const [newStartTime, setStartTime] = useState(new Date());
  const [newEndTime, setEndTime] = useState(new Date());

  const { setIsVisibleModal, navigation } = props;
  const [modeS, setModeS] = useState("date");
  const [showS, setShowS] = useState(false);

  const [modeE, setModeE] = useState("date");
  const [showE, setShowE] = useState(false);

  const [reloadData, setReloadData] = useState(false);

  const onChangeS = (event, selectedDate) => {
    const currentDate = selectedDate || date;
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
    const currentDate = selectedDate || date;
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
    db.ref("wauwers")
      .orderByChild("email")
      .equalTo(email)
      .on("value", function (snap) {
        snap.forEach(function (child) {
          setNewWorker(child.val().id);
        });
      });
    setReloadData(false);
  }, [reloadData]);

  const newIsCanceled = false;
  const [newWorker, setNewWorker] = useState([]);
  const [newSalary, setNewSalary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newPrice, setNewPrice] = useState(null);

  const all = () => {
    addAccommodation();
  };

  const addCommissions = (props) => {
    let salario = props.replace(",", ".").split(",").join("");
    let price = (salario * 1.25).toFixed(2);
    setNewSalary(parseFloat(salario).toFixed(2));
    setNewPrice(price);
  };

  const addAccommodation = () => {
    let id = db.ref("accommodation").push().key;
    setIsLoading(true);

    if (
      newStartTime === null ||
      newEndTime === null ||
      newSalary === null ||
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
      if (isNaN(newSalary) || newSalary < 10) {
        errores = errores.concat("El precio mínimo es 10.\n");
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
      let errores = "";
      if (isNaN(newSalary) || newSalary < 10) {
        errores = errores.concat("El precio mínimo es 10.\n");
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
        let accommodationData = {
          id: id,
          startTime: newStartTime.toISOString(),
          endTime: newEndTime.toISOString(),
          isCanceled: newIsCanceled,
          salary: newSalary,
          worker: newWorker,
          price: newPrice,
        };
        setIsLoading(true);
        db.ref("accommodation/" + id)
          .set(accommodationData)
          .then(() => {
            setIsLoading(false);
            setReloadData(true);
            setIsVisibleModal(false);
          })
          .catch(() => {
            setError("Ha ocurrido un error");
            setIsLoading(false);
          });
        Alert.alert("Éxito", "Se ha registrado el alojamiento correctamente.");
        navigation.popToTop();
      }
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
              style={searchAccommodationStyles.searchAccommodationView3}
              onChange={(v) => addCommissions(v.nativeEvent.text)}
              maxLength={6}
            />
            <Button
              buttonStyle={searchAccommodationStyles.searchAccommodationBtn2}
              containerStyle={
                searchAccommodationStyles.searchAccommodationContainer3
              }
              title="Crear"
              onPress={all}
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
    </SafeAreaView>
  );
}

export default withNavigation(CreateAccommodation);
