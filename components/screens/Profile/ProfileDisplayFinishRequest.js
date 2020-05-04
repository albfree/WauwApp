import React, { useState, useEffect } from "react";
import {
  View,
  YellowBox,
  SafeAreaView,
  Image,
  Text,
  Alert,
} from "react-native";
import { db } from "../../population/config.js";
import { withNavigation } from "react-navigation";
import _ from "lodash";
import { Button, Icon } from "react-native-elements";
import { globalStyles } from "../../styles/global";
import { myWalksStyles } from "../../styles/myWalksStyle";
import { requestsStyles } from "../../styles/requestsStyle";
import { bannedAssertion } from "../../account/bannedAssertion";

YellowBox.ignoreWarnings(["Setting a timer"]);

function DisplayFinishRequest(props) {
  const { navigation, screenProps } = props;
  const { userInfo } = screenProps;

  const request = navigation.state.params.request;
  var id = request.owner;
  var tipo = "";
  var status = "";
  var worker = [];
  var pago = "";
  var fecha = "";

  const [isLoading, setIsLoading] = useState(false);
  const [setReloadData] = useState(false);
  const [visibleModal, setIsVisibleModal] = useState(false);
  const [error, setError] = useState("");
  bannedAssertion();

  useEffect(() => {
    db.ref("wauwers")
      .orderByChild("id")
      .equalTo(id)
      .once("child_added", (snap) => {
        worker = snap.val();
      });
  });

  const assertIsNotBanned = () => {
    if (!worker.isBanned) {
      navigation.navigate("Blocked");
    }
  };

  tipo = "Alojamiento";
  fecha = "Del "
    .concat(request.startTime)
    .concat(" al ")
    .concat(request.endTime);

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
  const confirmFinishRequest = () => {
    Alert.alert(
      "¿Está seguro?",
      "Dará el servicio por finalizado y navegará hacia una vista para recibir el pago.",
      [
        {
          text: "Si",
          onPress: finishRequest,
        },
        {
          text: "No",
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  };
  const finishRequest = () => {
    /*var idRequest = request.id;
      var query = db.ref().child("requests/" + idRequest);
      query.update({
        isFinished: true,
      });
      alert("Se ha finalizado el servicio correctamente");
      navigation.popToTop();*/
    navigation.navigate("Pagar", { request: request });
  };
  const acceptRequest = () => {
    assertIsNotBanned;
    var idRequest = request.id;
    var query = db.ref().child("requests/" + idRequest);
    query.update({
      pending: false,
      isCanceled: false,
    });
    alert("Se ha aceptado la solicitud correctamente");
    navigation.popToTop();
  };

  const declineRequest = () => {
    assertIsNotBanned;
    var idRequest = request.id;
    var query = db.ref().child("requests/" + idRequest);
    query.update({
      pending: false,
      isCanceled: true,
    });
    alert("Se ha declinado la solicitud correctamente");
    navigation.popToTop();
  };

  if (request.pending && !request.isCanceled) {
    status = "Esperando aceptación";
  } else if (!request.pending && request.isCanceled) {
    status = "Solicitud denegada";
  } else if (!request.isFinished) {
    status = "Solicitud aceptada";
  } else {
    status = "Servicio Finalizado";
  }
  if (request.isPayed) {
    pago = "Pago realizado";
  } else {
    pago = "Pendiente de pago";
  }

  if (request.pending) {
    return (
      <SafeAreaView style={requestsStyles.requestsView4}>
        <View style={requestsStyles.requestsFeed2}>
          <View style={globalStyles.viewFlex1}>
            <View style={requestsStyles.requestsView5}>
              <View style={requestsStyles.requestsView6}>
                <Text style={requestsStyles.requestsTxt4}>{worker.name}</Text>
                <Text style={requestsStyles.requestsTxt5}>{tipo}</Text>
                <Text style={requestsStyles.requestsTxt6}>Fecha</Text>
                <Text style={requestsStyles.requestsTxt7}>
                  Del{" "}
                  {request.startTime.toLocaleString("es-ES").substring(0, 10)}
                  {"\n"}
                  al{" "}
                  {request.startTime.toLocaleString("es-ES").substring(0, 10)}
                </Text>
              </View>
              <View style={requestsStyles.requestsView6}>
                <Image
                  style={requestsStyles.requestsImage}
                  source={{ uri: worker.photo }}
                />
              </View>
              <View style={requestsStyles.requestsView6}>
                <Text style={requestsStyles.requestsTxt8}>
                  {request.price} €
                </Text>
                <Text style={requestsStyles.requestsTxt9}>{status}</Text>
                <Text style={requestsStyles.requestsTxt10}> {pago} </Text>
              </View>
            </View>
            <View>
              <Button
                buttonStyle={myWalksStyles.myWalksBtn}
                containerStyle={myWalksStyles.myWalksContainer}
                title="Aceptar Solicitud"
                onPress={confirmAcceptRequest}
                icon={
                  <Icon
                    type="material-community"
                    name="check"
                    size={30}
                    color="white"
                    marginLeft={"10%"}
                  />
                }
                titleStyle={requestsStyles.requestsBtnTittle}
              />
              <Button
                buttonStyle={requestsStyles.requestsBtn}
                containerStyle={requestsStyles.requestsBtnContainer}
                title="Denegar Solicitud"
                onPress={confirmDeclineRequest}
                icon={
                  <Icon
                    type="material-community"
                    name="cancel"
                    size={30}
                    color="white"
                    marginLeft={"10%"}
                  />
                }
                titleStyle={requestsStyles.requestsBtnTittle}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  } else if (!request.pending && request.isCanceled) {
    return (
      <SafeAreaView style={requestsStyles.requestsView4}>
        <View style={requestsStyles.requestsFeed2}>
          <View style={globalStyles.viewFlex1}>
            <View style={requestsStyles.requestsView5}>
              <View style={requestsStyles.requestsView6}>
                <Text style={requestsStyles.requestsTxt4}>{worker.name}</Text>
                <Text style={requestsStyles.requestsTxt5}>{tipo}</Text>
                <Text style={requestsStyles.requestsTxt6}>Fecha</Text>
                <Text style={requestsStyles.requestsTxt7}>
                  Del{" "}
                  {request.startTime.toLocaleString("es-ES").substring(0, 10)}
                  {"\n"}
                  al{" "}
                  {request.startTime.toLocaleString("es-ES").substring(0, 10)}
                </Text>
              </View>
              <View style={requestsStyles.requestsView6}>
                <Image
                  style={requestsStyles.requestsImage}
                  source={{ uri: worker.photo }}
                />
              </View>
              <View style={requestsStyles.requestsView6}>
                <Text style={requestsStyles.requestsTxt11}>
                  {request.price} €
                </Text>
                <Text style={requestsStyles.requestsTxt12}>{status}</Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  } else if (
    !request.pending &&
    !request.isCanceled &&
    request.isPayed &&
    !request.isFinished
  ) {
    return (
      <SafeAreaView style={requestsStyles.requestsView4}>
        <View style={requestsStyles.requestsFeed2}>
          <View style={globalStyles.viewFlex1}>
            <View style={requestsStyles.requestsView5}>
              <View style={requestsStyles.requestsView6}>
                <Text style={requestsStyles.requestsTxt4}>{worker.name}</Text>
                <Text style={requestsStyles.requestsTxt5}>{tipo}</Text>
                <Text style={requestsStyles.requestsTxt6}>Fecha</Text>
                <Text style={requestsStyles.requestsTxt7}>
                  Del{" "}
                  {request.startTime.toLocaleString("es-ES").substring(0, 10)}
                  {"\n"}
                  al{" "}
                  {request.startTime.toLocaleString("es-ES").substring(0, 10)}
                </Text>
              </View>
              <View style={requestsStyles.requestsView6}>
                <Image
                  style={requestsStyles.requestsImage}
                  source={{ uri: worker.photo }}
                />
              </View>
              <View style={requestsStyles.requestsView6}>
                <Text style={requestsStyles.requestsTxt8}>
                  {request.price} €
                </Text>
                <Text style={requestsStyles.requestsTxt13}>{status}</Text>
                <Text style={requestsStyles.requestsTxt14}> {pago} </Text>
              </View>
            </View>
            <Button
              buttonStyle={requestsStyles.requestsBtn2}
              containerStyle={requestsStyles.requestsBtnContainer2}
              title="Abrir Chat"
              onPress={() => navigation.navigate("Chats")}
              icon={
                <Icon
                  type="material-community"
                  name="chat"
                  size={30}
                  color="white"
                  marginLeft={"10%"}
                />
              }
              titleStyle={requestsStyles.requestsBtnTittle}
            />
            <Button
              buttonStyle={requestsStyles.requestsBtn2}
              containerStyle={requestsStyles.requestsBtnContainer2}
              title="Finalizar Servicio"
              onPress={confirmFinishRequest}
              icon={
                <Icon
                  type="font-awesome"
                  name="thumbs-up"
                  size={30}
                  color="white"
                  marginLeft={"10%"}
                />
              }
              titleStyle={requestsStyles.requestsBtnTittle}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  } else if (
    !request.pending &&
    !request.isCanceled &&
    request.isPayed &&
    request.isFinished &&
    !request.isRated
  ) {
    return (
      <SafeAreaView style={requestsStyles.requestsView4}>
        <View style={requestsStyles.requestsFeed2}>
          <View style={globalStyles.viewFlex1}>
            <View style={requestsStyles.requestsView5}>
              <View style={requestsStyles.requestsView6}>
                <Text style={requestsStyles.requestsTxt4}>{worker.name}</Text>
                <Text style={requestsStyles.requestsTxt5}>{tipo}</Text>
                <Text style={requestsStyles.requestsTxt6}>Fecha</Text>
                <Text style={requestsStyles.requestsTxt7}>
                  Del{" "}
                  {request.startTime.toLocaleString("es-ES").substring(0, 10)}
                  {"\n"}
                  al{" "}
                  {request.startTime.toLocaleString("es-ES").substring(0, 10)}
                </Text>
              </View>
              <View style={requestsStyles.requestsView6}>
                <Image
                  style={requestsStyles.requestsImage}
                  source={{ uri: worker.photo }}
                />
              </View>
              <View style={requestsStyles.requestsView6}>
                <Text style={requestsStyles.requestsTxt8}>
                  {request.price} €
                </Text>
                <Text style={requestsStyles.requestsTxt13}>{status}</Text>
                <Text style={requestsStyles.requestsTxt14}> {pago} </Text>
              </View>
            </View>
            <Text style={requestsStyles.requestsTxt7}>
              Esperando Valoración
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  } else if (
    !request.pending &&
    !request.isCanceled &&
    request.isPayed &&
    request.isFinished &&
    request.isRated
  ) {
    return (
      <SafeAreaView style={requestsStyles.requestsView4}>
        <View style={requestsStyles.requestsFeed2}>
          <View style={globalStyles.viewFlex1}>
            <View style={requestsStyles.requestsView5}>
              <View style={requestsStyles.requestsView6}>
                <Text style={requestsStyles.requestsTxt4}>{worker.name}</Text>
                <Text style={requestsStyles.requestsTxt5}>{tipo}</Text>
                <Text style={requestsStyles.requestsTxt6}>Fecha</Text>
                <Text style={requestsStyles.requestsTxt7}>
                  Del{" "}
                  {request.startTime.toLocaleString("es-ES").substring(0, 10)}
                  {"\n"}
                  al{" "}
                  {request.startTime.toLocaleString("es-ES").substring(0, 10)}
                </Text>
              </View>
              <View style={requestsStyles.requestsView6}>
                <Image
                  style={requestsStyles.requestsImage}
                  source={{ uri: worker.photo }}
                />
              </View>
              <View style={requestsStyles.requestsView6}>
                <Text style={requestsStyles.requestsTxt7}>
                  Del{" "}
                  {request.startTime.toLocaleString("es-ES").substring(0, 10)}
                  {"\n"}
                  al{" "}
                  {request.startTime.toLocaleString("es-ES").substring(0, 10)}
                </Text>
                <Text style={requestsStyles.requestsTxt13}>{status}</Text>
                <Text style={requestsStyles.requestsTxt14}> {pago} </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={requestsStyles.requestsView4}>
        <View style={requestsStyles.requestsFeed2}>
          <View style={globalStyles.viewFlex1}>
            <View style={requestsStyles.requestsView5}>
              <View style={requestsStyles.requestsView6}>
                <Text style={requestsStyles.requestsTxt4}>{worker.name}</Text>
                <Text style={requestsStyles.requestsTxt5}>{tipo}</Text>
                <Text style={requestsStyles.requestsTxt6}>Fecha</Text>
                <Text style={requestsStyles.requestsTxt7}>
                  Del{" "}
                  {request.startTime.toLocaleString("es-ES").substring(0, 10)}
                  {"\n"}
                  al{" "}
                  {request.startTime.toLocaleString("es-ES").substring(0, 10)}
                </Text>
              </View>
              <View style={requestsStyles.requestsView6}>
                <Image
                  style={requestsStyles.requestsImage}
                  source={{ uri: worker.photo }}
                />
              </View>
              <View style={requestsStyles.requestsView6}>
                <Text style={requestsStyles.requestsTxt8}>
                  {request.price} €
                </Text>
                <Text style={requestsStyles.requestsTxt13}>{status}</Text>
                <Text style={requestsStyles.requestsTxt10}> {pago} </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default withNavigation(DisplayFinishRequest);
