import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import BlankView from "./BlankView";
import { globalStyles } from "../styles/global";
import Loading from "../Loading";
import { formSearchWalkStyles } from "../styles/formSearchWalksStyle";
import _ from "lodash";

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

function FormFilterByAvailability(props) {
  const { navigation, screenProps } = props;
  const { userInfo } = screenProps;
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [availabilities, setAvailabilities] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  useEffect(() => {
    setLoading(true);
    const query = db.ref("availabilities-wauwers");
    query.on("value", (snap) => {
      let allAvailability = [];
      const allIds = [];
      snap.forEach((child) => {
        if (child.key !== userInfo.id) {
          query
            .child(child.key)
            .child("availabilities")
            .once("value", (child) => {
              child.forEach((kid) => {
                if (!allIds.includes(kid.key)) {
                  allAvailability.push(kid.val().availability);
                  allIds.push(kid.key);
                }
              });
            });
        }
      });
      allAvailability.sort((a, b) => {
        return a.id > b.id;
      });
      setAvailabilities(allAvailability);
    });
    setLoading(false);
  }, [refreshing]);

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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
            <Text style={globalStyles.blankTxt2}>
              * Deslice hacia abajo para refrescar *
            </Text>
          </View>
        ) : (
          <View>
            <BlankView text={"No hay paseadores disponibles"} />
          </View>
        )}
      </ScrollView>
      <Loading isVisible={loading} text={"Un momento..."} />
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
