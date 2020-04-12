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

function ProfileRequestToMyRequestList(props) {
  const { navigation } = props;

  const [loading, setLoading] = useState(true);
  const [RequestsList, setRequestsList] = useState([]);
  const [reloadData, setReloadData] = useState(false);

  let wauwerId;
  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .on("child_added", (snap) => {
      wauwerId = snap.val().id;
    });

  useEffect(() => {
    db.ref("Request")
      .orderByChild("worker")
      .equalTo(wauwerId)
      .on("value", (snap) => {
        const Requests = [];
        snap.forEach((child) => {
          var endTime = new Date(child.val().endTime);
          if (endTime > new Date() || child.val().isFinished === false) {
            Requests.push(child.val());
          }
        });
        setRequestsList(Requests);
      });
    setReloadData(false);
    setLoading(false);
  }, [reloadData]);


  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <TouchableOpacity
        style={globalStyles.drawerMenuView}
        onPress={navigation.openDrawer}
      >
        <View>
          <View style={globalStyles.drawerTitle}>
            <Text style={globalStyles.drawerTxt}>Solicitudes a mi alojamiento</Text>
          </View>
          <View style={globalStyles.drawerIcon}>
            <FontAwesome name="bars" size={24} color="#161924" />
          </View>
        </View>
      </TouchableOpacity>
      <ScrollView>
        {RequestsList.length > 0 ? (
          <FlatList
            data={RequestsList}
            style={globalStyles.myRequestsFeed}
            renderItem={(Request) => (
              <Request
                Request={Request}
                navigation={navigation}
              />
            )}
            keyExtractor={(Request) => Request.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <BlankView text={"No tiene solicitudes para este alojamiento."} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Request(requestIn) {
  const { request, navigation } = requestIn;
  let status = "";
  let color = "rgba(0,128,0,0.6)";
  let toFinish = false;
  var startTime = new Date(request.item.startTime);

  const tarjeta = {
    fontSize: 13,
    marginTop: 4,
    color,
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("DisplayFinishRequest", {
          request: request.item,
          toFinish,
        })
      }
    >
      <View style={globalStyles.myRequestsFeedItem}>
        <View style={globalStyles.viewFlex1}>
          <View style={globalStyles.myRequestsRow}>
            <View style={globalStyles.myRequestsColumn1}>
              <Text style={globalStyles.myRequestsNum}>Solicitud</Text>
              <Text style={tarjeta}>{status}</Text>
            </View>
            <View style={globalStyles.myRequestsColumn2}>
              <Text style={globalStyles.myRequestsPrice}>
                {(request.item.price * 0.8).toFixed(2)} €
              </Text>
            </View>
            <View style={globalStyles.myRequestsColumn2}>
              <Text style={globalStyles.myRequestsPrice}>
                {request.item.owner}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default withNavigation(ProfileRequestToMyRequestList);
