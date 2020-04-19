import React, { useState, useEffect } from "react";
import { db } from "../population/config.js";
import { View, Text, SafeAreaView } from "react-native";
import { Rating } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import BlankView2 from "../screens/BlankView2";
import { globalStyles } from "../styles/global";
import {
  publicProfileStyle,
  publicProfileStyles,
} from "../styles/publicProfileStyle";

export default function MyReviews(props) {
  const user = props.userInfo;
  const [myReviews, setMyReviews] = useState([]);
  const [val, setVal] = useState(true);

  useEffect(() => {
    let reviews = [];
    db.ref("reviews/" + user.id).once("value", (snap) => {
      snap.forEach((child) => {
        reviews.push(child.val());
      });
      if (reviews.length === 0) {
        setVal(false);
      }
      setMyReviews(reviews);
    });
  }, []);

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView>
        {val === true ? (
          <View>
            {myReviews.map((review, index) => (
              <Review key={index} review={review} />
            ))}
          </View>
        ) : (
          <BlankView2 text={"No hay valoraciones disponibles"} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Review(props) {
  const { review } = props;

  let user;
  db.ref("wauwers/" + review.userId).once("value", (snap) => {
    user = snap.val();
  });

  return (
    <View style={publicProfileStyles.publicProfileView4}>
      <View style={globalStyles.viewFlex1}>
        <Rating
          imageSize={20}
          readonly
          startingValue={parseInt(review.rating)}
        />

        <View>
          {user === null ? (
            <Text style={publicProfileStyles.publicProfileTxt7}>
              Usuario: Anónimo
            </Text>
          ) : (
            <Text style={publicProfileStyles.publicProfileTxt7}>
              Usuario: {user.name}
            </Text>
          )}
        </View>
        <Text style={publicProfileStyles.publicProfileTxt8}>
          {review.title}
        </Text>
        <Text style={publicProfileStyles.publicProfileTxt9}>
          {review.review}
        </Text>
      </View>
    </View>
  );
}
