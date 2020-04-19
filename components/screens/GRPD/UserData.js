import React from "react";

// Components for export email information
import qs from "qs";
import email from "react-native-email";
import { db } from "../../population/config";
import * as firebase from "firebase";
import { userDataStyles } from "../../styles/userDataStyle";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Button, Icon } from "react-native-elements";

export default function UserData(props) {
  var user = props.navigation.state.params.userInfo;
  var requestWorker = props.navigation.state.params.requestWorker;
  var requestOwner = props.navigation.state.params.requestOwner;
  var pets = props.navigation.state.params.pets;

  var sendEmail = function () {
    var userEmail = "Datos de usuario\n\n";
    var requestWorkerEmail = "Solicitudes recibidas\n\n";
    var requestOwnerEmail = "Solicitudes realizadas\n\n";
    var petsEmail = "Mascotas registradas en nuestra aplicación\n\n";

    userEmail += "Nombre: " + user.name + "\n";
    userEmail += "Apellidos: " + user.surname + "\n";
    if (user.hasOwnProperty("address")) {
      userEmail += "Dirección: " + user.address + "\n";
    }
    if (user.hasOwnProperty("description")) {
      userEmail += "Descripción: " + user.description + "\n";
    }
    userEmail += "Email: " + user.email + "\n";
    userEmail += "Wauwpoints: " + user.wauwPoints + "\n";
    userEmail += "Nota media: " + user.avgScore + "\n";
    if (user.hasOwnProperty("location")) {
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
          petsEmail += "Nombre: " + petParse.name + "\n";
          petsEmail += "Descripción: " + petParse.description + "\n";
          petsEmail += "Raza: " + petParse.breed + "\n";
          petsEmail += "\n";
        });
      }
    } else {
      petsEmail = "Actualmente tiene 0 mascotas registradas";
    }

    if (requestOwner.length !== 0) {
      requestOwner.map((reqOwner) => {
        let reqParse = JSON.parse(JSON.stringify(reqOwner));
        if (!reqOwner.hasOwnProperty("interval")) {
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
        if (!reqParse.hasOwnProperty("interval")) {
          requestWorkerEmail += "Alojamiento\n";
        } else {
          requestWorkerEmail +=
            "Disponibilidad del paseo: " + reqParse.interval + "\n";
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
      .then()
      .catch((e) => {
        alert(
          "Se ha producido un error al exportar los datos.\n Revise la aplicación de mensajería que tiene como predeterminada e inténtelo de nuevo"
        );
      });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={userDataStyles.userDataView}>
          <Text style={userDataStyles.userDataTxt}>Datos personales</Text>
          <Text style={userDataStyles.userDataTxt3}>Nombre: {user.name}</Text>
          <Text>Apellidos: {user.surname}</Text>
          {user.hasOwnProperty("address") ? (
            <View>
              <Text>Dirección: {user.address}</Text>
            </View>
          ) : (
            <Text> </Text>
          )}
          {user.hasOwnProperty("description") ? (
            <View>
              <Text>Descripción: {user.description}</Text>
            </View>
          ) : (
            <Text> </Text>
          )}
          <Text>Email: {user.email}</Text>
          <Text>WauwPoints: {user.wauwPoints}</Text>
          <Text>Nota media: {user.avgScore}</Text>
          {user.hasOwnProperty("location") ? (
            <View>
              <Text> La localización es visible sólo para ti</Text>
              <Text style={userDataStyles.userDataTxt2}>
                {user.location.latitude}
              </Text>
              <Text style={userDataStyles.userDataTxt2}>
                {user.location.latitudeDelta}
              </Text>
              <Text style={userDataStyles.userDataTxt2}>
                {user.location.longitude}
              </Text>
              <Text style={userDataStyles.userDataTxt2}>
                {user.location.longitudeDelta}
              </Text>
            </View>
          ) : (
            <Text></Text>
          )}
        </View>

        {pets.length !== 0 ? (
          <View style={userDataStyles.userDataView}>
            <Text style={userDataStyles.userDataTxt}>Mascotas registradas</Text>
            {pets.map((pet) => {
              let petParse = JSON.parse(JSON.stringify(pet));
              return (
                <View>
                  <Text style={userDataStyles.userDataTxt3}>
                    Nombre: {petParse.name}
                  </Text>
                  <Text style={userDataStyles.userDataTxt2}>
                    Raza: {petParse.breed}
                  </Text>
                  <Text style={userDataStyles.userDataTxt2}>
                    Descripción: {petParse.description}
                  </Text>
                </View>
              );
            })}
          </View>
        ) : (
          <Text> Actualmente tiene 0 mascotas registradas {"\n"} </Text>
        )}

        {requestWorker.length !== 0 ? (
          <View style={userDataStyles.userDataView}>
            <Text style={userDataStyles.userDataTxt}>
              Solicitudes recibidas
            </Text>
            {requestWorker.map((request) => {
              let reqParse = JSON.parse(JSON.stringify(request));
              return (
                <View>
                  {reqParse.hasOwnProperty("interval") ? (
                    <Text style={userDataStyles.userDataTxt3}>
                      Disponibilidad del paseo: {reqParse.interval}
                    </Text>
                  ) : (
                    <Text style={userDataStyles.userDataTxt3}>Alojamiento</Text>
                  )}
                  <Text style={userDataStyles.userDataTxt2}>
                    ¿Cancelada?: {reqParse.isCanceled === true ? "Sí" : "No"}
                  </Text>
                  <Text style={userDataStyles.userDataTxt2}>
                    ¿Pagada?: {reqParse.isPayed === true ? "Sí" : "No"}
                  </Text>
                  <Text style={userDataStyles.userDataTxt2}>
                    ¿Finalizada?: {reqParse.isFinished === true ? "Sí" : "No"}
                  </Text>
                  <Text style={userDataStyles.userDataTxt2}>
                    Precio: {reqParse.price} €
                  </Text>
                </View>
              );
            })}
          </View>
        ) : (
          <Text>Actualmente tiene 0 solicitudes realizadas{"\n"}</Text>
        )}

        {requestOwner.length !== 0 ? (
          <View style={userDataStyles.userDataView}>
            <Text style={userDataStyles.userDataTxt}>Solicitudes Enviadas</Text>
            {requestOwner.map((request) => {
              let reqParse = JSON.parse(JSON.stringify(request));
              return (
                <View>
                  {reqParse.hasOwnProperty("interval") ? (
                    <Text style={userDataStyles.userDataTxt3}>
                      Disponibilidad del paseo: {reqParse.interval}
                    </Text>
                  ) : (
                    <Text style={userDataStyles.userDataTxt3}>Alojamiento</Text>
                  )}
                  <Text style={userDataStyles.userDataTxt2}>
                    ¿Cancelada?: {reqParse.isCanceled === true ? "Sí" : "No"}
                  </Text>
                  <Text style={userDataStyles.userDataTxt2}>
                    ¿Pagada?: {reqParse.isPayed === true ? "Sí" : "No"}
                  </Text>
                  <Text style={userDataStyles.userDataTxt2}>
                    ¿Finalizada?: {reqParse.isFinished === true ? "Sí" : "No"}
                  </Text>
                  <Text style={userDataStyles.userDataTxt2}>
                    Precio: {reqParse.price} €
                  </Text>
                </View>
              );
            })}
          </View>
        ) : (
          <Text>Actualmente tiene 0 solicitudes recibidas</Text>
        )}
        <Button
          buttonStyle={userDataStyles.userDataBtn}
          containerStyle={userDataStyles.userDataContainer}
          title={"Exportar datos"}
          onPress={sendEmail}
          icon={
            <Icon
              type="material-community"
              name="email"
              size={20}
              color="white"
              marginLeft={"20%"}
            />
          }
          titleStyle={userDataStyles.userDataTxt4}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
