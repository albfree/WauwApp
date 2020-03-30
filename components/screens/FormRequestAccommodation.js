import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../account/QueriesProfile";
import { CheckBox } from "react-native-elements";


import DateTimePicker from "@react-native-community/datetimepicker";
import _ from "lodash";


function FormRequestAccommodation(props) {
    const {navigation} = props;

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
  
    const startAccommodation = new Date(navigation.state.params.accommodation.startTime);
    const endAccommodation = new Date(navigation.state.params.accommodation.endTime);

    
  
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
          endTime : newEndTime,
          petNumber: petNumber,
        
        };
  
      if (
        newStartTime === null ||
          newEndTime === null ||
          newStartTime < new Date() ||
          newEndTime.getDate() - newStartTime.getDate() == 0 ||
          petNumber === null ||
          newStartTime.getTime() - startAccommodation.getTime() <0 ||
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
          if (newEndTime.getDate() - newStartTime.getDate() === 0) {
            errores = errores.concat(
              "La fecha de entrada debe ser anterior o igual a la fecha de salida.\n"
            );
          }
          if (petNumber === 0 && petNames=== null) {
            errores = errores.concat(
              "Tienes que añadir alguna mascota a tu perfil.\n"
            );
          }
          if (petNumber === 0 ){
            errores = errores.concat(
              "Tienes que seleccionar alguna mascota para el alojamiento.\n"
            );
          }
          if (newStartTime.getTime() - startAccommodation.getTime() < 0){
            errores = errores.concat(
              "La fecha de inicio no puede ser anterior a la fecha de inicio del alojamieto.\n"
            );
          }
          if (newEndTime.getTime() - endAccommodation.getTime() > 0){
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
        <View style={styles.view}>
          <View>
        <Text style={styles.text}>
        {"Introduzca las fechas para el alojamiento, le recuerdo que las fechas disponibles son del "}
        {startAccommodation.toLocaleString('en-US').substring(0,10)} {" hasta "}
         {endAccommodation.toLocaleString('en-US').substring(0,10)}</Text>
       
        </View>
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
        <View>
        <Text style={styles.text}>
          ¿Qué mascotas quiere que pasee?
        </Text>
        <View style={styles.container}>
          {petNames.map(pet => (
            <PetCheckbox
              name={pet}
              petNumber={petNumber}
              setPetNumber={setPetNumber}
            />
          ))}
        </View>
      </View>
     
        <View style={styles.buttonContainer}>
        <Button title="Añadir Fechas" onPress={sendForm} color="#0de" />
      </View>

        </View>
    
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
    <View style={styles.checkbox}>
      <CheckBox title={name} checked={checked} onPress={setChecked} />
    </View>
  );
}


const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: "#ddd"
  },
  data: {
    paddingHorizontal: 8,
    paddingVertical: 9,
    color: "grey"
  },
  buttonContainer: {
    marginTop: 40
  },
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