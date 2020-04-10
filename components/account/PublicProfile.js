import React, { useEffect, useState } from "react";
import { withNavigation } from "react-navigation";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Avatar, Rating } from "react-native-elements";
import { globalStyles } from "../styles/global";
import { ScrollView } from "react-native-gesture-handler";
import MyReviews from "./MyReviews";
import { db } from "../population/config";

function PublicProfile(props) {
  const userInfo = props.navigation.state.params.user;
  const [profileView, setProfileView] = useState([false]);
  let userRating;
  db.ref("wauwers/" + userInfo.id).once("value", (snap) => {
    userRating = snap.val().avgScore;
  });

  //console.log(userInfo);

  useEffect(() => {}, [profileView]);
  console.log(userRating);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={globalStyles.userPublicGlobal}>
          <View style={globalStyles.infoUserPublic}>
            <Avatar
              rounded
              size="large"
              containerStyle={globalStyles.userInfoPublicAvatar}
              source={{
                uri: userInfo.photo,
              }}
            />
            <Rating imageSize={20} readonly startingValue={userRating} />
            <Text style={globalStyles.infoUserScore}>{userRating}/5</Text>
          </View>
          <View>
            <Text style={globalStyles.userInfoPublicDisplayName}>
              {userInfo.name}
            </Text>
          </View>

          {profileView === true ? (
            <View style={globalStyles.userInfoPublicGlobal}>
              <View style={globalStyles.tabBarPublicPro}>
                <TouchableOpacity onPress={() => setProfileView(false)}>
                  <Text style={globalStyles.textInformationPublicPro1}>
                    Información
                  </Text>
                </TouchableOpacity>
                <Text style={globalStyles.textReviewsPublicPro1}>
                  Valoraciones
                </Text>
              </View>
              <MyReviews userInfo={userInfo} />
            </View>
          ) : (
            <View style={globalStyles.userInfoPublicGlobal}>
              <View style={globalStyles.tabBarPublicPro}>
                <Text style={globalStyles.textInformationPublicPro}>
                  Información
                </Text>
                <TouchableOpacity onPress={() => setProfileView(true)}>
                  <Text style={globalStyles.textReviewsPublicPro}>
                    Valoraciones
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={globalStyles.userInfoPublicTitleDescription}>
                Sobre mí
              </Text>
              <Text style={globalStyles.userInfoPublicDescription}>
                {userInfo.description}
              </Text>
              <Text style={globalStyles.userInfoPublicTitleDescription}>
                Ubicación
              </Text>
              <Text style={globalStyles.userInfoPublicDescription}>
                {userInfo.location}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withNavigation(PublicProfile);
