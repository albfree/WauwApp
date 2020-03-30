import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import DateTimePicker from "@react-native-community/datetimepicker";
import { email } from "../account/QueriesProfile";


function EditDeleteAccommodation(props) {
  const { navigation } = props;

  const [newStartTime, setStartTime] = useState(new Date(navigation.state.params.accommodation.startTime));
  const [newEndTime, setEndTime] = useState(new Date(navigation.state.params.accommodation.endTime));
  const [modeS, setModeS] = useState("date");
  const [showS, setShowS] = useState(false);

  if(!navigation.state.params.editable){
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

  const [newSalary, setNewSalary] = useState(navigation.state.params.accommodation.salary);
  const [isLoading, setIsLoading] = useState(false);

  const all = () => {
    updateAccomodation();
  };

  const addCommissions = (props) => {
    let price = (props * 1.25 )
    setNewSalary(price);
  };

  const id = navigation.state.params.accommodation.id;

  const cancelAccomodation = () => {
    Alert.alert("Atención", "Si cancela el alojamiento se dejarán de recibir solicitudes ¿Desea continuar?", [
      {
        text: "Sí", onPress: () => cancelationConfirmed()
      },
      {
        text: "No", onPress: () => console.log("Alert closed")
      }
    ]);
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
    }).catch(() => {
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
        }).catch(() => {
          setError("Ha ocurrido un error");
          setIsLoading(false);
        });
        Alert.alert("Éxito", "Se ha editado el alojamiento correctamente.");
        navigation.navigate("MyAccommodations");
      }
    }
  };

  return (
    <View style={styles.view}>
    {navigation.state.params.editable ? (
      <View>
          <Text> Edita tu alojamiento </Text>
          <View>
            <Text>Fecha</Text>
            <View>
              <View>
                <Button onPress={showDatepickerS} title="Fecha de entrada" />
              </View>

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
            <View>
              <View>
                <Button onPress={showDatepickerE} title="Fecha de salida" />
              </View>

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

          <Text>Precio por noche</Text>
          <TextInput
            value = {navigation.state.params.accommodation.salary}
            placeholder={((navigation.state.params.accommodation.salary*0.8).toFixed(2)).toString()}
            keyboardType="numeric"
            containerStyle={styles.input}
            onChange={v => addCommissions(v.nativeEvent.text)}
          />
          <Button title="Guardar" onPress={all} loading={isLoading} />
          <Button title="Cancelar alojamiento" onPress={cancelAccomodation} loading={isLoading} />
        </View>
      </View>
    ) : ( 
      <View>
        <Text>
          {"Fecha de inicio \n"}
          <Text >{x.getDate() + "/" + parseInt(x.getMonth()+1) + "/" + x.getFullYear()}</Text>
        </Text>

        <Text>
          {"Fecha de fin \n"}
          <Text >{y.getDate() + "/" + parseInt(y.getMonth()+1) + "/" + y.getFullYear()}</Text>
        </Text>

        <Text>
          {"Precio por noche \n"}
          <Text >{((navigation.state.params.accommodation.salary*0.8).toFixed(2)).toString()} €</Text>
        </Text>
      </View>
    )}
    </View>
  );
}

export default withNavigation(EditDeleteAccommodation);

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  input: {
    marginBottom: 10
  },
  btnContainer: {
    marginTop: 20,
    width: "95%"
  },
  btn: {
    backgroundColor: "#00a680"
  }
});
