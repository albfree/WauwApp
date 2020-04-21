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
import { Icon } from "react-native-elements";
import BlankView from "../BlankView";
import { requestsStyles } from "../../styles/requestsStyle";
import { bannedAssertion } from "../../account/bannedAssertion";

function ProfileMyRequests(props) {
  const { navigation } = props;

  const [loading, setLoading] = useState(true);
  const [requestsList, setRequestList] = useState([]);
  const [reloadData, setReloadData] = useState(false);

  var wauwer = bannedAssertion();
  var wauwerId = wauwer.id;

  useEffect(() => {
    db.ref("requests")
      .orderByChild("owner")
      .equalTo(wauwerId)
      .once("value", (snap) => {
        const requests1 = [];
        snap.forEach((child) => {
          requests1.push(child.val());
        });
        setRequestList(requests1);
      });
    setReloadData(false);
    setLoading(false);
  }, []);

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <TouchableOpacity
        style={globalStyles.drawerMenuView}
        onPress={navigation.openDrawer}
      >
        <View>
          <View style={globalStyles.drawerTitle}>
            <Text style={globalStyles.drawerTxt}>Mis Solicitudes</Text>
          </View>
          <View style={globalStyles.drawerIcon}>
            <FontAwesome name="bars" size={24} color="#161924" />
          </View>
        </View>
      </TouchableOpacity>
      <ScrollView>
        <Text style={requestsStyles.requestsTxt16}>
          Listado de las solicitudes realizadas
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
          <BlankView text={"No tiene solicitudes realizadas"} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Request(requestIn) {
  const { request, navigation } = requestIn;
  let icon;
  let tipo = "";
  let status = "";
  let color = "white";

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

  if (request.item.type === "sitter") {
    tipo = "Alojamiento";
    icon = (
      <Icon
        type="font-awesome"
        name="bed"
        size={30}
        color="black"
        marginLeft={20}
      />
    );
  } else if (request.item.type === "walk") {
    tipo = "Paseo";
    icon = (
      <Icon
        type="material-community"
        name="dog-service"
        size={30}
        color="black"
        marginLeft={20}
      />
    );
  }

  const tarjeta = {
    fontSize: 13,
    marginTop: 4,
    color,
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ShowRequest", {
          request: request.item,
        })
      }
    >
      <View style={requestsStyles.requestsFeed}>
        <View style={globalStyles.viewFlex1}>
          <View style={requestsStyles.requestsView}>
            <View style={requestsStyles.requestsView2}>
              <Text style={requestsStyles.requestsTxt}>
                Número de mascotas: {request.item.petNumber}
              </Text>
              <Text style={tarjeta}>{status} </Text>
              <Text style={requestsStyles.requestsTxt2}>
                {request.item.price} €
              </Text>
            </View>
            <View style={requestsStyles.requestsView3}>
              {icon}
              <Text style={requestsStyles.requestsTxt3}>{tipo}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default withNavigation(ProfileMyRequests);
