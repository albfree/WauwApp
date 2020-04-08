import React, { useState, useRef } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { AirbnbRating, Button, Input } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { db } from "../../population/config";
import { email } from "../../account/QueriesProfile";
import Toast from "react-native-easy-toast";

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
      userName: user.name,
      userPhoto: user.photo,
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

  return (
    <View style={styles.viewBody}>
      <View stlye={styles.viewRating}>
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
        buttonStyle={styles.btn}
        title="Añadir valoración"
        onPress={addReview}
      />
      <Toast ref={toastRef} position="center" opacity={0.8} />
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#00a680",
  },
  btnContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 20,
    marginBottom: 10,
    width: "95%",
    alignSelf: "center",
  },
  textArea: {
    height: 150,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  input: {
    marginBottom: 10,
  },
  formReview: {
    flex: 1,
    alignItems: "center",
    margin: 10,
    marginTop: 40,
  },
  viewBody: {
    flex: 1,
  },
  viewRating: {
    height: 110,
    backgroundColor: "white",
  },
});

export default withNavigation(AddReviewService);
