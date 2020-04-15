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
  var requestWorker = props.navigation.state.params.requestWorker;
  var requestOwner = props.navigation.state.params.requestOwner;
  var pets = props.navigation.state.params.pets;



  var sendEmail = function() {
    var userEmail = "Datos de usuario\n\n";
    var requestWorkerEmail = "Solicitudes recibidas\n\n";
    var requestOwnerEmail = "Solicitudes realizadas\n\n";
    var petsEmail = "Mascotas registradas en nuestra aplicación\n\n";

    userEmail += "Nombre: " + user.name + "\n";
    userEmail += "Apellidos: " + user.surname + "\n";
    if (user.address !== undefined) {
      userEmail += "Dirección: " + user.address + "\n";
    }
    userEmail += "Descripción: " + user.description + "\n";
    userEmail += "Email: " + user.email + "\n";
    userEmail += "Número de mascotas: " + user.petNumber + "\n";
    userEmail += "Salario: " + user.price + "\n";
    userEmail += "Wauwpoints: " + user.wauwPoints + "\n";
    userEmail += "Nota media: " + user.avgScore + "\n";
    if (user.location !== undefined) {
      userEmail += user.location.latitude + "\n";
      userEmail += user.location.latitudeDelta + "\n";
      userEmail += user.location.longitude + "\n";
      userEmail += user.location.longitudeDelta + "\n";
      userEmail += "\n\n";
    }

    if (pets.length !== 0) {
      {
        pets.map((pet) => {
          let petParse = JSON.parse(JSON.stringify(pet));
          petsEmail += ("Nombre: " + petParse.name + "\n");
          petsEmail += ("Descripción: " + petParse.description + "\n");
          petsEmail += ("Raza: " + petParse.breed + "\n");
          petsEmail += "\n";
        });
      }
    } else {
      petsEmail = "Actualmente tiene 0 mascotas registradas";
    }

    if (requestOwner.length !== 0) {
      console.log("Entra al if")
      requestOwner.map((reqOwner) => {
        let reqParse = JSON.parse(JSON.stringify(reqOwner));
        if (reqOwner.interval !== undefined) {
          requestOwnerEmail += "Alojamiento\n";
        } else {
          requestOwnerEmail += reqParse.interval;
        }
        requestOwnerEmail += "¿Cancelada?: ";
        if (reqParse.isCanceled) {
          requestOwnerEmail += "Sí\n";
        } else {
          requestOwnerEmail += "No\n";
        }
        requestOwnerEmail += "¿Pagada?: ";
        if (reqParse.isPayed) {
          requestOwnerEmail += "Sí\n";
        } else {
          requestOwnerEmail += "No\n";
        }
        requestOwnerEmail += "¿Finalizada?: ";
        if (reqParse.isFinished) {
          requestOwnerEmail += "Sí\n";
        } else {
          requestOwnerEmail += "No\n";
        }
        requestOwnerEmail += "Precio: " + reqParse.price;
      });
    } else {
      requestOwnerEmail += "Actualmente tiene 0 solicitudes realizadas\n";
    }

    if (requestWorker.length !== 0) {
      requestWorker.map((reqWorker) => {
        let reqParse = JSON.parse(JSON.stringify(reqWorker));
        if (reqParse.interval === undefined) {
          requestWorkerEmail += "Alojamiento\n";
        } else {
          requestWorkerEmail += ("Disponibilidad del paseo: " + reqParse.interval + "\n");
        }
        requestWorkerEmail += "¿Cancelada?: ";
        if (reqParse.isCanceled) {
          requestWorkerEmail += "Sí\n";
        } else {
          requestWorkerEmail += "No\n";
        }
        requestWorkerEmail += "¿Pagada?: ";
        if (reqParse.isPayed) {
          requestWorkerEmail += "Sí\n";
        } else {
          requestWorkerEmail += "No\n";
        }
        requestWorkerEmail += "¿Finalizada?: ";
        if (reqParse.isFinished) {
          requestWorkerEmail += "Sí\n";
        } else {
          requestWorkerEmail += "No\n";
        }
        requestWorkerEmail += "Precio: " + reqParse.price + "\n";
      });
    } else {
      requestWorkerEmail += "Actualmente tiene 0 solicitudes recibidas\n";
    }



    var bodyEmail = "";
    bodyEmail += userEmail + "\n";
    bodyEmail += petsEmail + "\n";
    bodyEmail += requestOwnerEmail + "\n";
    bodyEmail += requestWorkerEmail + "\n";


    email("wauwispp1920@gmail.com", {
      cc: "",
      bcc: "",
      body: bodyEmail,
      subject: "GDPR Datos de usuario",
    })
      .then(() => {
        console.log("Mensaje enviado con éxito");
      })
      .catch((e) => {
        alert(
          "Se ha producido un error al exportar los datos.\n Revise la aplicación de mensajería que tiene como predeterminada e inténtelo de nuevo"
        );
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
        <Text>Actualmente tiene 0 solicitudes recibidas{"\n"}</Text>
        )}

        {requestOwner.length !== 0 ? (
          <View style={styles.fieldSet}>
            <Text style={styles.legend}>Solicitudes recibidas</Text>
            <Text> {"\n"} </Text>
            {requestOwner.map((request) => {
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

        <Button
          title={"Exportar estos datos a su aplicación de correo"}
          onPress={this.sendEmail}
        />
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
