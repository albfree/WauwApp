import React, { useState } from "react";
import { View, Text, SafeAreaView, Alert, ScrollView } from "react-native";
import { withNavigation } from "react-navigation";
import { Button, Icon } from "react-native-elements";
import { globalStyles } from "../styles/global";
import { filterDateStyles } from "../styles/filterDateStyle";
import DateTimePicker from "@react-native-community/datetimepicker";
import _ from "lodash";

function FormFilterByDate(props) {
  const { navigation } = props;
  const [newStartTime, setStartTime] = useState(new Date());
  const [modeS, setModeS] = useState("date");
  const [showS, setShowS] = useState(false);

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

  const sendForm = () => {
    let formData = {
      startTime: newStartTime,
    };
    if (
      newStartTime === null ||
      new Date().getTime() - newStartTime.getTime() > 60000
    ) {
      let errores = "";
      if (newStartTime === null) {
        errores = errores.concat("Debe escribir una fecha de entrada.\n");
      }

      if (new Date().getTime() - newStartTime.getTime() > 60000) {
        errores = errores.concat(
          "La fecha de entrada debe ser posterior o igual a la actual.\n"
        );
      }

      Alert.alert("Advertencia", errores.toString());
    } else {
      let errores = "";
      if (new Date().getTime() - newStartTime.getTime() > 60000) {
        errores = errores.concat(
          "La fecha de entrada debe ser posterior o igual a la actual.\n"
        );

        Alert.alert("Advertencia", errores.toString());
      } else {
        navigation.navigate("SearchAccommodations", {
          formData: formData,
        });
      }
    }
  };

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView>
        <View style={globalStyles.viewFeed}>
          <View style={globalStyles.viewFlex1}>
            <View style={filterDateStyles.filterDateView2}>
              <Text style={filterDateStyles.filterDateTxt}>
                Introduzca fecha de entrada
              </Text>
              <Button
                buttonStyle={filterDateStyles.filterDateBtn}
                containerStyle={filterDateStyles.filterDateBtnContainer}
                title="Fecha de Entrada"
                onPress={showDatepickerS}
                icon={
                  <Icon
                    type="material-community"
                    name="calendar-import"
                    size={20}
                    color="white"
                    marginLeft={"5%"}
                  />
                }
                titleStyle={filterDateStyles.filterDateTittle}
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
                buttonStyle={filterDateStyles.filterDateBtn2}
                containerStyle={filterDateStyles.filterDateBtnContainer2}
                title="Buscar"
                onPress={sendForm}
                icon={
                  <Icon
                    type="material-community"
                    name="magnify"
                    size={20}
                    color="white"
                    marginLeft={"5%"}
                  />
                }
                titleStyle={filterDateStyles.filterDateTittle}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withNavigation(FormFilterByDate);
