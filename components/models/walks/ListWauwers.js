import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Image } from "react-native-elements";

export default function ListWauwers(props) {
  const { wauwerList } = props;
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <View>
        <Text> Cargando... </Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView>
        <ScrollView>
          {wauwerList ? (
            <FlatList
              data={wauwerList}
              renderItem={(wauwer) => <Wauwer wauwer={wauwer.item} />}
              keyExtractor={(wauwer) => {
                wauwer.id;
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
}

function Wauwer(wauwer) {
  return (
    <View style={styles.separacion}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Wauwer", {
            wauwer: wauwer.wauwer,
          })
        }
      >
        <View style={styles.tarjeta}>
          <View style={styles.row}>
            <Image style={styles.v1} source={{ uri: wauwer.wauwer.photo }} />
            <View style={styles.column_left}>
              <Text> {wauwer.wauwer.name} </Text>
              <Text> {wauwer.wauwer.avgScore} </Text>
            </View>
            <View style={styles.column_right}>
              <Text> {wauwer.wauwer.price} €</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  column_left: {
    alignItems: "flex-start",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 20,
  },
  column_right: {
    alignItems: "flex-end",
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: 20,
  },
  row: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  separacion: {
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
  },
  tarjeta: {
    borderStyle: "solid",
    borderRadius: 25,
    elevation: 1,
  },
  v1: { height: 50, width: 50 },
});
