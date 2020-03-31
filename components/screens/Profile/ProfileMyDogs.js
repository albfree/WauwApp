import React from "react";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/global";
import { FontAwesome } from "@expo/vector-icons";

export default function ProfileMyDogs(props) {
  const { navigation } = props;
  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <TouchableOpacity
        style={{ alignItems: "flex-end", margin: 16 }}
        onPress={navigation.openDrawer}
      >
        <FontAwesome name="bars" size={24} color="#161924" />
      </TouchableOpacity>
      <View>
        <Text>Vista de mis perros</Text>
      </View>
    </SafeAreaView>
  );
}
