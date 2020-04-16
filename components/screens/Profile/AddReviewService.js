import React, { useState, useRef } from "react";
import { StyleSheet, View, Alert, ScrollView, SafeAreaView } from "react-native";
import { AirbnbRating, Button, Input } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { db } from "../../population/config";
import { email } from "../../account/QueriesProfile";
import Toast from "react-native-easy-toast";
import { globalStyles } from "../../styles/global";

function AddReviewService(props) {
  const { navigation } = props;
  const request = navigation.state.params.request;
  const worker = navigation.state.params.worker;
  const [rating, setRating] = useState(null);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const toastRef = useRef();

  const uploadData = () => {
    let user;
    db.ref("wauwers")
      .orderByChild("email")
      .equalTo(email)
      .once("child_added", (snap) => {
        user = snap.val();
      });
    const reviewData = {
      userId:user.id,
      title: title,
      review: review,
      rating: rating,
      date: new Date().toISOString(),
    };
    const ref = db.ref("reviews/" + worker.id);
    ref
      .push()
      .set(reviewData)
      .then(() => {
        let score = worker.avgScore;
        let numReviews;
        ref
          .once("value", (snap) => {
            numReviews = snap.numChildren();
          })
          .then(() => {
            score = (score * (numReviews - 1) + rating) / numReviews;
            if (score % 2 !== 0) {
              score = Math.round(score * 10) / 10;
            }

            db.ref("wauwers/" + worker.id)
              .update({
                avgScore: score,
              })
              .then(() => {
                db.ref("requests/" + request.id)
                  .update({ isRated: true })
                  .then(() => {
                    Alert.alert("Su valoración se ha guardado", "");
                    navigation.popToTop();
                  });
              });
          });
      })
      .catch(() => {
        toastRef.current.show("Error. Inténtelo más tarde");
      });
  };

  const addReview = () => {
    if (rating === null) {
      Alert.alert("Debe puntuar a " + worker.name);
    } else {
      uploadData();
    }
  };

  const btn = {
    backgroundColor: "#00a680",
  };

  const viewRating = {
    backgroundColor: "white",
    height: 110,
  };

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
    <ScrollView keyboardShouldPersistTaps="never">
    <View style={styles.viewBody}>
      <View stlye={viewRating}>
        <AirbnbRating
          count={5}
          reviews={["Muy mal", "Mal", "Normal", "Bueno", "Excelente"]}
          defaultRating={0}
          size={35}
          onFinishRating={(value) => setRating(value)}
        />
      </View>
      <View style={styles.formReview}>
        <Input
          placeholder="Titulo"
          containerStyle={styles.input}
          onChange={(e) => setTitle(e.nativeEvent.text)}
        />
        <Input
          placeholder="El servicio fue..."
          multiline={true}
          inputContainerStyle={styles.textArea}
          onChange={(e) => setReview(e.nativeEvent.text)}
        />
      </View>
      <Button
        containerStyle={styles.btnContainer}
        buttonStyle={btn}
        title="Añadir valoración"
        onPress={addReview}
      />
      <Toast ref={toastRef} position="center" opacity={0.8} />
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    alignSelf: "center",
    flex: 1,
    //justifyContent: "flex-end",
    marginBottom: 110,
    marginTop: 10,
    width: "95%",
  },
  input: {
    marginBottom: 10,
  },
  formReview: {
    alignItems: "center",
    flex: 1,
    margin: 10,
    marginTop: 40,
  },
  textArea: {
    height: 100,
    margin: 0,
    padding: 0,
    width: "100%",
  },
  viewBody: {
    flex: 1,
  },
});

export default withNavigation(AddReviewService);
