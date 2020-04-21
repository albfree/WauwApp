import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { Avatar, Input, Button, Icon, Rating } from "react-native-elements";
import { db } from "../population/config.js";
import { withNavigation } from "react-navigation";
import { globalStyles } from "../styles/global";
import { ScrollView } from "react-native-gesture-handler";
import { email } from "../account/QueriesProfile";
import BlankView2 from "./BlankView2";
import { searchAccommodationStyles } from "../styles/searchAccommodationStyle";
import { searchWalksStyles } from "../styles/searchWalkStyle.js";
import Toast from "react-native-easy-toast";

function ListAccommodations(props) {
  const { navigation } = props;
  const [accommodationsList, setAccommodationList] = useState([]);
  const [accommodationsList2, setAccommodationList2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minRating, setMinRating] = useState(null);
  const filter = navigation.state.params.formData.startTime;
  const toastRef = useRef();
  let petNumber;
  let id;
  let longitudeUser;
  let latitudeUser;
  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .once("child_added", (snap) => {
      petNumber = snap.val().petNumber;
      id = snap.val().id;
      longitudeUser = snap.val().location.longitude;
      latitudeUser = snap.val().location.latitude;
    });

  useEffect(() => {
    db.ref("accommodation")
      .orderByChild("isCanceled")
      .equalTo(false)
      .once("value", (snap) => {
        const accommodations = [];
        const accommodations2 = [];
        snap.forEach((child) => {
          if (child.val().worker !== id) {
            const myAccomodation = [];
            var endTime = new Date(child.val().endTime);
            var startTime = new Date(child.val().startTime);
            let score;
            let longitudPaseador;
            let latitudePaseador;
            db.ref("wauwers/" + child.val().worker).once("value", (snap) => {
              score = snap.val().avgScore;
              longitudPaseador = snap.val().location.longitude;
              latitudePaseador = snap.val().location.latitude;
            });

            if (
              endTime > new Date() &&
              filter - startTime >= -86400000 &&
              filter - endTime <= 86400000
            ) {
              myAccomodation.push(child.val());
              myAccomodation.push(score);
              const arrayLocation = [];
              arrayLocation.push(latitudePaseador);
              arrayLocation.push(longitudPaseador);
              myAccomodation.push(arrayLocation);
              accommodations.push(myAccomodation);
            } else {
              myAccomodation.push(child.val());
              myAccomodation.push(score);
              const arrayLocation = [];
              arrayLocation.push(latitudePaseador);
              arrayLocation.push(longitudPaseador);
              myAccomodation.push(arrayLocation);
              accommodations2.push(myAccomodation);
            }
          }
        });

        const appToYou = [];
        accommodations.map((array) => {
          const krom = [];
          krom.push(array[0]);
          krom.push(array[1]);
          const distancia = calculaDistancia(
            latitudeUser,
            longitudeUser,
            array[2][0],
            array[2][1]
          );
          krom.push(distancia);
          appToYou.push(krom);
        });

        appToYou.sort((a, b) => {
          return a[2] - b[2];
        });

        const appToYou2 = [];
        accommodations2.map((array) => {
          const krom = [];
          krom.push(array[0]);
          krom.push(array[1]);
          const distancia = calculaDistancia(
            latitudeUser,
            longitudeUser,
            array[2][0],
            array[2][1]
          );
          krom.push(distancia);
          appToYou2.push(krom);
        });

        appToYou2.sort((a, b) => {
          return a[2] - b[2];
        });

        setAccommodationList(appToYou);
        setAccommodationList2(appToYou2);
      });
    setReloadData(false);
  }, [reloadData]);

  const calculaDistancia = (lat1, lon1, lat2, lon2) => {
    const rad = function (x) {
      return (x * Math.PI) / 180;
    };
    var R = 6378.137;
    var dLat = rad(lat2 - lat1);
    var dLong = rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(lat1)) *
        Math.cos(rad(lat2)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d.toFixed(2);
  };

  const filterList = () => {
    let accomodations = [];
    accommodationsList.map((acc) => {
      if (
        (maxPrice !== null && acc[0].price <= maxPrice) ||
        (minRating !== null && acc[1] >= minRating)
      ) {
        accomodations.push(acc);
      }
    });
    setAccommodationList(accomodations);
    toastRef.current.show("Filtro aplicado");
  };

  const applyFilter = () => {
    if (
      (maxPrice === null && minRating === null) ||
      isNaN(maxPrice) ||
      isNaN(minRating)
    ) {
      toastRef.current.show("Filtros de búsqueda inválidos");
      setMaxPrice(null);
      setMinRating(null);
    } else {
      if (!Number.isInteger(maxPrice * 100) || maxPrice <= 0) {
        toastRef.current.show("Precio positivo con máximo 2 decimales");
        setMaxPrice(null);
        setMinRating(null);
      } else if (!Number.isInteger(minRating * 10)) {
        toastRef.current.show("Valoración entera o con 1 decimal");
        setMaxPrice(null);
        setMinRating(null);
      } else {
        if (minRating < 0 || minRating > 5) {
          toastRef.current.show("Valoración entre 0 y 5");
          setMaxPrice(null);
          setMinRating(null);
        } else {
          filterList();
        }
      }
    }
  };

  const clearFilter = () => {
    setMaxPrice(null);
    setMinRating(null);
    setReloadData(true);
  };

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView>
        <Input
          inputContainerStyle={searchWalksStyles.searchWalksView3}
          inputStyle={searchWalksStyles.searchWalkTxt8}
          keyboardType="numeric"
          placeholder="Precio máximo del alojamiento"
          maxLength={6}
          onChange={(val) => {
            if (val.nativeEvent.text !== "") {
              setMaxPrice(val.nativeEvent.text);
            } else {
              setMaxPrice(null);
            }
          }}
          defaultValue={maxPrice}
        />
        <Input
          inputContainerStyle={searchWalksStyles.searchWalksView3}
          inputStyle={searchWalksStyles.searchWalkTxt9}
          keyboardType="numeric"
          placeholder="Valoración mínima"
          maxLength={3}
          onChange={(val) => {
            if (val.nativeEvent.text !== "") {
              setMinRating(val.nativeEvent.text);
            } else {
              setMinRating(null);
            }
          }}
          defaultValue={minRating}
        />
        <View style={searchWalksStyles.searchWalksView4}>
          <Button
            buttonStyle={searchWalksStyles.searchWalksBtn2}
            containerStyle={searchWalksStyles.searchWalksBtnContainer2}
            title="Filtrar"
            onPress={applyFilter}
            icon={
              <Icon
                type="material-community"
                name="filter"
                size={20}
                color="white"
                marginLeft={"10%"}
              />
            }
            titleStyle={searchWalksStyles.searchWalkTxt11}
          />
          <Button
            buttonStyle={searchWalksStyles.searchWalksBtn3}
            containerStyle={searchWalksStyles.searchWalksBtnContainer3}
            title="Limpiar filtro"
            onPress={clearFilter}
            icon={
              <Icon
                type="material-community"
                name="filter-remove"
                size={20}
                color="white"
                marginRight={10}
              />
            }
            titleStyle={searchWalksStyles.searchWalktxt10}
          />
        </View>
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
      <Toast ref={toastRef} position="center" opacity={0.8} />
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
            key={accommodation.index}
            accommodation={accommodation}
            petNumber={petNumber}
            myId={id}
            navigation={navigation}
          />
        )}
        keyExtractor={(accommodation) => accommodation.id}
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
            key={accommodation.index}
            accommodation={accommodation}
            petNumber={petNumber}
            myId={id}
            navigation={navigation}
          />
        )}
        keyExtractor={(accommodation) => accommodation.id}
      />
    </SafeAreaView>
  );
}

