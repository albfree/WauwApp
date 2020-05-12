import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  Alert,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar } from "react-native-elements";
import { db } from "../population/config";
import Loading from "../Loading";
import { globalStyles } from "../styles/global";
import BlankView from "./BlankView";
import { notificationsStyles } from "../styles/notificationsStyle";
import { fechaParseadaCorta } from "../utils/DateParser";

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export default function ListMyNotifications(props) {
  const { navigation, toastRef, userInfo } = props;
  const [requestsList, setRequestsList] = useState([]);
  const [reloadRequests, setReloadRequests] = useState(false);
  const [isVisibleLoading, setIsVisibleLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  const setRequests = React.useCallback(async () => {
    db.ref("wauwers").child(userInfo.id).update({ hasRequests: false });
  }, []);

  useEffect(() => {
    const willFocus = navigation.addListener("willFocus", setRequests);
    return () => {
      willFocus.remove();
    };
  }, [setRequests]);

  useEffect(() => {
    setRequests();
    db.ref("requests")
      .orderByChild("worker")
      .equalTo(userInfo.id)
      .on("value", (snap) => {
        const requests = [];
        snap.forEach((child) => {
          requests.push(child.val());
        });
        setRequestsList(requests.reverse());
      });
    setReloadRequests(false);
    setIsVisibleLoading(false);
  }, [reloadRequests, refreshing]);

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {requestsList.length > 0 ? (
          <View>
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
            <Text style={globalStyles.blankTxt2}>
              * Deslice hacia abajo para refrescar *
            </Text>
          </View>
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
      .concat(fechaParseadaCorta(req.item.startTime))
      .concat(" al ")
      .concat(fechaParseadaCorta(req.item.endTime));
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
