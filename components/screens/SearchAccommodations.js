import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from "react-native";
import { Image, Avatar } from "react-native-elements";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import { globalStyles } from "../styles/global";
import { ScrollView } from "react-native-gesture-handler";
import { email } from "../account/QueriesProfile";

function ListAccommodations(props) {
  const { navigation } = props;
  const [accommodationsList, setAccommodationList] = useState([]);
  const [loading, setLoading] = useState(false);

  let petNumber;
  let id;
  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .on("child_added", snap => {
      petNumber = snap.val().petNumber;
      id = snap.val().id;
    });

  useEffect(() => {
    
    db.ref("accommodation")
      .orderByChild("isCanceled")
      .equalTo(false)
      .on("value", snap => {
        const accommodations = [];
        snap.forEach(child => {
          if (child.val().worker != id) {
            var endTime = new Date(child.val().endTime);
            if (endTime > new Date()) {
              accommodations.push(child.val());
            }
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
                petNumber={petNumber}
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
  const { accommodation, navigation, petNumber } = props;
  let worker;
  db.ref("wauwers")
    .child(accommodation.item.worker)
    .on("value", snap => {
      worker = snap.val();
    });

  const checkHasPets = () => {
    if (petNumber > 0) {
      navigation.navigate("FormRequestAccommodation", {
        accommodation: accommodation.item
      });
    } else {
      Alert.alert("¡No tienes mascotas que alojar!", "");
    }
  };

  return (
    <TouchableOpacity onPress={checkHasPets}>
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
