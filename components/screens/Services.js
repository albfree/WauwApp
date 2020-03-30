import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { globalStyles } from "../styles/global";

function Services(props) {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.column}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SearchWalks")}
            activeOpacity={0.5}
          >
            <Image
              source={require("../../assets/images/search-walks.png")}
              style={styles.ImageIconStyle}
            />
          </TouchableOpacity>

          <Button
            buttonStyle={globalStyles.btnStyle}
            titleStyle={globalStyles.btnTextStyle}
            title="Buscar Paseos"
            onPress={() => navigation.navigate("SearchWalks")}
          />
        </View>
        <View style={styles.column}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SearchAccommodations")}
            activeOpacity={0.5}
          >
            <Image
              source={require("../../assets/images/search-accommodations.png")}
              style={styles.ImageIconStyle}
            />
          </TouchableOpacity>
          <Button
            buttonStyle={globalStyles.btnStyle}
            titleStyle={globalStyles.btnTextStyle}
            title="Buscar alojamientos"
            onPress={() => navigation.navigate("SearchAccommodations")}
          />
        </View>
      </View>

      <View style={styles.row}>
        {/* <View style={styles.column}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ChangeAvailability")}
            activeOpacity={0.5}
          >
            <Image
              source={require("../../assets/images/create-walk.png")}
              style={styles.ImageIconStyle}
            />
          </TouchableOpacity>
          <Button
            buttonStyle={globalStyles.btnStyle}
            titleStyle={globalStyles.btnTextStyle}
            title="Cambiar disponibilidad"
            onPress={() => navigation.navigate("ChangeAvailability")}
          />
        </View> */}
        <View style={styles.column}>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateAccommodation")}
            activeOpacity={0.5}
          >
            <Image
              source={require("../../assets/images/create-accommodation.png")}
              style={styles.ImageIconStyle}
            />
          </TouchableOpacity>
          <Button
            buttonStyle={globalStyles.btnStyle}
            titleStyle={globalStyles.btnTextStyle}
            title="Crear alojamientos"
            onPress={() => navigation.navigate("CreateAccommodation")}
          />
        </View>
      </View>
    </View>
  );
}

export default withNavigation(Services);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 70
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  column: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  ImageIconStyle: {
    margin: 15,
    height: 90,
    width: 110,
    resizeMode: "stretch"
  }
});
