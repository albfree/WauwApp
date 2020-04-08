import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { db } from "../population/config";
import Loading from "../Loading";
import { email } from "../account/QueriesProfile";
import { withNavigation } from "react-navigation";
import _ from "lodash";
import { globalStyles } from "../styles/global";

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
    const query = db.ref("availabilities-wauwers");
    query.on("value", (snap) => {
      const allData = [];
      snap.forEach((child) => {
        if (child.val().wauwer.id != id) {
          console.log("entra");
          for (var availability in child.val().availabilities) {
            console.log(availability);
            console.log(interval.id);
            if (availability == interval.id) {
              console.log("ududjjdj");
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
    <SafeAreaView style={globalStyles.safeMyRequestsArea}>
      <ScrollView>
        <Text style={globalStyles.walkTxt2}>
          {"¿Cuándo quiere que pasee a su perro?"}
        </Text>

        <Loading isVisible={loading} text={"Un momento..."} />
        {data ? (
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
              wauwerData;
            }}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View>
            <Text> No hay usuarios </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Wauwer(props) {
  const { wauwerData, petNumber, navigation } = props;

  const checkHasPets = () => {
    if (petNumber > 0) {
      navigation.navigate("CreateRequestWalk", {
        wauwer: wauwerData.item, //TODO: MODIFICAR LA REDIRECCIÓN
      });
    } else {
      Alert.alert("¡No tienes mascotas que pasear!", "");
    }
  };

  return (
    <TouchableOpacity onPress={checkHasPets}>
      <View style={globalStyles.myRequestsFeedItem}>
        <View style={globalStyles.viewFlex1}>
          <View style={globalStyles.myRequestsRow}>
            <View style={globalStyles.searchAccommodationsColumn1}>
              <Avatar
                rounded
                size="large"
                source={{ uri: wauwerData.item.photo }}
              />
              <Text style={globalStyles.myRequestsPrice}>
                {" "}
                {wauwerData.item.name}{" "}
              </Text>
            </View>
            <View style={globalStyles.searchAccommodationsColumn1}>
              <View style={globalStyles.myRequestsRow}>
                <Text style={globalStyles.myRequestsNum}>
                  {wauwerData.item.avgScore}
                </Text>
                <Icon
                  type="material-community"
                  name="star"
                  size={20}
                  color="yellow"
                />
              </View>
              <Text style={globalStyles.myRequestsPrice}>
                {" "}
                {wauwerData.item.price} €
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default withNavigation(SearchWalks);
