import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { db } from "../../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../../account/QueriesProfile";
import { globalStyles } from "../../styles/global";
import { FontAwesome } from "@expo/vector-icons";
import BlankView from "../BlankView";
import { requestsStyles } from "../../styles/requestsStyle";
import { bannedAssertion } from "../../account/bannedAssertion";

function ProfileRequestToMyRequestList(props) {
  const { navigation } = props;

  const [loading, setLoading] = useState(true);
  const [requestsList, setRequestsList] = useState([]);
  const [reloadData, setReloadData] = useState(false);

  var wauwer = bannedAssertion();
  var wauwerId = wauwer.id;

  useEffect(() => {
    db.ref("requests")
      .orderByChild("worker")
      .equalTo(wauwerId)
      .on("value", (snap) => {
        const requests = [];
        snap.forEach((child) => {
          var endTime = new Date(child.val().endTime);
          if (
            (endTime > new Date() || child.val().isFinished === false) &&
            child.val().accommodation ===
              navigation.state.params.accommodation.id
          ) {
            requests.push(child.val());
          }
        });
        setRequestsList(requests);
      });
    setReloadData(false);
    setLoading(false);
  }, [reloadData]);

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView>
        <Text style={requestsStyles.requestsTxt16}>
          Listado de solicitudes para este alojamiento
        </Text>

        {requestsList.length > 0 ? (
          <FlatList
            data={requestsList}
            renderItem={(request) => (
              <Request request={request} navigation={navigation} />
            )}
            keyExtractor={(request) => request.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <BlankView text={"No tiene solicitudes para este alojamiento"} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Request(requestIn) {
  const { request, navigation } = requestIn;
  let toFinish = false;
  var endTime = new Date(request.item.endTime);
  let color = "white";
  let status = "";
  if (endTime < new Date()) {
    toFinish = true;
  }

  const verde = "#0a0";

  if (request.item.pending) {
    status = "Pendiente de aceptación";
    color = "rgba(255,128,0,0.6)";
  } else {
    switch (request.item.isCanceled) {
      case false:
        status = "Aceptada";
        color = "rgba(0,128,0,0.6)";
        break;
      case true:
        status = "Denegada";
        color = "rgba(255,0,0,0.6)";
        break;
      default:
        break;
    }
  }
  const statusC = {
    color,
    fontSize: 13,
    marginTop: 4,
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("DisplayFinishRequests", {
          request: request.item,
          toFinish,
        })
      }
    >
      <View style={requestsStyles.requestsFeed}>
        <View style={globalStyles.viewFlex1}>
          <View style={requestsStyles.requestsView}>
            <View style={requestsStyles.requestsView2}>
              <NameByOwner id={request.item.owner} navigation={navigation} />
              {request.item.petNumber > 1 ? (
                <Text style={requestsStyles.requestsTxt}>
                  {"Alojamiento para " + request.item.petNumber + " perros"}
                </Text>
              ) : (
                <Text>
                  {"Alojamiento para " + request.item.petNumber + " perro"}
                </Text>
              )}
              <Text style={statusC}>{status} </Text>
            </View>
            <View style={requestsStyles.requestsView2}>
              <Text style={requestsStyles.requestsTxt2}>
                {(request.item.price * 0.8).toFixed(2)} €
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function NameByOwner(ownerId) {
  const { id, navigation } = ownerId;
  let wauwerName;
  db.ref("wauwers")
    .orderByChild("id")
    .equalTo(id)
    .on("child_added", (snap) => {
      wauwerName = snap.val().name + " " + snap.val().surname;
    });

  return (
    <View>
      <Text>{"Solicitud de " + wauwerName}</Text>
    </View>
  );
}

export default withNavigation(ProfileRequestToMyRequestList);
