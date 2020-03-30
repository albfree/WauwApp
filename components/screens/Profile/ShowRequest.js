import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  Image,
  SafeAreaView,
  Alert
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { db } from "../../population/config.js";
import { globalStyles } from "../../styles/global";

function showRequest(props) {
  const { navigation } = props;
  const request = navigation.state.params.request;
  console.log(request);

  var id = request.worker;
  var tipo = "";
  var status = "";
  var worker = [];
  var pago = "";

  console.log("id:" + id);

  db.ref("wauwers")
    .orderByChild("id")
    .equalTo(id)
    .on("child_added", snap => {
      worker = snap.val();
    });

  const cancel = () => {
    var idRequest = request.id;
    console.log(" request", request.id);
    var query = db.ref().child("requests/" + idRequest);

    query.update({
      pending: false,
      isCanceled: true
    });

    alert("Se ha cancelado la solicitud correctamente");
    navigation.navigate("Home");
  };

  if (request.type == "sitter") {
    tipo = "Alojamiento";
    fecha = "Del "
      .concat(request.startTime)
      .concat(" al ")
      .concat(request.endTime);
  } else if (request.type == "walk") {
    tipo = "Paseo";
    fecha = "Día y hora: ".concat(request.interval);
  }

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

  if (request.pending && request.type == "walk") {
    return (
      <SafeAreaView style={globalStyles.safeShowRequestArea}>
        <View style={globalStyles.showRequestFeed}>
          <View style={globalStyles.viewFlex1}>
            <View style={globalStyles.showRequestRow}>
              <View style={globalStyles.showRequestColumn1}>
                <Text style={globalStyles.showRequestName}>{worker.name}</Text>
                <Text style={globalStyles.showRequestType2}>{tipo}</Text>
                <Text style={globalStyles.showRequestDate1}>Fecha:</Text>
                <Text style={globalStyles.showRequestDate2}>
                  {request.interval}
                </Text>
              </View>
              <View style={globalStyles.showRequestColumn22}>
                <Image
                  style={globalStyles.showRequestImage2}
                  source={{ uri: worker.photo }}
                />
              </View>
              <View style={globalStyles.showRequestColumn3}>
                <Text style={globalStyles.showRequestPrice}>
                  {request.price} €
                </Text>
                <Text style={globalStyles.showRequestStatus4}>{status}</Text>
                <Text style={globalStyles.showRequestPay4}> {pago} </Text>
              </View>
            </View>

            <Button
              buttonStyle={globalStyles.showRequestBtn}
              containerStyle={globalStyles.showRequestBtnContainer}
              title="Cancelar Solicitud"
              onPress={() => navigation.navigate("Chats")}
              icon={
                <Icon
                  type="material-community"
                  name="cancel"
                  size={30}
                  color="white"
                  marginLeft={cancel}
                />
              }
              titleStyle={globalStyles.showRequestBtnTittle}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  } else if (!request.pending && request.isCanceled && request.type == "walk") {
    return (
      <SafeAreaView style={globalStyles.safeShowRequestArea}>
        <View style={globalStyles.showRequestFeed}>
          <View style={globalStyles.viewFlex1}>
            <View style={globalStyles.showRequestRow}>
              <View style={globalStyles.showRequestColumn1}>
                <Text style={globalStyles.showRequestName}>{worker.name}</Text>
                <Text style={globalStyles.showRequestType2}>{tipo}</Text>
                <Text style={globalStyles.showRequestDate1}>Fecha:</Text>
                <Text style={globalStyles.showRequestDate2}>
                  {request.interval}
                </Text>
              </View>
              <View style={globalStyles.showRequestColumn22}>
                <Image
                  style={globalStyles.showRequestImage2}
                  source={{ uri: worker.photo }}
                />
              </View>
              <View style={globalStyles.showRequestColumn3}>
                <Text style={globalStyles.showRequestPrice}>
                  {request.price} €
                </Text>
                <Text style={globalStyles.showRequestStatus5}>{status}</Text>
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
    request.type == "walk"
  ) {
    return (
      <SafeAreaView style={globalStyles.safeShowRequestArea}>
        <View style={globalStyles.showRequestFeed}>
          <View style={globalStyles.viewFlex1}>
            <View style={globalStyles.showRequestRow}>
              <View style={globalStyles.showRequestColumn1}>
                <Text style={globalStyles.showRequestName}>{worker.name}</Text>
                <Text style={globalStyles.showRequestType2}>{tipo}</Text>
                <Text style={globalStyles.showRequestDate1}>Fecha:</Text>
                <Text style={globalStyles.showRequestDate2}>
                  {request.interval}
                </Text>
              </View>
              <View style={globalStyles.showRequestColumn22}>
                <Image
                  style={globalStyles.showRequestImage2}
                  source={{ uri: worker.photo }}
                />
              </View>
              <View style={globalStyles.showRequestColumn3}>
                <Text style={globalStyles.showRequestPrice}>
                  {request.price} €
                </Text>
                <Text style={globalStyles.showRequestStatus4}>{status}</Text>
                <Text style={globalStyles.showRequestPay3}> {pago} </Text>
              </View>
            </View>

            <Button
              buttonStyle={globalStyles.showRequestBtn}
              containerStyle={globalStyles.showRequestBtnContainer}
              title="Abrir Chat"
              onPress={() => navigation.navigate("Chats")}
              icon={
                <Icon
                  type="material-community"
                  name="chat"
                  size={30}
                  color="white"
                  marginLeft={10}
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
    !request.isPayed &&
    request.type == "walk"
  ) {
    return (
      <SafeAreaView style={globalStyles.safeShowRequestArea}>
        <View style={globalStyles.showRequestFeed}>
          <View style={globalStyles.viewFlex1}>
            <View style={globalStyles.showRequestRow}>
              <View style={globalStyles.showRequestColumn1}>
                <Text style={globalStyles.showRequestName}>{worker.name}</Text>
                <Text style={globalStyles.showRequestType2}>{tipo}</Text>
                <Text style={globalStyles.showRequestDate1}>Fecha:</Text>
                <Text style={globalStyles.showRequestDate2}>
                  {request.interval}
                </Text>
              </View>
              <View style={globalStyles.showRequestColumn22}>
                <Image
                  style={globalStyles.showRequestImage2}
                  source={{ uri: worker.photo }}
                />
              </View>
              <View style={globalStyles.showRequestColumn3}>
                <Text style={globalStyles.showRequestPrice}>
                  {request.price} €
                </Text>
                <Text style={globalStyles.showRequestStatus4}>{status}</Text>
                <Text style={globalStyles.showRequestPay4}> {pago} </Text>
              </View>
            </View>

            <Button
              buttonStyle={globalStyles.showRequestBtn}
              containerStyle={globalStyles.showRequestBtnContainer}
              title="Proceder al Pago"
              onPress={() => navigation.navigate("PayRequest")}
              icon={
                <Icon
                  type="font-awesome"
                  name="paypal"
                  size={30}
                  color="white"
                  marginLeft={10}
                />
              }
              titleStyle={globalStyles.showRequestBtnTittle}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  } else if (request.pending && request.type == "sitter") {
    return (
      <SafeAreaView style={globalStyles.safeShowRequestArea}>
        <View style={globalStyles.showRequestFeed}>
          <View style={globalStyles.viewFlex1}>
            <View style={globalStyles.showRequestRow}>
              <View style={globalStyles.showRequestColumn1}>
                <Text style={globalStyles.showRequestName}>{worker.name}</Text>
                <Text style={globalStyles.showRequestType}>{tipo}</Text>
                <Text style={globalStyles.showRequestDate1}>
                  Fecha Inicio:{" "}
                </Text>
                <Text style={globalStyles.showRequestDate2}>
                  {request.startTime.toLocaleString("es-ES").substring(0, 10)}{" "}
                </Text>
              </View>
              <View style={globalStyles.showRequestColumn2}>
                <Image
                  style={globalStyles.showRequestImage}
                  source={{ uri: worker.photo }}
                />

                <Text style={globalStyles.showRequestPay}> {pago} </Text>
              </View>
              <View style={globalStyles.showRequestColumn3}>
                <Text style={globalStyles.showRequestPrice}>
                  {request.price} €
                </Text>
                <Text style={globalStyles.showRequestStatus}>{status}</Text>
                <Text style={globalStyles.showRequestDate3}>Fecha de Fin:</Text>
                <Text style={globalStyles.showRequestDate4}>
                  {request.endTime.toLocaleString("en-En").substring(0, 10)}
                </Text>
              </View>
            </View>

            <Button
              buttonStyle={globalStyles.showRequestBtn}
              containerStyle={globalStyles.showRequestBtnContainer}
              title="Cancelar solicitud"
              onPress={cancel}
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
      </SafeAreaView>
    );
  } else if (
    !request.pending &&
    request.isCanceled &&
    request.type == "sitter"
  ) {
    return (
      <SafeAreaView style={globalStyles.safeShowRequestArea}>
        <View style={globalStyles.showRequestFeed}>
          <View style={globalStyles.viewFlex1}>
            <View style={globalStyles.showRequestRow2}>
              <View style={globalStyles.showRequestColumn1}>
                <Text style={globalStyles.showRequestName}>{worker.name}</Text>
                <Text style={globalStyles.showRequestType}>{tipo}</Text>
                <Text style={globalStyles.showRequestDate1}>
                  Fecha Inicio:{" "}
                </Text>
                <Text style={globalStyles.showRequestDate2}>
                  {request.startTime}
                </Text>
              </View>
              <View style={globalStyles.showRequestColumn2}>
                <Image
                  style={globalStyles.showRequestImage}
                  source={{ uri: worker.photo }}
                />

                <Text style={globalStyles.showRequestPay}> {pago} </Text>
              </View>
              <View style={globalStyles.showRequestColumn3}>
                <Text style={globalStyles.showRequestPrice}>
                  {request.price} €
                </Text>
                <Text style={globalStyles.showRequestStatus2}>{status}</Text>
                <Text style={globalStyles.showRequestDate3}>Fecha de Fin:</Text>
                <Text style={globalStyles.showRequestDate4}>
                  {request.endTime}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  } else if (
    !request.pending &&
    !request.isCanceled &&
    !request.isPayed &&
    request.type == "sitter"
  ) {
    return (
      <SafeAreaView style={globalStyles.safeShowRequestArea}>
        <View style={globalStyles.showRequestFeed}>
          <View style={globalStyles.viewFlex1}>
            <View style={globalStyles.showRequestRow}>
              <View style={globalStyles.showRequestColumn1}>
                <Text style={globalStyles.showRequestName}>{worker.name}</Text>
                <Text style={globalStyles.showRequestType}>{tipo}</Text>
                <Text style={globalStyles.showRequestDate1}>
                  Fecha Inicio:{" "}
                </Text>
                <Text style={globalStyles.showRequestDate2}>
                  {request.startTime.toLocaleString("es-ES").substring(0, 10)}{" "}
                </Text>
              </View>
              <View style={globalStyles.showRequestColumn2}>
                <Image
                  style={globalStyles.showRequestImage}
                  source={{ uri: worker.photo }}
                />

                <Text style={globalStyles.showRequestPay}> {pago} </Text>
              </View>
              <View style={globalStyles.showRequestColumn3}>
                <Text style={globalStyles.showRequestPrice}>
                  {request.price} €
                </Text>
                <Text style={globalStyles.showRequestStatus}>{status}</Text>
                <Text style={globalStyles.showRequestDate3}>Fecha de Fin:</Text>
                <Text style={globalStyles.showRequestDate4}>
                  {request.endTime.toLocaleString("en-En").substring(0, 10)}
                </Text>
              </View>
            </View>

            <Button
              buttonStyle={globalStyles.showRequestBtn}
              containerStyle={globalStyles.showRequestBtnContainer}
              title="Proceder al Pago"
              onPress={() =>
                navigation.navigate("PayRequest", {
                  request
                })
              }
              icon={
                <Icon
                  type="font-awesome"
                  name="paypal"
                  size={30}
                  color="white"
                  marginLeft={10}
                />
              }
              titleStyle={globalStyles.showRequestBtnTittle}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={globalStyles.safeShowRequestArea}>
        <View style={globalStyles.showRequestFeed}>
          <View style={globalStyles.viewFlex1}>
            <View style={globalStyles.showRequestRow}>
              <View style={globalStyles.showRequestColumn1}>
                <Text style={globalStyles.showRequestName}>{worker.name}</Text>
                <Text style={globalStyles.showRequestType}>{tipo}</Text>
                <Text style={globalStyles.showRequestDate1}>
                  Fecha Inicio:{" "}
                </Text>
                <Text style={globalStyles.showRequestDate2}>
                  {request.startTime}
                </Text>
              </View>
              <View style={globalStyles.showRequestColumn2}>
                <Image
                  style={globalStyles.showRequestImage}
                  source={{ uri: worker.photo }}
                />

                <Text style={globalStyles.showRequestPay2}> {pago} </Text>
              </View>
              <View style={globalStyles.showRequestColumn3}>
                <Text style={globalStyles.showRequestPrice}>
                  {request.price} €
                </Text>
                <Text style={globalStyles.showRequestStatus3}>{status}</Text>
                <Text style={globalStyles.showRequestDate3}>Fecha de Fin:</Text>
                <Text style={globalStyles.showRequestDate4}>
                  {request.endTime}
                </Text>
              </View>
            </View>

            <Button
              buttonStyle={globalStyles.showRequestBtn}
              containerStyle={globalStyles.showRequestBtnContainer}
              title="Abrir Chat"
              onPress={() =>
                navigation.navigate("Chats", {
                  request
                })
              }
              icon={
                <Icon
                  type="material-community"
                  name="chat"
                  size={30}
                  color="white"
                  marginLeft={10}
                />
              }
              titleStyle={globalStyles.showRequestBtnTittle}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default withNavigation(showRequest);
