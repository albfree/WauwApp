import React, { useState, useEffect } from "react";
import {
  View,
  YellowBox,
  Text,
  Alert
} from "react-native";
import { db } from "../../population/config.js";
import { withNavigation } from "react-navigation";
import _ from "lodash";
import { Button, Icon } from "react-native-elements";
import { BannedAssertion } from "../../account/BannedAssertion";

YellowBox.ignoreWarnings(["Setting a timer"]);

function DisplayFinishRequest(props){
  const {navigation} = props;

  const request = navigation.state.params.request;
  const wauwerId = request.owner;
  const [wauwerName, setWauwerName] = useState("");

  var x = new Date(request.startTime);
  var y = new Date(request.endTime);

  const [isLoading, setIsLoading] = useState(false);
  const [setReloadData] = useState(false);
  const [visibleModal, setIsVisibleModal] = useState(false);
  const [error, setError] = useState("");
  BannedAssertion();

  useEffect(() => {
    db.ref("wauwers")
    .orderByChild("id")
    .equalTo(wauwerId)
    .on("child_added", (snap) => {
      setWauwerName(snap.val().name + " " + snap.val().surname);
    });
  });

  const endService = () => {
    let requestData = {
      isFinished: true
    };

    db.ref("requests")
      .child(request.id)
      .update(requestData)
      .then(() => {
        setReloadData(true);
        setIsVisibleModal(false);
        setIsLoading(true);
      })
      .catch(() => {
        setError("Ha ocurrido un error");
        setIsLoading(false);
      });
    Alert.alert("Éxito", "Servicio finalizado.");
    navigation.navigate("RequestToMyAccommodationList");
  };

  return(
    <View>
      <Text>
        {"Solicitud de " + wauwerName}
      </Text>
      {request.petNumber>1 ? (
        <Text>
        {"Alojamiento para " + request.petNumber + " perros"}
        </Text>
      ) : (
        <Text>
        {"Alojamiento para " + request.petNumber + " perro"}
        </Text>
      )}
      
      <Text>
        {"Fecha de inicio: " + x.getDate() +
                    "/" +
                    parseInt(x.getMonth() + 1) +
                    "/" +
                    x.getFullYear()}
      </Text>
      <Text>
      {"Fecha de fin: " + y.getDate() +
                    "/" +
                    parseInt(y.getMonth() + 1) +
                    "/" +
                    y.getFullYear()}
      </Text>
      <Text>
      {"A cobrar: " + (request.price * 0.8)
                    .toFixed(2)
                    .toString() + " €"}
      </Text>
      
      {request.isPayed ? (
        <View>
          <Text>Ya ha sido pagado.</Text>
        </View>
      ) : (
        <View>
          <Text>Pendiente de pago.</Text>
        </View>
      )}

      {request.isFinished ? (
        <View>
          <Text>
            Estado del servicio: finalizado
          </Text>
        </View>
      ) : (
        <View>
          <Text>
            Estado del servicio: en curso
          </Text>
        </View>
      )}
      
      {navigation.state.params.toFinish === true ? (
        <View>
          <Button title="Finalizar servicio" onPress={endService}/>
        </View>
      ) : (
        <View>
        </View>
      )}
    </View> 
  );
}

export default withNavigation(DisplayFinishRequest);
