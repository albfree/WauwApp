import React from "react";
import { Text, View, Image, SafeAreaView, Alert } from "react-native";
import { Button, Icon } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { db } from "../../population/config.js";
import { globalStyles } from "../../styles/global";
import { requestsStyles } from "../../styles/requestsStyle";
import { bannedAssertion } from "../../account/BannedAssertion";

function showRequest(props) {
  const { navigation } = props;
  const request = navigation.state.params.request;

  var id = request.worker;
  var tipo = "";
  var status = "";
  var worker = [];
  var pago = "";
  bannedAssertion();

  db.ref("wauwers")
    .orderByChild("id")
    .equalTo(id)
    .on("child_added", (snap) => {
      worker = snap.val();
    });

  const cancel = () => {
    var idRequest = request.id;
    var query = db.ref().child("requests/" + idRequest);
    //var query = db.ref().child("requests/" + idRequest);

    query.update({
      pending: false,
      isCanceled: true,
    });

    alert("Se ha cancelado la solicitud correctamente");
    navigation.popToTop();
  };

  if (request.type === "sitter") {
    tipo = "Alojamiento";
    fecha = "Del "
      .concat(request.startTime)
      .concat(" al ")
      .concat(request.endTime);
  } else if (request.type === "walk") {
    tipo = "Paseo";
    fecha = "Día y hora: ".concat(request.interval);
  }

  if (request.pending && !request.isCanceled) {
    status = "Esperando aceptación";
  } else if (!request.pending && request.isCanceled) {
    status = "Solicitud denegada";
  } else if (!request.isRated) {
    status = "Solicitud aceptada";
  } else {
    status = "Servicio Finalizado";
  }

  if (request.isPayed) {
    pago = "Pago realizado";
  } else {
    pago = "Pendiente de pago";
  }

  const checkIsRated = () => {
    if (!request.rated) {
      navigation.navigate("AddReviewService", {
        request: request,
        worker: worker,
      });
    } else {
      Alert.alert("Ya ha valorado este servicio", "");
    }
  };

  if (request.pending && request.type === "walk") {
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

            <Button
              buttonStyle={requestsStyles.requestsBtn}
              containerStyle={requestsStyles.requestsBtnContainer}
              title="Cancelar Solicitud"
              onPress={cancel}
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
      </SafeAreaView>
    );
  } else if (
    !request.pending &&
    request.isCanceled &&
    request.type === "walk"
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
    request.type === "walk" &&
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
            <Text style={requestsStyles.requestsTxt7}>
              Esperando el cierre del servicio
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  } else if (
    !request.pending &&
    !request.isCanceled &&
    request.isPayed &&
    request.type === "walk" &&
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
              title="Valorar Servicio"
              onPress={() =>
                navigation.navigate("AddReviewService", {
                  request: request,
                  worker: worker,
                })
              }
              icon={
                <Icon
                  type="material-community"
                  name="star"
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
    request.type === "walk" &&
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
      </SafeAreaView>
    );
  } else if (
    !request.pending &&
    !request.isCanceled &&
    !request.isPayed &&
    request.type === "walk"
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
                <Text style={requestsStyles.requestsTxt10}> {pago} </Text>
              </View>
            </View>

            <Button
              buttonStyle={requestsStyles.requestsBtn2}
              containerStyle={requestsStyles.requestsBtnContainer2}
              title="Proceder al Pago"
              onPress={() =>
                navigation.navigate("PayRequest", {
                  request,
                })
              }
              icon={
                <Icon
                  type="font-awesome"
                  name="paypal"
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
  } else if (request.pending && request.type === "sitter") {
    return (
      <SafeAreaView style={requestsStyles.requestsView4}>
        <View style={requestsStyles.requestsFeed2}>
          <View style={globalStyles.viewFlex1}>
            <View style={requestsStyles.requestsView5}>
              <View style={requestsStyles.requestsView6}>
                <Text style={requestsStyles.requestsTxt4}>{worker.name}</Text>
                <Text style={requestsStyles.requestsTxt5}>{tipo}</Text>
                <Text style={requestsStyles.requestsTxt6}>Fecha de Inicio</Text>
                <Text style={requestsStyles.requestsTxt7}>
                  {request.startTime.toLocaleString("es-ES").substring(0, 10)}{" "}
                </Text>
              </View>
              <View style={requestsStyles.requestsView6}>
                <Image
                  style={requestsStyles.requestsImage}
                  source={{ uri: worker.photo }}
                />

                <Text style={requestsStyles.requestsTxt10}> {pago} </Text>
              </View>
              <View style={requestsStyles.requestsView6}>
                <Text style={requestsStyles.requestsTxt8}>
                  {request.price} €
                </Text>
                <Text style={requestsStyles.requestsTxt9}>{status}</Text>
                <Text style={requestsStyles.requestsTxt6}>Fecha de Fin</Text>
                <Text style={requestsStyles.requestsTxt7}>
                  {request.endTime.toLocaleString("en-En").substring(0, 10)}
                </Text>
              </View>
            </View>

            <Button
              buttonStyle={requestsStyles.requestsBtn}
              containerStyle={requestsStyles.requestsBtnContainer}
              title="Cancelar solicitud"
              onPress={cancel}
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
      </SafeAreaView>
    );
  } else if (
    !request.pending &&
    request.isCanceled &&
    request.type === "sitter"
  ) {
    return (
      <SafeAreaView style={requestsStyles.requestsView4}>
        <View style={requestsStyles.requestsFeed2}>
          <View style={globalStyles.viewFlex1}>
            <View style={requestsStyles.requestsView5}>
              <View style={requestsStyles.requestsView6}>
                <Text style={requestsStyles.requestsTxt4}>{worker.name}</Text>
                <Text style={requestsStyles.requestsTxt5}>{tipo}</Text>
                <Text style={requestsStyles.requestsTxt6}>Fecha de Inicio</Text>
                <Text style={requestsStyles.requestsTxt7}>
                  {request.startTime.toLocaleString("en-En").substring(0, 10)}
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
                <Text style={requestsStyles.requestsTxt10}>{status}</Text>
                <Text style={requestsStyles.requestsTxt15}>Fecha de Fin</Text>
                <Text style={requestsStyles.requestsTxt7}>
                  {request.endTime.toLocaleString("en-En").substring(0, 10)}
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
    request.type === "sitter"
  ) {
    return (
      <SafeAreaView style={requestsStyles.requestsView4}>
        <View style={requestsStyles.requestsFeed2}>
          <View style={globalStyles.viewFlex1}>
            <View style={requestsStyles.requestsView5}>
              <View style={requestsStyles.requestsView6}>
                <Text style={requestsStyles.requestsTxt4}>{worker.name}</Text>
                <Text style={requestsStyles.requestsTxt5}>{tipo}</Text>
                <Text style={requestsStyles.requestsTxt6}>Fecha de Inicio</Text>
                <Text style={requestsStyles.requestsTxt7}>
                  {request.startTime.toLocaleString("es-ES").substring(0, 10)}{" "}
                </Text>
              </View>
              <View style={requestsStyles.requestsView6}>
                <Image
                  style={requestsStyles.requestsImage}
                  source={{ uri: worker.photo }}
                />

                <Text style={requestsStyles.requestsTxt10}> {pago} </Text>
              </View>
              <View style={requestsStyles.requestsView6}>
                <Text style={requestsStyles.requestsTxt8}>
                  {request.price} €
                </Text>
                <Text style={requestsStyles.requestsTxt13}>{status}</Text>
                <Text style={requestsStyles.requestsTxt6}>Fecha de Fin</Text>
                <Text style={requestsStyles.requestsTxt7}>
                  {request.endTime.toLocaleString("en-En").substring(0, 10)}
                </Text>
              </View>
            </View>

            <Button
              buttonStyle={requestsStyles.requestsBtn2}
              containerStyle={requestsStyles.requestsBtnContainer2}
              title="Proceder al Pago"
              onPress={() =>
                navigation.navigate("PayRequest", {
                  request,
                })
              }
              icon={
                <Icon
                  type="font-awesome"
                  name="paypal"
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
    !request.isFinished &&
    request.type === "sitter"
  ) {
    return (
      <SafeAreaView style={requestsStyles.requestsView4}>
        <View style={requestsStyles.requestsFeed2}>
          <View style={globalStyles.viewFlex1}>
            <View style={requestsStyles.requestsView5}>
              <View style={requestsStyles.requestsView6}>
                <Text style={requestsStyles.requestsTxt4}>{worker.name}</Text>
                <Text style={requestsStyles.requestsTxt5}>{tipo}</Text>
                <Text style={requestsStyles.requestsTxt6}>Fecha de Inicio</Text>
                <Text style={requestsStyles.requestsTxt7}>
                  {request.startTime.toLocaleString("en-En").substring(0, 10)}
                </Text>
              </View>
              <View style={requestsStyles.requestsView6}>
                <Image
                  style={requestsStyles.requestsImage}
                  source={{ uri: worker.photo }}
                />

                <Text style={requestsStyles.requestsTxt14}> {pago} </Text>
              </View>
              <View style={requestsStyles.requestsView6}>
                <Text style={requestsStyles.requestsTxt8}>
                  {request.price} €
                </Text>
                <Text style={requestsStyles.requestsTxt13}>{status}</Text>
                <Text style={requestsStyles.requestsTxt6}>Fecha de Fin</Text>
                <Text style={requestsStyles.requestsTxt7}>
                  {request.endTime.toLocaleString("en-En").substring(0, 10)}
                </Text>
              </View>
            </View>

            <Button
              buttonStyle={requestsStyles.requestsBtn2}
              containerStyle={requestsStyles.requestsBtnContainer2}
              title="Abrir Chat"
              onPress={() =>
                navigation.navigate("Chats", {
                  request,
                })
              }
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
            <Text style={requestsStyles.requestsTxt7}>
              Esperando el cierre del servicio
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
    !request.isRated &&
    request.type === "sitter"
  ) {
    return (
      <SafeAreaView style={requestsStyles.requestsView4}>
        <View style={requestsStyles.requestsFeed2}>
          <View style={globalStyles.viewFlex1}>
            <View style={requestsStyles.requestsView5}>
              <View style={requestsStyles.requestsView6}>
                <Text style={requestsStyles.requestsTxt4}>{worker.name}</Text>
                <Text style={requestsStyles.requestsTxt5}>{tipo}</Text>
                <Text style={requestsStyles.requestsTxt6}>Fecha de Inicio</Text>
                <Text style={requestsStyles.requestsTxt7}>
                  {request.startTime.toLocaleString("en-En").substring(0, 10)}
                </Text>
              </View>
              <View style={requestsStyles.requestsView6}>
                <Image
                  style={requestsStyles.requestsImage}
                  source={{ uri: worker.photo }}
                />

                <Text style={requestsStyles.requestsTxt14}> {pago} </Text>
              </View>
              <View style={requestsStyles.requestsView6}>
                <Text style={requestsStyles.requestsTxt8}>
                  {request.price} €
                </Text>
                <Text style={requestsStyles.requestsTxt13}>{status}</Text>
                <Text style={requestsStyles.requestsTxt6}>Fecha de Fin</Text>
                <Text style={requestsStyles.requestsTxt7}>
                  {request.endTime.toLocaleString("en-En").substring(0, 10)}
                </Text>
              </View>
            </View>

            <Button
              buttonStyle={requestsStyles.requestsBtn2}
              containerStyle={requestsStyles.requestsBtnContainer2}
              title="Abrir Chat"
              onPress={() =>
                navigation.navigate("Chats", {
                  request,
                })
              }
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
              title="Valorar Servicio"
              onPress={() =>
                navigation.navigate("AddReviewService", {
                  request: request,
                  worker: worker,
                })
              }
              icon={
                <Icon
                  type="material-community"
                  name="star"
                  size={30}
                  color="white"
                  marginLeft={20}
                />
              }
              titleStyle={requestsStyles.requestsBtnTittle}
            />
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
                <Text style={requestsStyles.requestsTxt6}>Fecha de Inicio</Text>
                <Text style={requestsStyles.requestsTxt7}>
                  {request.startTime.toLocaleString("en-En").substring(0, 10)}
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
                <Text style={requestsStyles.requestsTxt6}>Fecha de Fin</Text>
                <Text style={requestsStyles.requestsTxt7}>
                  {request.endTime.toLocaleString("en-En").substring(0, 10)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default withNavigation(showRequest);
