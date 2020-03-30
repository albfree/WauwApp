import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { db } from "../../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../../account/QueriesProfile";
import { globalStyles } from "../../styles/global";
import { FontAwesome } from "@expo/vector-icons";
import { Icon } from "react-native-elements";

function ProfileMyRequests(props) {
  const { navigation } = props;

  const [loading, setLoading] = useState(true);
  const [requestsList, setRequestList] = useState([]);
  const [reloadData, setReloadData] = useState(false);

  let wauwerId;
  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .on("child_added", snap => {
      wauwerId = snap.val().id;
    });

  console.log("wauwerId", wauwerId);

  useEffect(() => {
    db.ref("requests")
      .orderByChild("owner")
      .equalTo(wauwerId)
      .on("value", snap => {
        const requests1 = [];
        snap.forEach(child => {
          requests1.push(child.val());
        });
        setRequestList(requests1);
      });
    setReloadData(false);
    setLoading(false);
  }, []);

  console.log(setRequestList);

  return (
    <SafeAreaView style={globalStyles.safeMyRequestsArea}>
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
        {requestsList ? (
          <FlatList
            data={requestsList}
            style={globalStyles.myRequestsFeed}
            renderItem={request => (
              <Request request={request} navigation={navigation} />
            )}
            keyExtractor={request => request.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View>
            <Text> No hay solicitudes </Text>
          </View>
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

  if (request.item.type == "sitter") {
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
  } else if (request.item.type == "walk") {
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
    color: color
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ShowRequest", {
          request: request.item
        })
      }
    >
      <View style={globalStyles.myRequestsFeedItem}>
        <View style={globalStyles.viewFlex1}>
          <View style={globalStyles.myRequestsRow}>
            <View style={globalStyles.myRequestsColumn1}>
              <Text style={globalStyles.myRequestsNum}>
                Número de mascotas: {request.item.petNumber}
              </Text>
              <Text style={tarjeta}>{status} </Text>
              <Text style={globalStyles.myRequestsPrice}>
                {request.item.price} €
              </Text>
            </View>
            <View style={globalStyles.myRequestsColumn2}>
              {icon}
              <Text style={globalStyles.myRequestsType}>{tipo}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default withNavigation(ProfileMyRequests);
