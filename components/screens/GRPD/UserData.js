import React, { useEffect, useState } from "react";

// Components for export email information
import qs from "qs";
import email from "react-native-email";
import { userDataStyles } from "../../styles/userDataStyle";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { bannedAssertion } from "../../account/bannedAssertion";
import { db } from "../../population/config";
import { fechaParseada } from "../../utils/DateParser";
import { globalStyles } from "../../styles/global";
function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export default function UserData(props) {
  const { screenProps } = props;
  const { userInfo } = screenProps;

  var user = userInfo;

  var [pets, setPets] = useState([]);
  var [requestWorker, setRequestWorker] = useState([]);
  var [requestOwner, setRequestOwner] = useState([]);
  var [accommodations, setAccommodations] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  useEffect(() => {
    var requestWorkerUE = [];
    var requestOwnerUE = [];
    var petsUE = [];
    var accommodationsUE = [];

    async function getWorkers() {
      await db
        .ref("requests")
        .orderByChild("worker")
        .equalTo(user.id)
        .once("value", (snap) => {
          snap.forEach((child) => {
            requestWorkerUE.push(child.val());
          });
        });
      setRequestWorker(requestWorkerUE);
    }

    async function getOwners() {
      await db
        .ref("requests")
        .orderByChild("owner")
        .equalTo(user.id)
        .once("value", (snap) => {
          snap.forEach((child) => {
            requestOwnerUE.push(child.val());
          });
        });
      setRequestOwner(requestOwnerUE);
    }

    async function getPets() {
      await db.ref("pet/" + user.id).once("value", (snap) => {
        snap.forEach((child) => {
          petsUE.push(child.val());
        });
      });
      setPets(petsUE);
    }

    async function getAccommodations() {
      await db
        .ref("accommodation")
        .orderByChild("worker")
        .equalTo(user.id)
        .once("value", (snap) => {
          snap.forEach((pretty) => {
            accommodationsUE.push(pretty.val());
          });
        });

      setAccommodations(accommodationsUE);
    }

    getWorkers();

    getOwners();

    getPets();

    getAccommodations();
  }, [refreshing]);

  var sendEmail = function () {
    var userEmail = "Datos de usuario\n\n";
    var requestWorkerEmail = "Solicitudes recibidas\n\n";
    var requestOwnerEmail = "Solicitudes realizadas\n\n";
    var petsEmail = "Mascotas registradas en nuestra aplicación\n\n";
    var accommodationEmail = "Acomodaciones registradas \n\n";
    bannedAssertion();

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
    userEmail +=
      "Cantidad donada: " + parseFloat(user.donatedMoney).toFixed(2) + "€\n";
    if (user.hasOwnProperty("location")) {
      userEmail += user.location.latitude + "\n";
      userEmail += user.location.latitudeDelta + "\n";
      userEmail += user.location.longitude + "\n";
      userEmail += user.location.longitudeDelta + "\n";
      userEmail += "\n\n";
    }

    if (pets.length !== 0) {
      {
        pets.map((petParse) => {
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
      requestOwner.map((reqParse) => {
        if (!reqParse.hasOwnProperty("interval")) {
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
        requestOwnerEmail += "Precio: " + reqParse.price + "\n\n";
      });
    } else {
      requestOwnerEmail += "Actualmente tiene 0 solicitudes realizadas\n";
    }
    requestOwnerEmail += "\n\n";

    if (requestWorker.length !== 0) {
      requestWorker.map((reqParse) => {
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
        requestWorkerEmail += "Precio: " + reqParse.price + "\n\n";
      });
    } else {
      requestWorkerEmail += "Actualmente tiene 0 solicitudes recibidas\n";
    }

    requestWorkerEmail += "\n\n";

    if (accommodations.length !== 0) {
      {
        accommodations.map((accParse) => {
          accommodationEmail +=
            "Fecha de inicio: " + fechaParseada(accParse.startTime) + "\n";
          accommodationEmail +=
            "Fecha de fin: " + fechaParseada(accParse.endTime) + "\n";
          if (accParse.isCanceled) {
            accommodationEmail += "¿Cancelada? Sí\n";
          } else {
            accommodationEmail += "¿Cancelada? No\n";
          }
          accommodationEmail += "\n\n";
        });
      }
    } else {
      accommodationEmail +=
        "Actualmente tiene 0 comodaciones registradas en el sistema\n";
    }
    accommodationEmail += "\n\n";

    var bodyEmail = "";
    bodyEmail += userEmail + "\n";
    bodyEmail += petsEmail + "\n";
    bodyEmail += requestOwnerEmail + "\n";
    bodyEmail += requestWorkerEmail + "\n";
    bodyEmail += accommodationEmail + "\n";

    email(user.email, {
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={userDataStyles.userDataView}>
          <Text style={userDataStyles.userDataTxt}>Datos personales</Text>
          <Text style={userDataStyles.userDataTxt3}>Nombre: {user.name}</Text>
          <Text>Apellidos: {user.surname}</Text>
          {user.hasOwnProperty("description") ? (
            <View>
              <Text>Descripción: {user.description}</Text>
            </View>
          ) : (
            <Text>No tiene ninguna descripción establecida </Text>
          )}
          <Text>Email: {user.email}</Text>
          <Text>WauwPoints: {user.wauwPoints}</Text>
          <Text>Nota media: {user.avgScore}</Text>
          <Text>
            Cantidad donada: {parseFloat(user.donatedMoney).toFixed(2)}€
          </Text>
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
            {pets.map((petParse) => {
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
          <View style={userDataStyles.userDataView}>
            <Text> Actualmente tiene 0 mascotas registradas {"\n"} </Text>
          </View>
        )}

        {requestWorker.length !== 0 ? (
          <View style={userDataStyles.userDataView}>
            <Text style={userDataStyles.userDataTxt}>
              Solicitudes recibidas
            </Text>
            {requestWorker.map((reqParse) => {
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
          <View style={userDataStyles.userDataView}>
            <Text>Actualmente tiene 0 solicitudes realizadas{"\n"}</Text>
          </View>
        )}

        {requestOwner.length !== 0 ? (
          <View style={userDataStyles.userDataView}>
            <Text style={userDataStyles.userDataTxt}>Solicitudes Enviadas</Text>
            {requestOwner.map((reqParse) => {
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
          <View style={userDataStyles.userDataView}>
            <Text>Actualmente tiene 0 solicitudes recibidas</Text>
          </View>
        )}

        {accommodations.length !== 0 ? (
          <View style={userDataStyles.userDataView}>
            <Text style={userDataStyles.userDataTxt}>
              Alojamientos registrados
            </Text>
            {accommodations.map((accParse) => {
              return (
                <View>
                  <Text style={userDataStyles.userDataTxt3}>
                    Fecha de inicio: {fechaParseada(accParse.startTime)}
                  </Text>
                  <Text style={userDataStyles.userDataTxt2}>
                    Fecha de fin: {fechaParseada(accParse.endTime)}
                  </Text>
                  <Text style={userDataStyles.userDataTxt2}>
                    ¿Cancelada?: {accParse.isCanceled === true ? "Sí" : "No"}
                  </Text>
                </View>
              );
            })}
          </View>
        ) : (
          <View style={userDataStyles.userDataView}>
            <Text> Actualmente tiene 0 alojamientos registrados </Text>
          </View>
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
        <Text style={globalStyles.blankTxt2}>
          * Deslice hacia abajo para refrescar *
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
