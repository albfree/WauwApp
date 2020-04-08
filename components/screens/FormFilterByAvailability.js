import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../account/QueriesProfile";

import { globalStyles } from "../styles/global";
import Loading from "../Loading";

import _ from "lodash";

function FormFilterByAvailability(props) {
  console.log(props);
  const { navigation } = props;

  const [loading, setLoading] = useState(true);
  const [reloadData, setReloadData] = useState(false);

  const [availabilities, setAvailabilities] = useState([]);

  let id;
  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .on("child_added", (snap) => {
      id = snap.val().id;
    });

  useEffect(() => {
    const query = db.ref("availabilities-wauwers");
    query.on("value", (snap) => {
      const allAvailability = [];
      const allIds = [];
      snap.forEach((child) => {
        if (child.val().wauwer.id != id) {
          query
            .child(child.val().wauwer.id)
            .child("availabilities")
            .on("value", (child) => {
              child.forEach((kid) => {
                if (!allIds.includes(kid.val().id)) {
                  allAvailability.push(kid.val());
                  allIds.push(kid.val().id);
                }
              });
            });
        }
      });
      setAvailabilities(allAvailability);
    });

    setReloadData(false);
    setLoading(false);
  }, [reloadData]);

  return (
    <SafeAreaView style={globalStyles.safeMyRequestsArea}>
      <ScrollView>
      <Text style={globalStyles.walkTxt2}>
          {"Seleccione la fecha y hora para su paseo"}
        </Text>
        <Loading isVisible={loading} text={"Un momento..."} />
        {availabilities ? (
          <FlatList
            data={availabilities}
            renderItem={(interval) => (
              <Availability interval={interval} navigation={navigation} />
            )}
            keyExtractor={(interval) => {
              interval;
            }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View>
            <Text> No hay paseadores disponibles </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Availability(props) {
  const { interval, navigation } = props;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("SearchWalks", { interval: interval.item })
      }
    >
      <View style={globalStyles.myRequestsFeedItem}>
        <View style={globalStyles.viewFlex1}>
          <View style={globalStyles.myRequestsRow}>
            <View style={globalStyles.searchAccommodationsColumn1}>
              <Text style={globalStyles.myRequestsPrice}>
                {interval.item.day} {interval.item.startTime} {"h - "}{" "}
                {interval.item.endDate} {"h"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default withNavigation(FormFilterByAvailability);
