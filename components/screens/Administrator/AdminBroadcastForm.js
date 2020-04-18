import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  SafeAreaView,
  StyleSheet
} from "react-native";
import {Button, Input } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { db } from "../../population/config.js";
import { globalStyles } from "../../styles/global";
import { fechaParseada } from "./../../utils/DateParser";
import firebase from "firebase";

function AdminBroadcastForm(props) {
    const { navigation } = props;
    const [isLoading, setIsLoading] = useState(false);
    const [ currentDate, setCurrentDate] = useState(new Date());
    const [text, setText] = useState("");
    const [error, setError] = useState("");

    const addBroadcastMsg = () => {
        let id = db.ref("broadcast").push().key;
        setIsLoading(true);

        
        let timestamp = firebase.database.ServerValue.TIMESTAMP;
         

        let msgData = {
            id: id,
            text: text,
            date: fechaParseada(currentDate),
            timestamp: timestamp,
        };

        if(text === "" ||
            currentDate === null
            ) {
                let errores = "";

                if(text === "") {
                    errores = errores.concat("El texto del mensaje no puede estar vacío .\n");
                }

                if (currentDate === null) {
                    errores = errores.concat("La fecha es nula");
                }
                Alert.alert("Advertencia", errores.toString());
            } else {
                setIsLoading(true);
                db.ref("broadcast/" + id)
                .set(msgData)
                .then(() => {
                setIsLoading(false);
                })
                .catch(() => {
                    setError("Ha ocurrido un error");
                    setIsLoading(false);
                });
                Alert.alert("Éxito", "Se ha registrado el alojamiento correctamente.");
                navigation.popToTop();
            }
    };

    return (
        <SafeAreaView style={globalStyles.viewFlex1}>
    <ScrollView keyboardShouldPersistTaps="never">
    <View style={styles.viewBody}>
      <View style={styles.form}>
        <Input
          placeholder="Mensaje"
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChange={(e) => setText(e.nativeEvent.text)}
        />
      </View>
      <Button
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        title="Añadir Mensaje"
        onPress={addBroadcastMsg}
      />
    </View>
    </ScrollView>
    </SafeAreaView>
    );
}

const morado = "#ff7549";
const styles = StyleSheet.create({
    btn: {
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      paddingHorizontal: 15,
      paddingVertical: 5,
      backgroundColor: morado,
    },
    btnContainer: {
      alignSelf: "center",
      flex: 1,
      //justifyContent: "flex-end",
      marginBottom: 110,
      marginTop: 10,
      width: "95%",
    },
    form: {
      alignItems: "center",
      flex: 1,
      margin: 10,
      marginTop: 40,
    },
    textArea: {
      height: 100,
      margin: 0,
      padding: 0,
      width: "100%",
    },
    viewBody: {
      flex: 1,
    },
  });

export default withNavigation(AdminBroadcastForm);