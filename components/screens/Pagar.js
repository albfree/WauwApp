import React, { useState, useEffect } from "react";
import { Text, View, Button, Alert } from "react-native";
import axios from "axios";
import qs from "qs";
import { decode, encode } from "base-64";
import { TextInput } from "react-native-gesture-handler";
import { db } from "../population/config";
import { withNavigation } from "react-navigation";

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

  payment = async () => {
    var email = valor;
    var pattern =
      "^([A-Za-z0-9\-\.\_]{1,}@[A-Za-z]{2,}\.{1}[a-z]{0,}\.{0,1}\.{0,1}[a-z]{2,})$";
    if (valor !== "" && valor.match(pattern)) {
      validEmail = true;

    } else {
      validEmail = false;
    }

    if (validEmail) {
      Alert.alert(
        "Procesando el pago",
        "Se está procesando el pago. \nEn cuanto se realice, se le enviará a la página principal."
      );
      var randomNumber = Math.floor(Math.random() * 10000000) + 1;
      var sender_batch_header = {
        sender_batch_id: randomNumber,
        email_subject: "¡Tu pago por el paseo o alojamiento!",
        email_message:
          "Gracias por tu paseo o alojamiento a nuestra aplicación. Con tu servicio, hemos conseguido aportar un granito de arena a las protectoras de animales",
      };

      var items = [
        {
          recipient_type: "EMAIL",
          amount: {
            value: request.price,
            currency: "EUR",
          },
          note: "Gracias por tu servicio!",
          receiver: email,
        },
      ];

      const url = `https://api.sandbox.paypal.com/v1/oauth2/token`;

      const data = {
        grant_type: "client_credentials",
      };

      const auth = {
        username:
          "AUrtghWgBuLlBCqUDRK4NfYpHNRxRPlxdQFu1m0nV8XSrVnfGT734v_CrmSWFjGvJ9GgcVlEyJ6GsgXq", //"your_paypal-app-client-ID",
        password:
          "EMc9eBqWueUaCtRuB92j3smvFqF4jyog2nzyFFY1Ud5us5vxm5F_KOKFj2QN1fVnaj8f33zBlh8eOGz2", //"your-paypal-app-secret-ID
      };

      const options = {
        method: "post",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Credentials": true,
        },

        //Make sure you use the qs.stringify for data
        data: qs.stringify(data),
        auth: auth,
        url,
      };

      axios(options)
        .then((response) => {
          setAccessToken(response.data.access_token);
          axios
            .post(
              `https://api.sandbox.paypal.com/v1/payments/payouts`,
              { sender_batch_header, items },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${response.data.access_token}`,
                },
              }
            )
            .then((response) => {
              const link = JSON.parse(JSON.stringify(response.data.links[0]));
              setPaypalUrl(link.href);
              var idRequest = request.id;
              var query = db.ref().child("requests/" + idRequest);
              query.update({
                isFinish: true,
              });
              navigation.popToTop();
            })
            .catch((err) => {
              alert(
                "Error con el pago",
                "Se ha producido un error a la hora de tramitar el pago. Inténtelo de nuevo en unos minutos"
              );
              console.log(err);
            });
        })
        .catch((err) => {
          alert(
            "Error con el pago",
            "Se ha producido un error a la hora de tramitar el pago. Inténtelo de nuevo en unos minutos"
          );
          console.log(err);
        });
    } else {
      Alert.alert(
        "Email no válido",
        "Por favor, escriba un email válido para poder enviarle el dinero a su cuenta"
      );
    }
  };

  return (
    <View>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
        onChangeText={(text) => {
          setValor(text);
          var pattern =
            "^([A-Za-z0-9\-\.\_]{1,}@[A-Za-z]{2,}\.{1}[a-z]{0,}\.{0,1}\.{0,1}[a-z]{2,})$";
          if (valor !== "" && valor.match(pattern)) {
            setValido("Su email es válido");
          } else {
            setValido("Su email no es válido");
          }
        }}
        value={valor}
      />

      <Button title={"Obtener el dinero"} onPress={payment} />
    </View>
  );
}

export default withNavigation(Pagar);
