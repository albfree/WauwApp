import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  Image,
  SafeAreaView,
  Alert
} from "react-native";
import { withNavigation } from "react-navigation";
import { db } from "../../population/config.js";

function showRequest(props) {
  const { navigation } = props;
  const request = navigation.state.params.request;
 // console.log(request);

  var id = request.worker;
  var tipo = "";
  var status = "";
  var worker = [];
  var pago = "";

  //console.log("id:" + id);

  db.ref("wauwers")
    .orderByChild("id")
    .equalTo(id)
    .on("child_added", snap => {
      worker = snap.val();
    });

  const cancel = () => {
    var idRequest = request.id;
    //console.log(" request", request.id);
    var query = db.ref().child("requests/" + idRequest);

    query.update({
      pending: false,
      isCanceled: true
    })

    alert("Se ha cancelado la solicitud correctamente");
    navigation.navigate("Home");
  }

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
    status = "Pendiente de aceptación";
  } else if (!request.pending && request.isCanceled) {
    status = "La solicitud ha sido denegada";
  } else {
    status = "La solicitud ha sido aceptada";
  }

  if(request.isPayed){
    pago = "La solicitud ya ha sido pagada"
  }else{
    pago = "La solicitud aun está a la espera de pago"
  }


  if (request.pending && request.type == "walk") {

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: worker.photo }}
        />

        <Text> {worker.name} </Text>
        <Text> {request.price} €</Text>
        <Text> Tipo de servicio: {tipo}</Text>
        <Text> Estado de la solicitud:  {status} </Text>
        <Text> Fecha: {request.interval} </Text>
        <Text> {pago} </Text>



        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.btnStyle2}
            containerStyle={styles.btnContainer2}
            title="Cancelar solicitud"
            onPress={cancel}
          />
        </View>
      </SafeAreaView>
    );

  } else if (!request.pending && request.isCanceled && request.type === "walk") {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: worker.photo }}
        />

        <Text> {worker.name} </Text>
        <Text> {request.price} €</Text>
        <Text> Tipo de servicio: {tipo}</Text>

        <Text> Estado de la solicitud:  {status} </Text>
        <Text> Fecha: {request.interval} </Text>

      </SafeAreaView>
    );
  } else if (!request.pending && !request.isCanceled && request.isPayed && request.type == "walk") {

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: worker.photo }}
        />

        <Text> {worker.name} </Text>
        <Text> {request.price} €</Text>
        <Text> Tipo de servicio: {tipo}</Text>
        <Text> Estado de la solicitud:  {status} </Text>
        <Text> Fecha: {request.interval} </Text>
        <Text> {pago} </Text>

        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.btnStyle2}
            containerStyle={styles.btnContainer2}
            title="Abrir Chat"
            onPress={() => navigation.navigate("Chats")}
          />
        </View>
      </SafeAreaView>
    );

  } else if (!request.pending && !request.isCanceled && !request.isPayed && request.type == "walk") {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: worker.photo }}
        />

        <Text> {worker.name} </Text>
        <Text> {request.price} €</Text>
        <Text> Tipo de servicio: {tipo}</Text>
        <Text> Estado de la solicitud:  {status} </Text>
        <Text> Fecha: {request.interval} </Text>
        <Text> {pago} </Text>


        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.btnStyle2}
            containerStyle={styles.btnContainer2}
            title="Proceder al pago"
            onPress={() =>
              navigation.navigate("PayRequest", {
                request
              })
            }
          />
        </View>
      </SafeAreaView>
    );

  } else if (request.pending && request.type === "sitter") {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: worker.photo }}
        />

        <Text> {worker.name} </Text>
        <Text> {request.price} €</Text>
        <Text> Tipo de servicio: {tipo}</Text>
        <Text> Estado de la solicitud: {status} </Text>
        <Text> Fecha de inicio: {request.startTime} </Text>
        <Text> Fecha de fin: {request.endTime} </Text>
        <Text> {pago} </Text>

        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.btnStyle2}
            containerStyle={styles.btnContainer2}
            title="Cancelar solicitud"
            onPress={cancel}
          />
        </View>
      </SafeAreaView>
    );

  } else if (!request.pending && request.isCanceled && request.type == "sitter") {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: worker.photo }}
        />

        <Text> {worker.name} </Text>
        <Text> {request.price} €</Text>
        <Text> Tipo de servicio: {tipo}</Text>
        <Text> Estado de la solicitud:  {status} </Text>
        <Text> Fecha de inicio: {request.startTime} </Text>
        <Text> Fecha de fin: {request.endTime} </Text>
      </SafeAreaView>
    );
  
  } else if (!request.pending && !request.isCanceled && !request.isPayed && request.type == "sitter") {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: worker.photo }}
        />

        <Text> {worker.name} </Text>
        <Text> {request.price} €</Text>
        <Text> Tipo de servicio: {tipo}</Text>
        <Text> Estado de la solicitud: {status} </Text>
        <Text> Fecha de inicio: {request.startTime} </Text>
        <Text> Fecha de fin: {request.endTime} </Text>

        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.btnStyle2}
            containerStyle={styles.btnContainer2}
            title="Proceder al pago"
            onPress={() =>
              navigation.navigate("PayRequest", {
                request
              })
            }
          />
        </View>
        
      </SafeAreaView>
    );

  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: worker.photo }}
        />

        <Text> {worker.name} </Text>
        <Text> {request.price} €</Text>
        <Text> Tipo de servicio: {tipo}</Text>
        <Text> Estado de la solicitud: {status} </Text>
        <Text> Fecha de inicio: {request.startTime} </Text>
        <Text> Fecha de fin: {request.endTime} </Text>
        <Text> {pago} </Text>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.btnStyle2}
            containerStyle={styles.btnContainer2}
            title="Abrir Chat"
            onPress={() => navigation.navigate("Chats")}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default withNavigation(showRequest);

const styles = StyleSheet.create({
  btnStyle2: {
    backgroundColor: "#443099",
    borderRadius: 30,
    marginTop: 5,
    marginBottom: 5
  },
  btnContainer2: {
    alignItems: "center",
    alignSelf: "center",
    width: "75%",
    backgroundColor: "#443099",
    marginTop: 5,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 10
  }
});
