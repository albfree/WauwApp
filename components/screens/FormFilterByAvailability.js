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
import BlankView from "./BlankView";
import { globalStyles } from "../styles/global";
import Loading from "../Loading";
import { formSearchWalkStyles } from "../styles/formSearchWalksStyle";
import _ from "lodash";

function FormFilterByAvailability(props) {
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
        if (child.key !== id) {
          query
            .child(child.key)
            .child("availabilities")
            .on("value", (child) => {
              child.forEach((kid) => {
                if (!allIds.includes(kid.key)) {
                  allAvailability.push(kid.val().availability);
                  allIds.push(kid.key);
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
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView>
        <Loading isVisible={loading} text={"Un momento..."} />
        {availabilities.length > 0 ? (
          <View>
            <Text style={formSearchWalkStyles.formSearchWalkTxt}>
              {"Seleccione la fecha y hora para su paseo"}
            </Text>
            <FlatList
              data={availabilities}
              renderItem={(interval) => (
                <Availability interval={interval} navigation={navigation} />
              )}
              keyExtractor={(interval) => interval.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        ) : (
          <View>
            <BlankView text={"No hay paseadores disponibles"} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Availability(props) {
  const { interval, navigation } = props;

  return (
    <View style={globalStyles.viewFlex1}>
      <View style={formSearchWalkStyles.formSearchWalkView}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("SearchWalks", { interval: interval.item })
          }
        >
          <View style={formSearchWalkStyles.formSearchWalkFeed}>
            <View style={globalStyles.viewFlex1}>
              <Text style={formSearchWalkStyles.formSearchWalkTxt2}>
                {interval.item.day} {interval.item.startTime} {"h -"}{" "}
                {interval.item.endDate} {"h"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default withNavigation(FormFilterByAvailability);
