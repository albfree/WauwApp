import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Picker,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from "react-native";
import { SearchBar, Avatar, Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { db } from "../population/config";
import Loading from "../Loading";
import { email } from "../account/QueriesProfile";
import { withNavigation } from "react-navigation";
import _ from "lodash";
import { globalStyles } from "../styles/global";


function SearchWalks(props) {
  const { navigation } = props;
  const { search, setSearch } = useState("");
  const [loading, setLoading] = useState(true);
  const [reloadData, setReloadData] = useState(false);
  const [data, setData] = useState([]);
  const [newInterval, setNewInterval] = useState(null);
  const [availabilities, setAvailabilities] = useState([]);
  const [newAvailability, setNewAvailability] = useState([]);


  let petNumber;
  let id;

  
  useEffect(() => {
    db.ref("availabilities-wauwers")
    .on("value", snap => {
      const allData = [];
      const allAvailability = [];
      snap.forEach(child => {
        if (child.val().wauwer.id != id) {
          allData.push(child.val().wauwer);
          snap.forEach(child => {
            if(!allAvailability.includes(child.val().availabilities)){
              allAvailability.push(child.val().availabilities)
            }
          });
        //wauwerData.push(child.val().availability);
        //allData.push(wauwerData);
      };
      setData(allData);
      setAvailabilities(allAvailability);
    });
    setReloadData(false);
    setLoading(false);
  }, [reloadData]); //esto es el disparador del useEffect
  });
  const funct = value => {
    setNewAvailability(value.id);
    setNewInterval(
      value.day + " " + value.startTime + "h - " + value.endDate + "h"
    );
  };

  console.log(availabilities);


  return (
    <SafeAreaView style={globalStyles.safeMyRequestsArea}>
      {/* <SearchBar
        placeholder="Introduce una hora de inicio"
        onChangeText={e => setSearch(e)}
        value={search}
        containerStyle={styles.searchBar}
      /> */}
       <Text style={globalStyles.walkTxt2}>
          {"¿Cuándo quiere que pasee a su perro?"}
        </Text>

        <Picker
          selectedValue={newInterval}
          onValueChange={value => funct(value)}
        >
          {availabilities.map(item => (
            <Picker.Item
              label={
                item.day + " " + item.startTime + "h - " + item.endDate + "h"
              }
              value={item}
            />
          ))}
        </Picker>
      <ScrollView>
        <Loading isVisible={loading} text={"Un momento..."} />
        {data ? (
          <FlatList
            data={data}
            renderItem={wauwerData => (
              <Wauwer
                wauwerData={wauwerData}
                petNumber={petNumber}
                navigation={navigation}
              />
            )}
            keyExtractor={wauwerData => {
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
        wauwer: wauwerData.item //TODO: MODIFICAR LA REDIRECCIÓN
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
            <View style={globalStyles.searchAccommodationsColumn2}>
              <Text style={globalStyles.myRequestsNum}>
                {" "}
                {/* {wauwerData.item[1].day}{" "} */}
              </Text>
              <Text style={globalStyles.myRequestsStatus}>
                {" "}
                {/* {wauwerData.item[1].startTime} - {wauwerData.item[1].endDate}{" "} */}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default withNavigation(SearchWalks);
