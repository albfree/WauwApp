import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Avatar, Button, Icon, Input, Rating } from "react-native-elements";
import BlankView from "./BlankView";
import { db } from "../population/config";
import { withNavigation } from "react-navigation";
import _ from "lodash";
import { globalStyles } from "../styles/global";
import { searchWalksStyles } from "../styles/searchWalkStyle";
import Loading from "../Loading";
import Toast from "react-native-easy-toast";

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

function SearchWalks(props) {
  const { navigation, screenProps } = props;
  const { userInfo } = screenProps;
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [data, setData] = useState([]);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minRating, setMinRating] = useState(null);
  const toastRef = useRef();
  const [refreshing, setRefreshing] = useState(false);
  const interval = navigation.state.params.interval;

  let day;
  if (interval.day === "Sabado") {
    day = "Sabados";
  } else if (interval.day === "Domingo") {
    day = "Domingos";
  } else {
    day = interval.day;
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  useEffect(() => {
    db.ref("availabilities-wauwers").once("value", (snap) => {
      let allData = [];
      snap.forEach((child) => {
        if (child.key !== userInfo.id) {
          for (var availability in child.val().availabilities) {
            if (availability === interval.id) {
              const wData = [];
              wData.push(child.key);
              wData.push(interval.id);

              const precio = child
                .child("availabilities")
                .child(interval.id)
                .child("price")
                .val();

              let rating;
              let longitudPaseador;
              let latitudePaseador;
              db.ref("wauwers/" + child.key).once("value", (snap) => {
                rating = snap.val().avgScore;
                longitudPaseador = snap.val().location.longitude;
                latitudePaseador = snap.val().location.latitude;
              });
              const arrayLocation = [];
              arrayLocation.push(latitudePaseador);
              arrayLocation.push(longitudPaseador);
              wData.push(arrayLocation);
              allData.push(wData);
              if (
                (maxPrice !== null && precio > maxPrice) ||
                (minRating !== null && rating < minRating)
              ) {
                allData.pop();
              }
            }
          }
        }
      });
      const appToYou = [];
      allData.map((array) => {
        const krom = [];
        krom.push(array[0]);
        krom.push(array[1]);
        const distancia = calculaDistancia(
          userInfo.location.latitude,
          userInfo.location.longitude,
          array[2][0],
          array[2][1]
        );
        krom.push(distancia);
        appToYou.push(krom);
      });

      appToYou.sort((a, b) => {
        return a[2] - b[2];
      });

      setData(appToYou);
    });
    setIsVisibleLoading(false);
    setReloadData(false);
  }, [reloadData, refreshing]);

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

  const applyFilter = () => {
    setIsVisibleLoading(true);
    if (maxPrice !== null) {
      setMaxPrice(Math.round(maxPrice * 100) / 100);
    }
    if (minRating !== null) {
      setMinRating(Math.round(minRating * 10) / 10);
    }
    if (
      (maxPrice === null && minRating === null) ||
      isNaN(maxPrice) ||
      isNaN(minRating)
    ) {
      toastRef.current.show("Filtros de búsqueda inválidos");
      setMaxPrice(null);
      setMinRating(null);
    } else {
      if (
        maxPrice !== null &&
        (!Number.isInteger(Math.round(maxPrice * 1000000) / 10000) ||
          maxPrice < 5)
      ) {
        toastRef.current.show("Precio mínimo 5 con máximo 2 decimales");
        setMaxPrice(null);
        setMinRating(null);
      } else {
        if (
          minRating !== null &&
          !Number.isInteger(Math.round(minRating * 100) / 10)
        ) {
          toastRef.current.show("Valoración con máximo 1 decimal");
          setMaxPrice(null);
          setMinRating(null);
        } else if (minRating !== null && (minRating < 0 || minRating > 5)) {
          toastRef.current.show("Valoración entre 0 y 5");
          setMaxPrice(null);
          setMinRating(null);
        } else {
          setReloadData(true);
          toastRef.current.show("Filtro aplicado");
        }
      }
    }
    setIsVisibleLoading(false);
  };

  const clearFilter = () => {
    setIsVisibleLoading(true);
    setMaxPrice(null);
    setMinRating(null);
    setReloadData(true);
  };

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={searchWalksStyles.searchWalkTxt}>
          {"Escoja al paseador que desee\n\n"}
          {"para los " +
            day +
            " de " +
            interval.startTime +
            "h a " +
            interval.endDate +
            "h"}
        </Text>

        <Input
          inputContainerStyle={searchWalksStyles.searchWalksView3}
          inputStyle={searchWalksStyles.searchWalkTxt8}
          keyboardType="numeric"
          placeholder="Precio máximo del paseo"
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
          placeholder="Valoración mínima del paseador"
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
        {data.length > 0 ? (
          <View>
            <FlatList
              data={data}
              renderItem={(wauwerData) => (
                <Wauwer
                  wauwerData={wauwerData}
                  navigation={navigation}
                  interval={interval}
                />
              )}
              keyExtractor={(wauwerData) => wauwerData.id}
              showsVerticalScrollIndicator={false}
            />
            <Text style={globalStyles.blankTxt2}>
              * Deslice hacia abajo para refrescar *
            </Text>
          </View>
        ) : (
          <BlankView text={"No hay paseadores disponibles"} />
        )}
      </ScrollView>
      <Loading isVisible={isVisibleLoading} text={"Un momento..."} />
      <Toast ref={toastRef} position="center" opacity={0.8} />
    </SafeAreaView>
  );
}

function Wauwer(props) {
  const { wauwerData, navigation, interval } = props;
  const id = wauwerData.item[0];
  const dis = wauwerData.item[2];

  let user;
  db.ref("wauwers/" + id).once("value", (snap) => {
    user = snap.val();
  });

  let price;
  let salary;
  db.ref("availabilities-wauwers")
    .child(id)
    .child("availabilities")
    .child(wauwerData.item[1])
    .once("value", (snap) => {
      price = snap.val().price;
      salary = snap.val().myPrice;
    });

  const publicProf = () => {
    navigation.navigate("PublicProfile", { user: user });
  };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("CreateRequestWalk", {
          wauwer: user,
          price: price,
          interval: interval,
          salary: salary,
        })
      }
    >
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
              <Rating imageSize={20} readonly startingValue={user.avgScore} />

              <Text style={searchWalksStyles.searchWalkTxt2}>
                Precio / Hora: {price} €
              </Text>
              <Text style={searchWalksStyles.searchWalkTxt2}>{dis} km</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default withNavigation(SearchWalks);
