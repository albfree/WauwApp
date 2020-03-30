import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Image, Avatar } from "react-native-elements";
import { db } from "../population/config";
import Loading from "../Loading";
import { email } from "../account/QueriesProfile";
import { globalStyles } from "../styles/global";


export default function ListMyNotifications(props) {
  const { toastRef } = props;
  const [requestsList, setRequestsList] = useState([]);
  const [reloadRequests, setReloadRequests] = useState(false);
  const [isVisibleLoading, setIsVisibleLoading] = useState(true);
  let id;
  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .on("child_added", snap => {
      id = snap.val().id;
    });

  useEffect(() => {
    db.ref("requests")
      .orderByChild("worker")
      .equalTo(id)
      .on("value", snap => {
        const requests = [];
        snap.forEach(child => {
          requests.push(child.val());
        });
        setRequestsList(requests);
      });
    setReloadRequests(false);
    setIsVisibleLoading(false);
  }, [reloadRequests]);

  return (
    <SafeAreaView style={globalStyles.safeNotificationsArea}>
      <ScrollView>
        {requestsList ? (
          <FlatList
            data={requestsList}
            style={globalStyles.notificationsFeed}
            renderItem={request => (
              <Request
                req={request}
                setReloadRequests={setReloadRequests}
                setIsVisibleLoading={setIsVisibleLoading}
                toastRef={toastRef}
                showsVerticalScrollIndicator={false}
              />
            )}
            keyExtractor={request => request.id}
          />
        ) : (
          <View>
            <Text>No hay Notificaciones</Text>
          </View>
        )}
        <Loading isVisible={isVisibleLoading} text={"Un momento..."} />
      </ScrollView>
    </SafeAreaView>
  );
}

function Request(props) {
  const { req, setReloadRequests, setIsVisibleLoading, toastRef } = props;
  let fecha = "";
  let estado = "";
  let tipo = "";
  let color = "white";
  let ownerInfo;
  let dogs = "perro";
  if (req.item.petNumber < 1) {
    dogs = "perros";
  }
  db.ref("wauwers")
    .child(req.item.owner)
    .on("value", snap => {
      ownerInfo = snap.val();
    });

  if (req.item.pending) {
    estado = "Pendiente";
    color = "rgba(255,128,0,0.6)";
  } else {
    switch (req.item.isCanceled) {
      case false:
        estado = "Aceptada";
        color = "rgba(0,128,0,0.6)";
        break;
      case true:
        estado = "Rechazada";
        color = "rgba(255,0,0,0.6)";
        break;
      default:
        break;
    }
  }

  if (req.item.type == "walk") {
    tipo = "paseo";
    fecha = "Día y hora: ".concat(req.item.interval);
  } else if (req.item.type == "sitter") {
    tipo = "alojamiento";
    fecha = "Del "
      .concat(req.item.startTime)
      .concat(" al ")
      .concat(req.item.endTime);
  }

  const checkRequestsState = () => {
    if (estado == "Pendiente") {
      itemClicked();
    } else if (estado == "Aceptada") {
      requestClosed("aceptado");
    } else if (estado == "Rechazada") {
      requestClosed("rechazado");
    }
  };

  const requestClosed = action => {
    Alert.alert("¡Ya has " + action + " esta solicitud!", "");
  };

  const itemClicked = () => {
    Alert.alert(
      "Aceptar o Rechazar solicitud",
      "",
      [
        {
          text: "Más tarde"
        },
        {
          text: "Aceptar",
          onPress: confirmAcceptRequest,
          style: "cancel"
        },
        {
          text: "Rechazar",
          onPress: confirmDeclineRequest,
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  const confirmAcceptRequest = () => {
    Alert.alert(
      "Aceptar solicitud",
      "¿Estás seguro?",
      [
        {
          text: "Si",
          onPress: acceptRequest
        },
        {
          text: "No",
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  const acceptRequest = () => {
    setIsVisibleLoading(true);
    //Actualizo la request en la tabla de request
    let requestData = {
      pending: false,
      isCanceled: false
    };
    db.ref("requests")
      .child(req.item.id)
      .update(requestData)
      .then(() => {
        setReloadRequests(true);
        toastRef.current.show("Solicitud aceptada con éxito");
      })
      .catch(() => {
        toastRef.current.show("Error. Inténtelo de nuevo");
      });
  };

  const confirmDeclineRequest = () => {
    Alert.alert(
      "Rechazar solicitud",
      "¿Estás seguro?",
      [
        {
          text: "Si",
          onPress: declineRequest
        },
        {
          text: "No",
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  const declineRequest = () => {
    setIsVisibleLoading(true);
    let requestData = {
      pending: false,
      isCanceled: true
    };
    db.ref("requests")
      .child(req.item.id)
      .update(requestData)
      .then(() => {
        setReloadRequests(true);
        toastRef.current.show("Solicitud rechazada");
      })
      .catch(() => {
        toastRef.current.show("Error. Inténtelo de nuevo.");
      });
  };

  const tarjeta = {
    fontSize: 13,
    marginTop: 4,
    color: color
  };

  return (
    <TouchableOpacity onPress={checkRequestsState}>
      <View style={globalStyles.myRequestsFeedItem}>
        <View style={globalStyles.viewFlex1}>
          <View style={globalStyles.myRequestsRow}>
            <View style={globalStyles.notificationsColumn1}>
              <Avatar
                rounded
                size="large"
                source={{
                  uri: ownerInfo.photo
                }}
              />
              <Text style={globalStyles.notificationsNum}>
                {ownerInfo.name}
              </Text>
            </View>
            <View style={globalStyles.notificationsColumn2}>
              <Text style={globalStyles.myRequestsType}>
                Solicitud de {tipo}
              </Text>
              <Text style={globalStyles.myRequestsNum}>
                Servicio para {req.item.petNumber} {dogs}
              </Text>
              <Text style={globalStyles.myRequestsPrice}>{fecha}</Text>
              <Text style={globalStyles.myRequestsNum}>
                Estado: <Text style={tarjeta}>{estado}</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
