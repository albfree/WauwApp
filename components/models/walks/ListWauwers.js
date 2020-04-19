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
import { Card, Image } from "react-native-elements";

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
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: wauwer.wauwer.photo }}
            />
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
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  column: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  column_left: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: 20,
  },
  column_right: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    padding: 20,
  },
  tarjeta: {
    elevation: 1,
    //backgroundColor: "#123",
    borderRadius: 25,
    borderStyle: "solid",
  },
  separacion: {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
  },
});
