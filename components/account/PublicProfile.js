import React, { useEffect, useState } from "react";
import { withNavigation } from "react-navigation";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    Alert
  } from "react-native";

function PublicProfile(props) {
    const { navigation } = props;

    console.log(props);

    return(
        <View>
            <Text>HOLA!</Text>
        </View>
    );
}

export default withNavigation(PublicProfile);