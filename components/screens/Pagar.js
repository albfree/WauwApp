import React, { useState, useEffect } from "react";
import { Text, View, Button, Alert } from "react-native";
import axios from "axios";
import qs from "qs";
import { decode, encode } from "base-64";
import { TextInput } from "react-native-gesture-handler";
import { db } from "../population/config";
import { withNavigation } from "react-navigation";
import { email as gmail } from "../account/QueriesProfile";

function Pagar(props) {
  //var email = props.navigation.state.params.email;
  //var email = "sb-qs47l5748001@personal.example.com";

  const { navigation } = props;
  var request = props.navigation.state.params.request;

  const [accessToken, setAccessToken] = useState("");
  const [paypalUrl, setPaypalUrl] = useState("");
  const [valor, setValor] = useState("");
  const [valido, setValido] = useState("Su email no es válido");
  let validEmail = false;

  //Fix bug btoa
  useEffect(() => {
    if (!global.btoa) {
      global.btoa = encode;
    }

    if (!global.atob) {
      global.atob = decode;
    }
  }, []);

  const payment = async () => {
    var emailUser = valor;
    var pattern =
      "^([A-Za-z0-9-._]{1,}@[A-Za-z]{2,}.{1}[a-z]{0,}.{0,1}.{0,1}[a-z]{2,})$";
    if (valor !== "" && valor.match(pattern)) {
      validEmail = true;
    } else {
      validEmail = false;
    }

    if (validEmail) {
      Alert.alert(
        "El pago se realizará sobre este correo",
        "¿Estás seguro?",
        [
          {
            text: "Si",
            onPress: finishRequest,
          },
          {
            text: "No",
            style: "cancel",
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert("No válido", "Este email no es válido para otener el cobro");
    }

    function finishRequest() {
      var idRequest = request.id;
      var query = db.ref().child("requests/" + idRequest);
      query.update({
        isFinished: true,
      });

      alert("Se ha finalizado el servicio correctamente");

      var id;
      db.ref("wauwers")
        .orderByChild("email")
        .equalTo(gmail)
        .once("child_added", (snap) => {
          id = snap.val().id;
        });
        
      db.ref("wauwers/" + id).update({
        paypalUrl: valor,
      });
      navigation.popToTop();
    }
  };

  const testEmail = () => {
    var pattern =
      "^([A-Za-z0-9-._]{1,}@[A-Za-z]{2,}.{1}[a-z]{0,}.{0,1}.{0,1}[a-z]{2,})$";
    if (valor !== "" && valor.match(pattern)) {
      setValido("Su email es válido");
    } else {
      setValido("Su email no es válido");
    }
  };

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => {
          setValor(text);
        }}
        value={valor}
      />

      <Button title={"Solicitar el cobro"} onPress={payment} />
    </View>
  );
}

export default withNavigation(Pagar);
