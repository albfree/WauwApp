import React, { useState, useEffect } from "react";
import {
  View,
  YellowBox,
  Text,
  TextInput,
  SafeAreaView,
  Alert
} from "react-native";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import DateTimePicker from "@react-native-community/datetimepicker";
import { email } from "../account/QueriesProfile";
import _ from "lodash";
import { Button, Icon } from "react-native-elements";
import { globalStyles } from "../styles/global";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

function EditDeleteAccommodation(props) {
  const { navigation } = props;

  const [newStartTime, setStartTime] = useState(
    new Date(navigation.state.params.accommodation.startTime)
  );
  const [newEndTime, setEndTime] = useState(
    new Date(navigation.state.params.accommodation.endTime)
  );
  const [modeS, setModeS] = useState("date");
  const [showS, setShowS] = useState(false);

  if (!navigation.state.params.editable) {
    var x = new Date(navigation.state.params.accommodation.startTime);
    var y = new Date(navigation.state.params.accommodation.endTime);
  }

  const [modeE, setModeE] = useState("date");
  const [showE, setShowE] = useState(false);

  const [setReloadData] = useState(false);

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

  const [newSalary, setNewSalary] = useState(
    navigation.state.params.accommodation.salary
  );
  const [isLoading, setIsLoading] = useState(false);

  const all = () => {
    updateAccomodation();
  };

  const addCommissions = props => {
    let price = props * 1.25;
    setNewSalary(price);
  };

  const id = navigation.state.params.accommodation.id;

  const cancelAccomodation = () => {
    Alert.alert(
      "Atención",
      "Si cancela el alojamiento se dejarán de recibir solicitudes ¿Desea continuar?",
      [
        {
          text: "Sí",
          onPress: () => cancelationConfirmed()
        },
        {
          text: "No",
          onPress: () => console.log("Alert closed")
        }
      ]
    );
  };

  const cancelationConfirmed = () => {
    let accommodationData = {
      isCanceled: true
    };

    db.ref("accommodation")
      .child(id)
      .update(accommodationData)
      .then(() => {
        setReloadData(true);
        setIsVisibleModal(false);
        setIsLoading(true);
      })
      .catch(() => {
        setError("Ha ocurrido un error");
        setIsLoading(false);
      });
    Alert.alert("Éxito", "Alojamiento cancelado.");
    navigation.navigate("MyAccommodations");
  };

  const updateAccomodation = () => {
    if (
      newStartTime === null ||
      newEndTime === null ||
      newSalary === null ||
      newStartTime < new Date() ||
      newEndTime < newStartTime
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

      if (newStartTime < new Date()) {
        errores = errores.concat(
          "La fecha de entrada debe ser posterior o igual a la actual.\n"
        );
      }
      if (newEndTime < newStartTime) {
        errores = errores.concat(
          "La fecha de entrada debe ser anterior o igual a la fecha de salida.\n"
        );
      }
      Alert.alert("Advertencia", errores.toString());
    } else {
      let errores = "";
      if (isNaN(newSalary) || newSalary < 10) {
        errores = errores.concat("El precio mínimo es 10.\n");
        if (newStartTime < new Date() || newEndTime < newStartTime) {
          errores = errores.concat(
            "La fecha de entrada debe ser posterior o igual a la actual.\n"
          );
          errores = errores.concat(
            "La fecha de entrada debe ser anterior o igual a la fecha de salida.\n"
          );
        }

        Alert.alert("Advertencia", errores.toString());
      } else {
        let accommodationData = {
          startTime: newStartTime.toISOString(),
          endTime: newEndTime.toISOString(),
          salary: newSalary
        };

        db.ref("accommodation")
          .child(id)
          .update(accommodationData)
          .then(() => {
            setReloadData(true);
            setIsVisibleModal(false);
            setIsLoading(true);
          })
          .catch(() => {
            setError("Ha ocurrido un error");
            setIsLoading(false);
          });
        Alert.alert("Éxito", "Se ha editado el alojamiento correctamente.");
        navigation.navigate("MyAccommodations");
      }
    }
  };

  return (
    <SafeAreaView style={globalStyles.safeShowRequestArea}>
      {navigation.state.params.editable ? (
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
                <Button
                  buttonStyle={globalStyles.editAccommodationEditDateBtn3}
                  containerStyle={
                    globalStyles.editAccommodationEditDateBtnContainer3
                  }
                  title="Guardar"
                  onPress={all}
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
              <View style={globalStyles.editAccommodationColumn2}>
                <Text style={globalStyles.editAccommodationEditDate}>
                  Editar Fecha
                </Text>
                <Text style={globalStyles.editAccommodationEditPrize}>
                  Precio / noche
                </Text>
                <TextInput
                  value={navigation.state.params.accommodation.salary}
                  placeholder={(
                    navigation.state.params.accommodation.salary * 0.8
                  )
                    .toFixed(2)
                    .toString()}
                  keyboardType="numeric"
                  style={globalStyles.editAccommodationEditPrize2}
                  onChange={v => addCommissions(v.nativeEvent.text)}
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
                <Button
                  buttonStyle={globalStyles.editAccommodationEditDateBtn4}
                  containerStyle={
                    globalStyles.editAccommodationEditDateBtnContainer4
                  }
                  title="Cancelar Alojamiento"
                  onPress={cancelAccomodation}
                  icon={
                    <Icon
                      type="material-community"
                      name="cancel"
                      size={20}
                      color="white"
                      marginLeft={10}
                    />
                  }
                  titleStyle={globalStyles.editAccommodationEditDateTittle2}
                />
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={globalStyles.showRequestFeed}>
          <View style={globalStyles.viewFlex1}>
            <View style={globalStyles.showRequestRow}>
              <View style={globalStyles.showRequestColumn1}>
                <Text style={globalStyles.editAccommodationDate1}>
                  Fecha de inicio:
                </Text>
                <Text style={globalStyles.editAccommodationDate2}>
                  {x.getDate() +
                    "/" +
                    parseInt(x.getMonth() + 1) +
                    "/" +
                    x.getFullYear()}
                </Text>

                <Text style={globalStyles.editAccommodationDate1}>
                  Fecha de fin:
                </Text>
                <Text style={globalStyles.editAccommodationDate2}>
                  {y.getDate() +
                    "/" +
                    parseInt(y.getMonth() + 1) +
                    "/" +
                    y.getFullYear()}
                </Text>
              </View>
              <View style={globalStyles.showRequestColumn3}>
                <Text style={globalStyles.editAccommodationPrice1}>
                  Precio por noche:
                </Text>
                <Text style={globalStyles.editAccommodationPrice2}>
                  {(navigation.state.params.accommodation.salary * 0.8)
                    .toFixed(2)
                    .toString()}{" "}
                  €
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

export default withNavigation(EditDeleteAccommodation);
