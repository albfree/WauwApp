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

export default function ListAccommodations(props) {
  const { accList } = props;
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
          {accList ? (
            <FlatList
              data={accList}
              renderItem={(accommodation) => (
                <Accommodation accommodation={accommodation.item} />
              )}
              keyExtractor={(accommodation) => {
                accommodation.id;
              }}
            />
          ) : (
            <View>
              <Text> No hay alojamientos disponibles </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

function Accommodation(accommodation) {
  return (
    <View style={styles.separacion}>
      <TouchableOpacity>
        <View style={styles.tarjeta}>
          <View style={styles.row}>
            <View style={styles.column_left}>
              <Text>
                {" "}
                Hora de inicio: {accommodation.accommodation.startTime} \n{" "}
              </Text>
              <Text> Hora de fin: {accommodation.accommodation.endTime} </Text>
            </View>
            <View style={styles.column_right}>
              <Text> {accommodation.accommodation.salary} €</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const c1 = "#fff";

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
    backgroundColor: c1,
    borderRadius: 25,
    borderStyle: "solid",
    elevation: 1,
  },
});
