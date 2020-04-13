import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { Image, Avatar } from "react-native-elements";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import { globalStyles } from "../styles/global";
import { ScrollView } from "react-native-gesture-handler";
import { email } from "../account/QueriesProfile";
import BlankView2 from "./BlankView2";
import { searchAccommodationStyles } from "../styles/searchAccommodationStyle";
import { searchWalksStyles } from "../styles/searchWalkStyle.js";

function ListAccommodations(props) {
  const { navigation } = props;
  const [accommodationsList, setAccommodationList] = useState([]);
  const [accommodationsList2, setAccommodationList2] = useState([]);
  const [loading, setLoading] = useState(false);
  const filter = navigation.state.params.formData.startTime;
  let petNumber;
  let id;
  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .on("child_added", (snap) => {
      petNumber = snap.val().petNumber;
      id = snap.val().id;
    });

  useEffect(() => {
    db.ref("accommodation")
      .orderByChild("isCanceled")
      .equalTo(false)
      .on("value", (snap) => {
        const accommodations = [];
        const accommodations2 = [];
        snap.forEach((child) => {
          if (child.val().worker != id) {
            var endTime = new Date(child.val().endTime);
            var startTime = new Date(child.val().startTime);

            if (
              endTime > new Date() &&
              filter - startTime >= -86400000 &&
              filter - endTime <= 86400000
            ) {
              accommodations.push(child.val());
            } else {
              accommodations2.push(child.val());
            }
          }
        });
        setAccommodationList(accommodations);
        setAccommodationList2(accommodations2);
      });
  }, []);

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView>
        {accommodationsList.length > 0 ? (
          <List1
            accommodationsList={accommodationsList}
            petNumber={petNumber}
            myId={id}
            navigation={navigation}
          />
        ) : (
          <List2
            accommodationsList={accommodationsList2}
            petNumber={petNumber}
            myId={id}
            navigation={navigation}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function List1(props) {
  const { accommodationsList, navigation, petNumber, id } = props;
  return (
    <SafeAreaView>
      <Text style={searchAccommodationStyles.searchAccommodationTxt}>
        {"Escoja al cuidador que desee"}
      </Text>
      <FlatList
        data={accommodationsList}
        renderItem={(accommodation) => (
          <Accommodation
            accommodation={accommodation}
            petNumber={petNumber}
            myId={id}
            navigation={navigation}
          />
        )}
        keyExtractor={(accommodation) => accommodation.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

function List2(props) {
  const { accommodationsList, navigation, petNumber, id } = props;
  return (
    <SafeAreaView>
      <BlankView2
        text={"No hay alojamientos disponibles para la fecha seleccionada"}
      />

      <Text style={searchAccommodationStyles.searchAccommodationTxt}>
        {"Puede que le interesen..."}
      </Text>

      <FlatList
        data={accommodationsList}
        renderItem={(accommodation) => (
          <Accommodation
            accommodation={accommodation}
            petNumber={petNumber}
            myId={id}
            navigation={navigation}
          />
        )}
        keyExtractor={(accommodation) => accommodation.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

function Accommodation(props) {
  const { accommodation, navigation, petNumber, myId } = props;
  let worker;
  db.ref("wauwers")
    .child(accommodation.item.worker)
    .on("value", (snap) => {
      worker = snap.val();
    });

  const checkHasPets = () => {
    if (petNumber > 0) {
      navigation.navigate("FormRequestAccommodation", {
        accommodation: accommodation.item,
        id: myId,
      });
    } else {
      Alert.alert("¡No tienes mascotas que alojar!", "");
    }
  };

  const publicProf = () => {
    navigation.navigate("PublicProfile", {
      user: worker,
    });
  };

  return (
    <TouchableOpacity onPress={checkHasPets}>
      <View style={searchAccommodationStyles.searchAccommodationFeed}>
        <View style={globalStyles.viewFlex1}>
          <View style={searchAccommodationStyles.searchAccommodationView}>
            <TouchableOpacity onPress={publicProf}>
              <View style={searchAccommodationStyles.searchAccommodationColumn}>
                <Avatar rounded size="large" source={{ uri: worker.photo }} />
                <Text style={searchAccommodationStyles.searchAccommodationTxt2}>
                  {worker.name}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={searchAccommodationStyles.searchAccommodationColumn2}>
              <Text style={searchAccommodationStyles.searchAccommodationTxt3}>
                Precio
              </Text>
              <Text style={searchAccommodationStyles.searchAccommodationTxt2}>
                {accommodation.item.salary} €
              </Text>
            </View>
            <View style={searchAccommodationStyles.searchAccommodationColumn3}>
              <Text style={searchAccommodationStyles.searchAccommodationTxt3}>
                Disponibilidad
              </Text>
              <Text style={searchAccommodationStyles.searchAccommodationTxt2}>
                Del{" "}
                {accommodation.item.startTime
                  .toLocaleString("en-US")
                  .substring(0, 10)}
              </Text>
              <Text style={searchAccommodationStyles.searchAccommodationTxt2}>
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
