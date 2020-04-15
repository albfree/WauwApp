import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Button,
} from "react-native";
import { WebView } from "react-native-webview";
import { withNavigation } from "react-navigation";
import axios from "axios";
import qs from "qs";
import { decode, encode } from "base-64";
import { db } from "../population/config.js";

export default function Pagar(props) {
  //var email = props.navigation.state.params.email;
  var email = "sb-qs47l5748001@personal.example.com";

  const [accessToken, setAccessToken] = useState("");
  const [paypalUrl, setPaypalUrl] = useState("");
  const [shouldShowWebViewLoading, setShouldShowWebviewLoading] = useState(
    true
  );

  //Fix bug btoa
  useEffect(() => {
    if (!global.btoa) {
      global.btoa = encode;
    }

    if (!global.atob) {
      global.atob = decode;
    }
  }, []);

  var paymentURL = "https://api.sandbox.paypal.com/v1/payments/payouts";

  payment = async () => {
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
          value: "3.99",
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
            console.log("paypalUrl", paypalUrl);
          })
          .catch((err) => {
            console.log("Error primer catch");
            console.log({ err });
          });
      })
      .catch((err) => {
        console.log("Error segundo catch");
        console.log(err);
      });

  };


  return (
    <View>
      <Text> Estamos en pagar.js </Text>
      <Button title={"Prueba de pago"} onPress={payment} />
    </View>
  );
}