function Accommodation(props) {
  const { accommodation, navigation, petNumber, myId } = props;
  const dis = accommodation.item[2];

  let worker;
  db.ref("wauwers")
    .child(accommodation.item[0].worker)
    .once("value", (snap) => {
      worker = snap.val();
    });

  const checkHasPets = () => {
    if (petNumber > 0) {
      navigation.navigate("FormRequestAccommodation", {
        accommodation: accommodation.item[0],
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

  var x = new Date(accommodation.item[0].startTime);
  var y = new Date(accommodation.item[0].endTime);

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
                {accommodation.item[0].salary} €
              </Text>
              <Text style={searchAccommodationStyles.searchAccommodationTxt3}>
                Valoración
              </Text>

              <Rating imageSize={20} readonly startingValue={worker.avgScore} />
            </View>
            <View style={searchAccommodationStyles.searchAccommodationColumn3}>
              <Text style={searchAccommodationStyles.searchAccommodationTxt3}>
                Disponibilidad
              </Text>
              <Text style={searchAccommodationStyles.searchAccommodationTxt2}>
                {"Del " +
                  x.getDate() +
                  "/" +
                  parseInt(x.getMonth() + 1) +
                  "/" +
                  x.getFullYear()}
              </Text>
              <Text style={searchAccommodationStyles.searchAccommodationTxt2}>
                {"al " +
                  y.getDate() +
                  "/" +
                  parseInt(y.getMonth() + 1) +
                  "/" +
                  y.getFullYear()}
              </Text>
              <Text style={searchAccommodationStyles.searchAccommodationTxt2}>
                {dis} km
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default withNavigation(ListAccommodations);
