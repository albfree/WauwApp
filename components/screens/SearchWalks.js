import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ScrollView,
} from "react-native";
import { SearchBar, Avatar, Icon } from "react-native-elements";
import BlankView from "./BlankView";
import { db } from "../population/config";
import Loading from "../Loading";
import { email } from "../account/QueriesProfile";
import { withNavigation } from "react-navigation";
import _ from "lodash";
import { globalStyles } from "../styles/global";
import { searchWalksStyles } from "../styles/searchWalkStyle";

function SearchWalks(props) {
  const { navigation } = props;
  const [loading, setLoading] = useState(true);
  const [reloadData, setReloadData] = useState(false);
  const [data, setData] = useState([]);

  const interval = navigation.state.params.interval;

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
    db.ref("availabilities-wauwers").on("value", (snap) => {
      const allData = [];
      snap.forEach((child) => {
        if (child.val().wauwer.id != id) {
          for (var availability in child.val().availabilities) {
            if (availability === interval.id) {
              allData.push(child.val().wauwer);
            }
          }
        }
      });
      setData(allData);
    });

    setReloadData(false);
    setLoading(false);
  }, [reloadData]); //esto es el disparador del useEffect

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView>
        <Text style={searchWalksStyles.searchWalkTxt}>
          {"Escoja al paseador que desee"}
        </Text>

        <Loading isVisible={loading} text={"Un momento..."} />
        {data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={(wauwerData) => (
              <Wauwer
                wauwerData={wauwerData}
                petNumber={petNumber}
                navigation={navigation}
              />
            )}
            keyExtractor={(wauwerData) => {
              wauwerData.id;
            }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <BlankView text={"No hay paseos disponibles"} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Wauwer(props) {
  const { wauwerData, petNumber, navigation } = props;
  const id = wauwerData.item.id;
  let user;
  db.ref("wauwers/" + id).once("value", (snap) => {
    user = snap.val();
  });

  const checkHasPets = () => {
    if (petNumber > 0) {
      navigation.navigate("CreateRequestWalk", {
        wauwer: user, //TODO: MODIFICAR LA REDIRECCIÓN
      });
    } else {
      Alert.alert("¡No tienes mascotas que pasear!", "");
    }
  };

  const publicProf = () => {
    navigation.navigate("PublicProfile", {
      user: user,
    });
  };

  return (
    <TouchableOpacity onPress={checkHasPets}>
      <View style={searchWalksStyles.searchWalkFeed}>
        <View style={globalStyles.viewFlex1}>
          <View style={searchWalksStyles.searchWalksView}>
            <TouchableOpacity onPress={publicProf}>
              <View style={searchWalksStyles.searchWalkColumn}>
                <Avatar rounded size="large" source={{ uri: user.photo }} />
              </View>
            </TouchableOpacity>
            <View style={searchWalksStyles.searchWalkColumn2}>
              <Text style={searchWalksStyles.searchWalkTxt2}>
                {" "}
                {user.name}{" "}
              </Text>
              <View style={searchWalksStyles.searchWalksView}>
                <Text style={searchWalksStyles.searchWalkTxt3}>
                  Valoración: {user.avgScore}
                </Text>
                <Icon
                  type="material-community"
                  name="star"
                  size={20}
                  color="yellow"
                />
              </View>
              <Text style={searchWalksStyles.searchWalkTxt2}>
                Precio / Hora: {user.price} €
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default withNavigation(SearchWalks);
