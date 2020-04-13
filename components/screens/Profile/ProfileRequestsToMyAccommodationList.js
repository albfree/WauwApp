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
import BlankView from "../BlankView";

function ProfileRequestToMyRequestList(props) {
  const { navigation } = props;

  const [loading, setLoading] = useState(true);
  const [requestsList, setRequestsList] = useState([]);
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
        const requests = [];
        snap.forEach((child) => {
          var endTime = new Date(child.val().endTime);
          if ((endTime > new Date() 
              || child.val().isFinished === false) 
              && child.val().accommodation === navigation.state.params.accommodation.id) {
            requests.push(child.val());
          }
        });
        setRequestsList(requests);
      });
    setReloadData(false);
    setLoading(false);
  }, [reloadData]);  

  return (
    <SafeAreaView>
      <ScrollView>
        {requestsList.length > 0 ? (
          <FlatList
            data={requestsList}
            style={globalStyles.myRequestsFeed}
            renderItem={(request) => (
              <Request
                request={request}
                navigation={navigation}
              />
            )}
            keyExtractor={(request) => request.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <BlankView text={"No tiene solicitudes para este alojamiento."} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Request(requestIn) {
  const { request, navigation } = requestIn;
  let toFinish = false;
  var endTime = new Date(request.item.endTime);

  if(endTime < new Date()){
    toFinish = true;
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("DisplayFinishRequests", {
          request: request.item,
          toFinish,
        })
      }
    >
      <View style={globalStyles.myRequestsFeedItem}>
        <View style={globalStyles.viewFlex1}>
          <View style={globalStyles.myRequestsRow}>
            <View style={globalStyles.myRequestsColumn1}>
              <NameByOwner id={request.item.owner} navigation={navigation}/>
              {request.item.petNumber >1 ?(
                <Text>{"Alojamiento para " + request.item.petNumber + " perros"}</Text>
                ):(
                <Text>{"Alojamiento para " + request.item.petNumber + " perro"}</Text>
                )}
              {toFinish === true ? (
                <View>
                  <Text style={{color:"#0a0"}}>Servicio cumplido</Text>
                </View>
              ):(<View></View>)}
            </View>
            <View >
              <Text style={globalStyles.myRequestsPrice}>
                {(request.item.price * 0.8).toFixed(2)} €
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function NameByOwner(ownerId){
  const { id, navigation } = ownerId;
  let wauwerName;
  db.ref("wauwers")
  .orderByChild("id")
  .equalTo(id)
  .on("child_added", (snap) => {
    wauwerName = snap.val().name + " " + snap.val().surname;
  });

  return(
    <View>
      <Text>
        {"Solicitud de " + wauwerName}
      </Text>
    </View>
  );
}

export default withNavigation(ProfileRequestToMyRequestList);
