import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView
} from "react-native";
import { Avatar } from "react-native-elements";
import { db } from "../population/config";
import Loading from "../Loading";
import { email } from "../account/QueriesProfile";


export default function ListWalkRequests(props) {
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
    <SafeAreaView>
      {requestsList ? (
        <FlatList
          data={requestsList}
          renderItem={request => (
            <Request
              req={request}
              setReloadRequests={setReloadRequests}
              setIsVisibleLoading={setIsVisibleLoading}
              toastRef={toastRef}
            />
          )}
          keyExtractor={request => request.id}
        />
      ) : (
        <View>
          <Text>No requests</Text>
        </View>
      )}
      <Loading isVisible={isVisibleLoading} text={"Un momento..."} />
    </SafeAreaView>
  );
}

function Request(props) {
  const { req, setReloadRequests, setIsVisibleLoading, toastRef } = props;
  let fecha = "";
  let estado = "";
  let tipo = "";
  let fondo = "white";
  let ownerInfo;
  db.ref("wauwers")
    .child(req.item.owner)
    .on("value", snap => {
      ownerInfo = snap.val();
    });

  if (req.item.pending) {
    estado = "Pendiente";
    fondo = "rgba(255,128,0,0.6)";
  } else {
    switch (req.item.isCanceled) {
      case false:
        estado = "Aceptada";
        fondo = "rgba(0,128,0,0.6)";
        break;
      case true:
        estado = "Rechazada";
        fondo = "rgba(255,0,0,0.6)";
        break;
      default:
        break;
    }
  }

  if (req.item.type == "walk") {
    tipo = "paseo";
    fecha = "Día y hora: ".concat(req.item.interval);
  } else if (req.item.type === "sitter") {
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

  const changeBgColor = {
    borderRadius: 10,
    elevation: 3,
    backgroundColor: fondo,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10
    
  };

  return (
    <TouchableOpacity onPress={checkRequestsState}>
      <View style={changeBgColor}>
        <Avatar
          rounded
          size="large"
          containerStyle={styles.userInfoAvatar}
          source={{
            uri: ownerInfo.photo
          }}
        />
        <View style={styles.requestContent}>
          <Text>
            Solicitud de {tipo} de: {ownerInfo.name}
          </Text>
          <Text>Servicio para {req.item.petNumber} mascotas.</Text>
          <Text>{fecha}</Text>
          <Text>Estado de la solicitud: {estado}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "white",
    borderRadius: 20
    //backgroundColor: "#00a680"
  },
  request: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "rgba(255,0,0,0.6)",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  },
  requestContent: {
    marginHorizontal: 12,
    marginVertical: 5,
    flex: 1,
    flexDirection: "column"
  }
});
