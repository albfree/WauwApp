import React from "react";

// Components for export email information
import qs from "qs";
import email from "react-native-email";
import { db } from "../../population/config";
import * as firebase from "firebase";

import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Button,
  StyleSheet,
  Image,
} from "react-native";

export default function UserData(props) {
  var user = props.navigation.state.params.userInfo;
  var requestWorker = props.navigation.state.params.request;
  var pets = props.navigation.state.params.pets;

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
        <View style={styles.fieldSet}>
          <Text style={styles.legend}>Datos personales</Text>
          <Text> {"\n"} </Text>
          <Text>Nombre: {user.name}</Text>
          <Text>Apellidos: {user.surname}</Text>
          <Text>Dirección: {user.address}</Text>
          <Text>Descripción: {user.description}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Número de mascotas: {user.petNumber}</Text>
          <Text>Salario: {user.price}</Text>
          <Text>WauwPoints: {user.wauwPoints}</Text>
          <Text>Nota media: {user.avgScore}</Text>
          {user.location !== undefined ? (
            <View>
              <Text> La localización es visible sólo para ti</Text>
              <Text>{user.location.latitude}</Text>
              <Text>{user.location.latitudeDelta}</Text>
              <Text>{user.location.longitude}</Text>
              <Text>{user.location.longitudeDelta}</Text>
            </View>
          ) : (
            <Text></Text>
          )}
        </View>

        {pets.length !== 0 ? (
          <View style={styles.fieldSet}>
            <Text style={styles.legend}>Mascotas registradas</Text>
            <Text> {"\n"} </Text>
            {pets.map((pet) => {
              let petParse = JSON.parse(JSON.stringify(pet));
              return (
                <View>
                  <Text> Nombre: {petParse.name} </Text>
                  <Text> Raza: {petParse.breed} </Text>
                  <Text> Descripción: {petParse.description} </Text>
                  <Text> {"\n"}</Text>
                </View>
              );
            })}
          </View>
        ) : (
          <Text> Actualmente tiene 0 mascotas registradas {"\n"} </Text>
        )}

        {requestWorker.length !== 0 ? (
          <View style={styles.fieldSet}>
            <Text style={styles.legend}>Solicitudes recibidas</Text>
            <Text> {"\n"} </Text>
            {requestWorker.map((request) => {
              let reqParse = JSON.parse(JSON.stringify(request));
              return (
                <View>
                  {reqParse.interval !== undefined ? (
                    <Text>Disponibilidad del paseo: {reqParse.interval}</Text>
                  ) : (
                    <Text> Alojamiento </Text>
                  )}
                  <Text>
                    {" "}
                    ¿Cancelada?: {reqParse.isCanceled === true
                      ? "Sí"
                      : "No"}{" "}
                  </Text>
                  <Text>
                    {" "}
                    ¿Pagada?: {reqParse.isPayed === true ? "Sí" : "No"}{" "}
                  </Text>
                  <Text>
                    {" "}
                    ¿Finalizada?: {reqParse.isFinished === true
                      ? "Sí"
                      : "No"}{" "}
                  </Text>
                  <Text> Precio: {reqParse.price} </Text>
                  <Text> {"\n"} </Text>
                </View>
              );
            })}
          </View>
        ) : (
          <Text>Actualmente tiene 0 solicitudes recibidas</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fieldSet: {
    margin: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: "flex-start",
    borderColor: "#000",
  },
  legend: {
    position: "absolute",
    top: -10,
    left: 10,
    fontWeight: "bold",
    backgroundColor: "#FFFFFF",
  },
});
