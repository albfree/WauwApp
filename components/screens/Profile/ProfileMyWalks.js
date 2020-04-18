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
import { requestsStyles } from "../../styles/requestsStyle";
import { BannedAssertion } from "../../account/BannedAssertion";

function ProfileMyWalks(props) {
  const { navigation } = props;

  const [loading, setLoading] = useState(true);
  const [list, setlist] = useState([]);
  const [requestsList, setRequestList] = useState([]);
  const [reloadData, setReloadData] = useState(false);

  var wauwer = BannedAssertion();
  var wauwerId = wauwer.id;
  
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
        <Text style={requestsStyles.requestsTxt16}>Listado de sus Paseos</Text>
        {requestsList.length > 0 ? (
          <FlatList
            data={requestsList}
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
    color,
    fontSize: 13,
    marginTop: 4,
  };

  const payC = {
    color: color2,
    fontSize: 13,
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("ShowWalk", {
          request: request.item,
        })
      }
    >
      <View style={requestsStyles.requestsFeed}>
        <View style={globalStyles.viewFlex1}>
          <View style={requestsStyles.requestsView}>
            <View style={requestsStyles.requestsView2}>
              <Text style={requestsStyles.requestsTxt}>
                Número de mascotas: {request.item.petNumber}
              </Text>
              <Text style={statusC}>{status} </Text>
              <Text style={requestsStyles.requestsTxt2}>
                {request.item.price} € <Text style={payC}>{pay}</Text>
              </Text>
            </View>
            <View style={requestsStyles.requestsView3}>
              {icon}
              <Text style={requestsStyles.requestsTxt3}>{tipo}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default withNavigation(ProfileMyWalks);
