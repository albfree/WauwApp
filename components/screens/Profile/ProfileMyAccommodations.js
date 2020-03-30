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

function ProfileMyAccommodations(props) {
  const { navigation } = props;

  const [loading, setLoading] = useState(true);
  const [accommodationsList, setAccommodationsList] = useState([]);
  const [reloadData, setReloadData] = useState(false);

  let wauwerId;
  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .on("child_added", snap => {
      wauwerId = snap.val().id;
    });

  useEffect(() => {
    db.ref("accommodation")
      .orderByChild("worker")
      .equalTo(wauwerId)
      .on("value", snap => {
        const accommodations = [];
        snap.forEach(child => {
          var endTime = new Date(child.val().endTime);
          if (endTime > new Date()) {
            accommodations.push(child.val());
          }
        });
        setAccommodationsList(accommodations);
      });
    setReloadData(false);
    setLoading(false);
  }, [reloadData]);

  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <TouchableOpacity
        style={globalStyles.drawerMenuView}
        onPress={navigation.openDrawer}
      >
        <View>
          <View style={globalStyles.drawerTitle}>
            <Text style={globalStyles.drawerTxt}>Mis Alojamientos</Text>
          </View>
          <View style={globalStyles.drawerIcon}>
            <FontAwesome name="bars" size={24} color="#161924" />
          </View>
        </View>
      </TouchableOpacity>
      <ScrollView>
        {accommodationsList ? (
          <FlatList
            data={accommodationsList}
            style={globalStyles.myRequestsFeed}
            renderItem={accommodation => (
              <Accommodation
                accommodation={accommodation}
                navigation={navigation}
              />
            )}
            keyExtractor={accommodation => accommodation.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View>
            <Text> No hay alojamientos </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Accommodation(accomodationIn) {
  const { accommodation, navigation } = accomodationIn;
  let status = "";
  let color = "rgba(0,128,0,0.6)";
  let editable = false;
  var startTime = new Date(accommodation.item.startTime);

  if (startTime < new Date()) {
    status = "en curso";
  } else {
    switch (accommodation.item.isCanceled) {
      case true:
        status = "ocupado para la fecha establecida";
        color = "rgba(0,128,0,0.6)";
        break;
      case false:
        status = "esperando solicitudes";
        color = "rgba(255,128,0,0.6)";
        editable = true;
        break;
      default:
        break;
    }
  }

  const tarjeta = {
    fontSize: 13,
    marginTop: 4,
    color: color
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("EditDeleteAccommodation", {
          accommodation: accommodation.item,
          editable: editable
        })
      }
    >
      <View style={globalStyles.myRequestsFeedItem}>
        <View style={globalStyles.viewFlex1}>
          <View style={globalStyles.myRequestsRow}>
            <View style={globalStyles.myRequestsColumn1}>
              <Text style={globalStyles.myRequestsNum}>Alojamiento</Text>
              <Text style={tarjeta}>{status}</Text>
            </View>
            <View style={globalStyles.myRequestsColumn2}>
              <Text style={globalStyles.myRequestsPrice}>
                {(accommodation.item.salary * 0.8).toFixed(2)} €
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default withNavigation(ProfileMyAccommodations);
