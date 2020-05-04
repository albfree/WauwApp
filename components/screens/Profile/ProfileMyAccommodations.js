import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { Button } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { db } from "../../population/config.js";
import { withNavigation } from "react-navigation";
import { globalStyles } from "../../styles/global";
import { FontAwesome } from "@expo/vector-icons";
import BlankView from "../BlankView";
import { requestsStyles } from "../../styles/requestsStyle";
import { accommodationStyles } from "../../styles/accommodationStyle";

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

function ProfileMyAccommodations(props) {
  const { navigation, screenProps } = props;
  const { userInfo } = screenProps;

  const [accommodationsList, setAccommodationsList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  useEffect(() => {
    db.ref("accommodation")
      .orderByChild("worker")
      .equalTo(userInfo.id)
      .on("value", (snap) => {
        const accommodations = [];
        snap.forEach((child) => {
          var endTime = new Date(child.val().endTime);
          if (endTime > new Date()) {
            accommodations.push(child.val());
          }
        });
        setAccommodationsList(accommodations);
      });
  }, [refreshing]);

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={requestsStyles.requestsTxt16}>
          Listado de sus alojamientos
        </Text>
        {accommodationsList.length > 0 ? (
          <View>
            <FlatList
              data={accommodationsList}
              renderItem={(accommodation) => (
                <Accommodation
                  accommodation={accommodation}
                  navigation={navigation}
                  userInfo={userInfo}
                />
              )}
              keyExtractor={(accommodation) => accommodation.id}
              showsVerticalScrollIndicator={false}
            />
            <Text style={globalStyles.blankTxt2}>
              * Deslice hacia abajo para refrescar *
            </Text>
          </View>
        ) : (
          <BlankView text={"No tiene alojamientos habilitados"} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Accommodation(accomodationIn) {
  const { accommodation, navigation, userInfo } = accomodationIn;
  let status = "";
  let color = "rgba(0,128,0,0.6)";
  let editable = false;
  var startTime = new Date(accommodation.item.startTime);

  if (startTime < new Date()) {
    status = "Dentro de Fecha";
  } else {
    switch (accommodation.item.isCanceled) {
      case true:
        status = "Cancelado";
        color = "rgba(255,0,0,0.6)";
        break;
      case false:
        status = "Esperando solicitudes";
        color = "rgba(255,128,0,0.6)";
        editable = true;
        break;
      default:
        break;
    }
  }

  const tarjeta = {
    color,
    fontSize: 13,
    marginBottom: 5,
  };

  const onPressRequests = () => {
    navigation.navigate("RequestToMyAccommodationList", {
      accommodation: accommodation.item,
      userInfo: userInfo,
    });
  };

  var x = new Date(accommodation.item.startTime);
  var y = new Date(accommodation.item.endTime);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("EditDeleteAccommodation", {
          accommodation: accommodation.item,
          editable,
        })
      }
    >
      <View style={requestsStyles.requestsFeed}>
        <View style={globalStyles.viewFlex1}>
          <View style={requestsStyles.requestsView}>
            <View style={requestsStyles.requestsView2}>
              <Text style={requestsStyles.requestsTxt2}>
                {accommodation.item.salary} €
              </Text>
              <Text style={requestsStyles.requestsTxt2}>
                Del{" "}
                {x.getDate() +
                  "/" +
                  parseInt(x.getMonth() + 1, 10) +
                  "/" +
                  x.getFullYear()}
              </Text>
              <Text style={requestsStyles.requestsTxt2}>
                al{" "}
                {y.getDate() +
                  "/" +
                  parseInt(y.getMonth() + 1, 10) +
                  "/" +
                  y.getFullYear()}
              </Text>
              <Text style={tarjeta}>{status}</Text>
            </View>
            <View style={requestsStyles.requestsView2}>
              <Button
                title="Solicitudes"
                onPress={onPressRequests}
                buttonStyle={accommodationStyles.accommodationBtn}
                containerStyle={accommodationStyles.accommodationBtnContainer5}
                titleStyle={requestsStyles.requestsBtnTittle}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default withNavigation(ProfileMyAccommodations);
