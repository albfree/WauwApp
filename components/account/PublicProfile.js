import React, { useEffect, useState } from "react";
import { withNavigation } from "react-navigation";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Avatar, Rating } from "react-native-elements";
import { globalStyles } from "../styles/global";
import { ScrollView } from "react-native-gesture-handler";
import MyReviews from "./MyReviews";
import { publicProfileStyles } from "../styles/publicProfileStyle";

function PublicProfile(props) {
  const userInfo = props.navigation.state.params.user;
  const [profileView, setProfileView] = useState(false);
  const [description, setDescription] = useState(userInfo.description);
  useEffect(() => {}, [profileView]);

  useEffect(() => {
    if (!userInfo.description) {
      setDescription("Este usuario no ha proporcionado su descripción");
    }
  }, [description]);

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView>
        <View style={globalStyles.viewFeed}>
          <View style={globalStyles.viewFlex1}>
            <Avatar
              rounded
              size="large"
              containerStyle={publicProfileStyles.publicProfileAvatar}
              source={{
                uri: userInfo.photo,
              }}
            />
            <Text style={publicProfileStyles.publicProfileTxt}>
              {userInfo.name}
            </Text>

            <Rating imageSize={20} readonly startingValue={userInfo.avgScore} />

            {profileView === true ? (
              <View>
                <View style={publicProfileStyles.publicProfileView}>
                  <TouchableOpacity onPress={() => setProfileView(false)}>
                    <Text style={publicProfileStyles.publicProfileTxt2}>
                      Información
                    </Text>
                  </TouchableOpacity>
                  <Text style={publicProfileStyles.publicProfileTxt3}>
                    Valoraciones
                  </Text>
                </View>
                <View style={publicProfileStyles.publicProfileView3}>
                  <MyReviews userInfo={userInfo} />
                </View>
              </View>
            ) : (
              <View>
                <View style={publicProfileStyles.publicProfileView}>
                  <Text style={publicProfileStyles.publicProfileTxt4}>
                    Información
                  </Text>
                  <TouchableOpacity onPress={() => setProfileView(true)}>
                    <Text style={publicProfileStyles.publicProfileTxt5}>
                      Valoraciones
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text style={publicProfileStyles.publicProfileTxt6}>
                  {description}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withNavigation(PublicProfile);
