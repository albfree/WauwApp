import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { db } from "../../population/config.js";
import { withNavigation } from "react-navigation";
import { email } from "../../account/QueriesProfile";
import { globalStyles } from "../../styles/global";
import { FontAwesome } from "@expo/vector-icons";
import { Icon } from "react-native-elements";
import BlankView from "../BlankView";

function ProfileMyWalks(props) {
  const { navigation } = props;

  const [loading, setLoading] = useState(true);
  const [list, setlist] = useState([]);
  const [requestsList, setRequestList] = useState([]);
  const [reloadData, setReloadData] = useState(false);

  let wauwerId;
  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .on("child_added", (snap) => {
      wauwerId = snap.val().id;
    });

  useEffect(() => {
    db.ref("requests")
      .orderByChild("worker")
      .equalTo(wauwerId)
      .on("value", (snap) => {
        const requests1 = [];
        snap.forEach((child) => {
          if (child.val().type === "walk") {
            requests1.push(child.val());
          }
        });
        setRequestList(requests1);
      });
    setReloadData(false);
    setLoading(false);
  }, []);

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <TouchableOpacity
        style={globalStyles.drawerMenuView}
        onPress={navigation.openDrawer}
      >
        <View>
          <View style={globalStyles.drawerTitle}>
            <Text style={globalStyles.drawerTxt}>Mis Paseos</Text>
          </View>
          <View style={globalStyles.drawerIcon}>
            <FontAwesome name="bars" size={24} color="#161924" />
          </View>
        </View>
      </TouchableOpacity>
      <ScrollView>
        {requestsList.length > 0 ? (
          <FlatList
            data={requestsList}
            style={globalStyles.myRequestsFeed}
            renderItem={(request) => (
              <Request request={request} navigation={navigation} />
            )}
            keyExtractor={(request) => request.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <BlankView text={"No tiene paseos habilitados"} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Request(requestIn) {
  const { request, navigation } = requestIn;
  let icon;
  let tipo = "";
  let status = "";
  let color2 = "white";
  let color = "white";
  let pay = "";

  if (request.item.isPayed) {
    pay = "Pagado Realizado";
    color2 = "rgba(0,128,0,0.6)";
  } else {
    pay = "Pendiente de Pago";
    color2 = "rgba(255,0,0,0.6)";
  }

  if (request.item.pending) {
    status = "Pendiente de aceptación";
    color = "rgba(255,128,0,0.6)";
  } else {
    switch (request.item.isCanceled) {
      case false:
        status = "Aceptada";
        color = "rgba(0,128,0,0.6)";
        break;
      case true:
        status = "Denegada";
        color = "rgba(255,0,0,0.6)";
        break;
      default:
        break;
    }
  }
  tipo = "Paseo";
  icon = (
    <Icon
      type="material-community"
      name="dog-service"
      size={30}
      color="black"
      marginLeft={20}
    />
  );

  const statusC = {
    fontSize: 13,
    marginTop: 4,
    color,
  };

  const payC = {
    fontSize: 13,
    color: color2,
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ShowWalk", {
          request: request.item,
        })
      }
    >
      <View style={globalStyles.myRequestsFeedItem}>
        <View style={globalStyles.viewFlex1}>
          <View style={globalStyles.myRequestsRow}>
            <View style={globalStyles.myRequestsColumn1}>
              <Text style={globalStyles.myRequestsNum}>
                Número de mascotas: {request.item.petNumber}
              </Text>
              <Text style={statusC}>{status} </Text>
              <Text style={globalStyles.myRequestsPrice}>
                {(request.item.price * 0.77).toFixed(2)}€ <Text style={payC}>{pay}</Text>
              </Text>
            </View>
            <View style={globalStyles.myRequestsColumn2}>
              {icon}
              <Text style={globalStyles.myRequestsType}>{tipo}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default withNavigation(ProfileMyWalks);
