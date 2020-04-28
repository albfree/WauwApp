import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Image, Avatar } from "react-native-elements";
import { db } from "../population/config";
import Loading from "../Loading";
import { email } from "../account/QueriesProfile";
import { globalStyles } from "../styles/global";
import BlankView from "./BlankView";
import { notificationsStyles } from "../styles/notificationsStyle";
import firebase from "firebase";
import { fechaParseada } from "../utils/DateParser";

export default function ListMyNotifications(props) {
  const { toastRef } = props;
  const [requestsList, setRequestsList] = useState([]);
  const [reloadRequests, setReloadRequests] = useState(false);
  const [isVisibleLoading, setIsVisibleLoading] = useState(true);
  let id;
  let userInfo;
  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .on("child_added", (snap) => {
      userInfo = snap.val();
      id = userInfo.id;
      if (userInfo.isBanned) {
        Alert.alert("Atención", "Su cuenta ha sido bloqueada.");
        firebase.auth().signOut();
      }
    });

  useEffect(() => {
    db.ref("wauwers").child(id).update({ hasRequests: false });
    db.ref("requests")
      .orderByChild("worker")
      .equalTo(id)
      .on("value", (snap) => {
        const requests = [];
        snap.forEach((child) => {
          requests.push(child.val());
        });
        setRequestsList(requests.reverse());
      });
    setReloadRequests(false);
    setIsVisibleLoading(false);
  }, [reloadRequests]);

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView>
        {requestsList.length > 0 ? (
          <FlatList
            data={requestsList}
            renderItem={(request) => (
              <Request
                req={request}
                setReloadRequests={setReloadRequests}
                setIsVisibleLoading={setIsVisibleLoading}
                toastRef={toastRef}
                showsVerticalScrollIndicator={false}
              />
            )}
            keyExtractor={(request) => request.id}
          />
        ) : (
          <BlankView text={"No tiene notificaciones"} />
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
  const naranja = "rgba(255,128,0,0.6)";
  const verde = "rgba(0,128,0,0.6)";
  const rojo = "rgba(255,0,0,0.6)";
  if (req.item.petNumber > 1) {
    dogs = "perros";
  }
  db.ref("wauwers")
    .child(req.item.owner)
    .on("value", (snap) => {
      ownerInfo = snap.val();
    });

  if (req.item.pending) {
    estado = "Pendiente";
    color = naranja;
  } else {
    switch (req.item.isCanceled) {
      case false:
        estado = "Aceptada";
        color = verde;
        break;
      case true:
        estado = "Rechazada";
        color = rojo;
        break;
      default:
        break;
    }
  }

  if (req.item.type === "walk") {
    tipo = "paseo";
    fecha = "Día y hora: ".concat(req.item.interval);
  } else if (req.item.type === "sitter") {
    tipo = "alojamiento";
    fecha = "Del "
      .concat(fechaParseada(req.item.startTime))
      .concat(" al ")
      .concat(fechaParseada(req.item.endTime));
  }

  const checkRequestsState = () => {
    if (estado === "Pendiente") {
      itemClicked();
    } else if (estado === "Aceptada") {
      requestClosed("aceptado");
    } else if (estado === "Rechazada") {
      requestClosed("rechazado");
    }
  };

  const requestClosed = (action) => {
    Alert.alert("¡Ya has " + action + " esta solicitud!", "");
  };

  const itemClicked = () => {
    Alert.alert(
      "Aceptar o Rechazar solicitud",
      "",
      [
        {
          text: "Más tarde",
        },
        {
          text: "Aceptar",
          onPress: confirmAcceptRequest,
          style: "cancel",
        },
        {
          text: "Rechazar",
          onPress: confirmDeclineRequest,
          style: "cancel",
        },
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
          onPress: acceptRequest,
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const acceptRequest = () => {
    setIsVisibleLoading(true);
    //Actualizo la request en la tabla de request
    let requestData = {
      pending: false,
      isCanceled: false,
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
          onPress: declineRequest,
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };

  const declineRequest = () => {
    setIsVisibleLoading(true);
    let requestData = {
      pending: false,
      isCanceled: true,
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
    color,
  };

  return (
    <TouchableOpacity onPress={checkRequestsState}>
      <View style={notificationsStyles.notificationsFeed}>
        <View style={globalStyles.viewFlex1}>
          <View style={notificationsStyles.notificationsView}>
            <View style={notificationsStyles.notificationsColumn}>
              <Avatar
                rounded
                size="large"
                source={{
                  uri: ownerInfo.photo,
                }}
              />
            </View>
            <View style={notificationsStyles.notificationsColumn}>
              <Text style={notificationsStyles.notificationsTxt}>
                {ownerInfo.name}
              </Text>
              <Text style={notificationsStyles.notificationsTxt2}>
                Solicitud de {tipo}
              </Text>
              <Text style={notificationsStyles.notificationsTxt}>
                Servicio para {req.item.petNumber} {dogs}
              </Text>
              <Text style={notificationsStyles.notificationsTxt2}>{fecha}</Text>
              <Text style={notificationsStyles.notificationsTxt}>
                Estado: <Text style={tarjeta}>{estado}</Text>
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
