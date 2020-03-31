import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { Image, Avatar } from "react-native-elements";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import { globalStyles } from "../styles/global";
import { ScrollView } from "react-native-gesture-handler";

function ListAccommodations(props) {
  const { navigation } = props;
  const [accommodationsList, setAccommodationList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    db.ref("accommodation")
      .orderByChild("isCanceled")
      .equalTo(false)
      .on("value", snap => {
        const accommodations = [];
        snap.forEach(child => {
          var endTime = new Date(child.val().endTime);
          if (endTime > new Date()) {
            accommodations.push(child.val());
          }
        });
        setAccommodationList(accommodations);
      });
  }, []);

  return (
    <SafeAreaView style={globalStyles.safeMyRequestsArea}>
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

function Accommodation(props) {
  const { accommodation, navigation } = props;
  let worker;
  db.ref("wauwers")
    .child(accommodation.item.worker)
    .on("value", snap => {
      worker = snap.val();
    });

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("FormRequestAccommodation", {
          accommodation: accommodation.item
        })
      }
    >
      <View style={globalStyles.myRequestsFeedItem}>
        <View style={globalStyles.viewFlex1}>
          <View style={globalStyles.myRequestsRow}>
            <View style={globalStyles.searchAccommodationsColumn1}>
              <Avatar rounded size="large" source={{ uri: worker.photo }} />
              <Text style={globalStyles.myRequestsPrice}>
                Precio: {accommodation.item.salary} €
              </Text>
              <Text style={globalStyles.notificationsDescription}>
                {worker.description}
              </Text>
            </View>
            <View style={globalStyles.searchAccommodationsColumn2}>
              <Text style={globalStyles.notificationsNum}>Disponibilidad</Text>
              <Text style={globalStyles.myRequestsType}>
                Del{" "}
                {accommodation.item.startTime
                  .toLocaleString("en-US")
                  .substring(0, 10)}
              </Text>
              <Text style={globalStyles.myRequestsType}>
                al{" "}
                {accommodation.item.endTime
                  .toLocaleString("en-US")
                  .substring(0, 10)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default withNavigation(ListAccommodations);
