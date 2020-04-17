import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { db } from "../../population/config.js";
import { globalStyles } from "../../styles/global";
import { myWalksStyles } from "../../styles/myWalksStyle";
import { requestsStyles } from "../../styles/requestsStyle";

function ShowWalk(props) {
  const { navigation } = props;
  const request = navigation.state.params.request;

  var id = request.owner;
  var tipo = "";
  var status = "";
  var worker = [];
  var pago = "";
  var fecha = "";

  db.ref("wauwers")
    .orderByChild("id")
    .equalTo(id)
    .on("child_added", (snap) => {
      worker = snap.val();
    });

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
      "Finalizar Servicio",
      "¿Estás seguro?",
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

  const confirmAcceptPayment = () => {
    Alert.alert(
      "Acceder a la pasarela de pago",
      "¿Estás seguro?",
      [
        {
          text: "Si",
          onPress: goToPayment,
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
    var idRequest = request.id;
    var query = db.ref().child("requests/" + idRequest);
    query.update({
      isFinished: true,
    });
    alert("Se ha finalizado el servicio correctamente");
    navigation.popToTop();
  };

  const goToPayment = () => {
    navigation.navigate("Pagar", { request: request });
  };

  const acceptRequest = () => {
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
    var idRequest = request.id;
    var query = db.ref().child("requests/" + idRequest);
    query.update({
      pending: false,
      isCanceled: true,
    });
    alert("Se ha declinado la solicitud correctamente");
    navigation.popToTop();
  };

  tipo = "Paseo";
  fecha = "Día y hora: ".concat(request.interval);

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
                  {request.interval}
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
                  {request.interval}
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
                  {request.interval}
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
              buttonStyle={globalStyles.showWalkBtn3}
              containerStyle={globalStyles.showWalkBtnContainer3}
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
                  {request.interval}
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
                  {request.interval}
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
          </View>
        </View>
        <Button
          buttonStyle={requestsStyles.requestsBtn2}
          containerStyle={requestsStyles.requestsBtnContainer2}
          title="Finalizar Servicio"
          buttonStyle={globalStyles.showWalkBtn3}
          containerStyle={globalStyles.showWalkBtnContainer3}
          title="Pasar a la pasarela de cobro"
          onPress={confirmAcceptPayment}
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
                  {request.interval}
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

export default withNavigation(ShowWalk);
