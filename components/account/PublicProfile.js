import React, { useEffect, useState } from "react";
import { withNavigation } from "react-navigation";
import {
    View,
    Text,
    SafeAreaView
} from "react-native";
import { Avatar } from "react-native-elements";
import { globalStyles } from "../styles/global";
import { ScrollView } from "react-native-gesture-handler";

function PublicProfile(props) {
    const userInfo = props.navigation.state.params.user;

    //console.log(userInfo);

    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <View style={globalStyles.infoUserView}>
                        <Avatar
                            rounded
                            size="large"
                            containerStyle={globalStyles.userInfoAvatar}
                            source={{
                                uri: userInfo.photo
                            }}
                        />
                        <Text style={globalStyles.userInfoDisplayName}>{userInfo.name}</Text>
                    </View>
                    <View style={globalStyles.userInfoDescriptionGlobal}>
                        <Text style={globalStyles.userInfoTitleDescription}>Ubicación</Text>
                        <Text style={globalStyles.userInfoDescription}>
                            {userInfo.location}
                        </Text>
                        <Text style={globalStyles.userInfoTitleDescription}>Sobre mí</Text>
                        <Text style={globalStyles.userInfoDescription}>
                            {userInfo.description}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default withNavigation(PublicProfile);