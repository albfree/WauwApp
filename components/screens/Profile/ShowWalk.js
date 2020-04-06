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

  const finishRequest = () => {
    var idRequest = request.id;
    console.log(" request", request.id);
    var query = db.ref().child("requests/" + idRequest);
    query.update({
      isFinish: true,
    });
    alert("Se ha finalizado el servicio correctamente");
    navigation.popToTop();
  };

  const acceptRequest = () => {
    var idRequest = request.id;
    console.log(" request", request.id);
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
  } else {
    status = "Solicitud aceptada";
  }

  if (request.isPayed) {
    pago = "Pago realizado";
  } else {
    pago = "Pendiente de pago";
  }

  if (request.pending) {
    return (
      <SafeAreaView style={globalStyles.safeShowRequestArea}>
        <View style={globalStyles.showWalkFeed}>
          <View style={globalStyles.viewFlex1}>
            <View style={globalStyles.showWalkRow}>
              <View style={globalStyles.showRequestColumn1}>
                <Text style={globalStyles.showWalkName}>{worker.name}</Text>
                <Text style={globalStyles.showWalkPrice}>
                  {request.price} €
                </Text>
                <Text style={globalStyles.showWalkDate1}>Fecha:</Text>
                <Text style={globalStyles.showWalkDate2}>
                  {request.interval.split(" ")[0]}
                </Text>
                <Text style={globalStyles.showWalkDate3}>
                  {request.interval.split(" ")[1]}{" "}
                  {request.interval.split(" ")[2]}{" "}
                  {request.interval.split(" ")[3]}
                </Text>
                <Button
                  buttonStyle={globalStyles.showWalkBtn}
                  containerStyle={globalStyles.showWalkBtnContainer}
                  title="Aceptar Solicitud"
                  onPress={confirmAcceptRequest}
                  icon={
                    <Icon
                      type="material-community"
                      name="check"
                      size={30}
                      color="white"
                      marginLeft={10}
                    />
                  }
                  titleStyle={globalStyles.showRequestBtnTittle}
                />
              </View>
              <View style={globalStyles.showRequestColumn22}>
                <Image
                  style={globalStyles.showWalkImage}
                  source={{ uri: worker.photo }}
                />
              </View>
              <View style={globalStyles.showRequestColumn3}>
                <Text style={globalStyles.showWalkStatus}>{status}</Text>
                <Text style={globalStyles.showWalkPay}> {pago} </Text>
                <Button
                  buttonStyle={globalStyles.showWalkBtn2}
                  containerStyle={globalStyles.showWalkBtnContainer2}
                  title="Denegar Solicitud"
                  onPress={confirmDeclineRequest}
                  icon={
                    <Icon
                      type="material-community"
                      name="cancel"
                      size={30}
                      color="white"
                      marginLeft={10}
                    />
                  }
                  titleStyle={globalStyles.showRequestBtnTittle}
                />
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  } else if (!request.pending && request.isCanceled) {
    return (
      <SafeAreaView style={globalStyles.safeShowRequestArea}>
        <View style={globalStyles.showWalkFeed2}>
          <View style={globalStyles.viewFlex1}>
            <View style={globalStyles.showWalkRow}>
              <View style={globalStyles.showRequestColumn1}>
                <Text style={globalStyles.showWalkName}>{worker.name}</Text>
                <Text style={globalStyles.showWalkDate1}>Fecha:</Text>
                <Text style={globalStyles.showWalkDate2}>
                  {request.interval.split(" ")[0]}
                </Text>
                <Text style={globalStyles.showWalkDate3}>
                  {request.interval.split(" ")[1]}{" "}
                  {request.interval.split(" ")[2]}{" "}
                  {request.interval.split(" ")[3]}
                </Text>
              </View>
              <View style={globalStyles.showRequestColumn22}>
                <Image
                  style={globalStyles.showWalkImage2}
                  source={{ uri: worker.photo }}
                />
              </View>
              <View style={globalStyles.showRequestColumn3}>
                <Text style={globalStyles.showWalkStatus}>
                  {" "}
                  {request.price} €
                </Text>
                <Text style={globalStyles.showWalkPay}> {status} </Text>
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
    !request.isFinish
  ) {
    return (
      <SafeAreaView style={globalStyles.safeShowRequestArea}>
        <View style={globalStyles.showWalkFeed}>
          <View style={globalStyles.viewFlex1}>
            <View style={globalStyles.showWalkRow2}>
              <View style={globalStyles.showRequestColumn1}>
                <Text style={globalStyles.showWalkName}>{worker.name}</Text>
                <Text style={globalStyles.showWalkPrice}>
                  {request.price} €
                </Text>
                <Text style={globalStyles.showWalkDate1}>Fecha:</Text>
                <Text style={globalStyles.showWalkDate2}>
                  {request.interval.split(" ")[0]}
                </Text>
                <Text style={globalStyles.showWalkDate3}>
                  {request.interval.split(" ")[1]}{" "}
                  {request.interval.split(" ")[2]}{" "}
                  {request.interval.split(" ")[3]}
                </Text>
              </View>
              <View style={globalStyles.showRequestColumn22}>
                <Image
                  style={globalStyles.showWalkImage}
                  source={{ uri: worker.photo }}
                />
              </View>
              <View style={globalStyles.showRequestColumn3}>
                <Text style={globalStyles.showWalkStatus2}>{status}</Text>
                <Text style={globalStyles.showWalkPay2}> {pago} </Text>
              </View>
            </View>
            <Button
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
                  marginLeft={30}
                />
              }
              titleStyle={globalStyles.showRequestBtnTittle}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  } else if (
    !request.pending &&
    !request.isCanceled &&
    request.isPayed &&
    request.isFinish
  ) {
    return (
      <SafeAreaView style={globalStyles.safeShowRequestArea}>
        <View style={globalStyles.showWalkFeed}>
          <View style={globalStyles.viewFlex1}>
            <View style={globalStyles.showWalkRow2}>
              <View style={globalStyles.showRequestColumn1}>
                <Text style={globalStyles.showWalkName}>{worker.name}</Text>
                <Text style={globalStyles.showWalkPrice}>
                  {request.price} €
                </Text>
                <Text style={globalStyles.showWalkDate1}>Fecha:</Text>
                <Text style={globalStyles.showWalkDate2}>
                  {request.interval.split(" ")[0]}
                </Text>
                <Text style={globalStyles.showWalkDate3}>
                  {request.interval.split(" ")[1]}{" "}
                  {request.interval.split(" ")[2]}{" "}
                  {request.interval.split(" ")[3]}
                </Text>
              </View>
              <View style={globalStyles.showRequestColumn22}>
                <Image
                  style={globalStyles.showWalkImage}
                  source={{ uri: worker.photo }}
                />
              </View>
              <View style={globalStyles.showRequestColumn3}>
                <Text style={globalStyles.showWalkStatus2}>{status}</Text>
                <Text style={globalStyles.showWalkPay2}> {pago} </Text>
              </View>
            </View>
            <Text style={globalStyles.showWalkWaiting2}>
              Servicio Finalizado
            </Text>
            <Text style={globalStyles.showWalkWaiting}>
              Esperando Valoración
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={globalStyles.safeShowRequestArea}>
        <View style={globalStyles.showWalkFeed}>
          <View style={globalStyles.viewFlex1}>
            <View style={globalStyles.showWalkRow}>
              <View style={globalStyles.showRequestColumn1}>
                <Text style={globalStyles.showWalkName}>{worker.name}</Text>
                <Text style={globalStyles.showWalkPrice}>
                  {request.price} €
                </Text>
                <Text style={globalStyles.showWalkDate1}>Fecha:</Text>
                <Text style={globalStyles.showWalkDate2}>
                  {request.interval.split(" ")[0]}
                </Text>
                <Text style={globalStyles.showWalkDate3}>
                  {request.interval.split(" ")[1]}{" "}
                  {request.interval.split(" ")[2]}{" "}
                  {request.interval.split(" ")[3]}
                </Text>
              </View>
              <View style={globalStyles.showRequestColumn22}>
                <Image
                  style={globalStyles.showWalkImage2}
                  source={{ uri: worker.photo }}
                />
              </View>
              <View style={globalStyles.showRequestColumn3}>
                <Text style={globalStyles.showWalkStatus2}>{status}</Text>
                <Text style={globalStyles.showWalkPay}> {pago} </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default withNavigation(ShowWalk);
