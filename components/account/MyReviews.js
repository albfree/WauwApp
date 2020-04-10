import React from "react";
import { db } from "../population/config.js";
import {
  View,
  Text,
  SafeAreaView
} from "react-native";
import { Rating } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

export default function MyReviews(props) {
  const user = props.userInfo;
  let reviews = [];
  db.ref("reviews/" + user.id).once("value", (snap) => {
    snap.forEach((child) => {
      reviews.push(child.val());
    });
  });

  return (
    <SafeAreaView>
      <ScrollView>
        {reviews.length > 0 ? (
          <View>
            {reviews.map((review, index) => (
              <Review key={index} review={review} />
            ))}
          </View>
        ) : (
          <View>
            <Text>No tienes valoraciones</Text>
          </View>
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
    <View>
      <View>
        <Text>{user.name}</Text>
      </View>
      <Rating imageSize={20} readonly startingValue={parseInt(review.rating)} />
      <Text>{review.title}</Text>
      <Text>{review.review}</Text>
    </View>
  );
}
