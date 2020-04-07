import React from "react";

// Components for export email information
import qs from "qs";
import email from "react-native-email";
import { db } from "../../population/config";
import * as firebase from "firebase";


import { View, Text, ScrollView, SafeAreaView, Button } from "react-native";

export default function UserData(props) {
  var user = props.navigation.state.params.userInfo;
  var request = props.navigation.state.params.request;
  
  for(let i = 0; i < request.length; i++) {
      console.log("Request " + (i + 1), request[i]);
  }

  sendEmail = () => {
    email("sergiotb15@gmail.com", {
      cc: "",
      bcc: "",
      body: "Cuerpo de ejemplo",
      subject: "Prueba de subject",
    })
      .then(() => {
        console.log("Mensaje enviado con éxito");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
      <SafeAreaView>
        <ScrollView>
          <View>
            <Text> UserData.js </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
}
