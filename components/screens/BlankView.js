import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { globalStyles } from "../styles/global";

export default function BlankView(props) {
  const { text } = props;
  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <View style={globalStyles.blankView}>
        <View style={globalStyles.blankView}>
          <TouchableOpacity style={globalStyles.blankView2}>
            <Text style={globalStyles.blankTxt}>{text}</Text>

            <View style={globalStyles.blankView3}>
              <Image
                source={require("../../assets/images/blank.jpg")}
                style={globalStyles.blankImage}
              />
            </View>
            <Text style={globalStyles.blankTxt2}>
              * Deslice hacia abajo para refrescar *
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
