import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from "react-native";
import { SearchBar, Image } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { db } from "../population/config";
import Loading from "../Loading";
import { email } from "../account/QueriesProfile";
import { withNavigation } from "react-navigation";
import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

function SearchWalks(props) {
  const { navigation } = props;
  const { search, setSearch } = useState("");
  const [loading, setLoading] = useState(true);
  const [reloadData, setReloadData] = useState(false);
  const [data, setData] = useState([]);

  let petNumber;
  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .on("child_added", snap => {
      petNumber = snap.val().petNumber;
    });

  useEffect(() => {
    db.ref("availability-wauwers").on("value", snap => {
      const allData = [];
      snap.forEach(child => {
        const wauwerData = [];
        wauwerData.push(child.val().wauwer);
        wauwerData.push(child.val().availability);
        allData.push(wauwerData);
      });
      setData(allData);
    });
    setReloadData(false);
    setLoading(false);
  }, [reloadData]); //esto es el disparador del useEffect

  return (
    <SafeAreaView>
      <SearchBar
        placeholder="Introduce una hora de inicio"
        onChangeText={e => setSearch(e)}
        value={search}
        containerStyle={styles.searchBar}
      />
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
        wauwer: wauwerData.item[0] //TODO: MODIFICAR LA REDIRECCIÓN
      });
    } else {
      Alert.alert("¡No tienes mascotas que pasear!", "");
    }
  };

  return (
    <View style={styles.separacion}>
      <TouchableOpacity onPress={checkHasPets}>
        <View style={styles.tarjeta}>
          <View style={styles.row}>
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: wauwerData.item[0].photo }}
            />
            <View style={styles.column_left}>
              <Text> {wauwerData.item[0].name} </Text>
              <Text> {wauwerData.item[0].avgScore} </Text>
            </View>
            <View style={styles.column_left}>
              <Text> {wauwerData.item[1].day} </Text>
              <Text>
                {" "}
                {wauwerData.item[1].startTime} - {wauwerData.item[1].endDate}{" "}
              </Text>
            </View>
            <View style={styles.column_right}>
              <Text> {wauwerData.item[0].price} €</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default withNavigation(SearchWalks);

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10
  },
  column: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20
  },
  column_left: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 20
  },
  column_right: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    padding: 20
  },
  tarjeta: {
    elevation: 1,
    //backgroundColor: "#123",
    borderRadius: 25,
    borderStyle: "solid"
  },
  separacion: {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5
  },
  loading: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  searchBar: {
    marginBottom: 20
  }
});
