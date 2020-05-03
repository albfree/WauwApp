import React, { useState, useRef } from "react";
import {
  View,
  Alert,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { AirbnbRating, Button, Input } from "react-native-elements";
import { withNavigation } from "react-navigation";
import { db } from "../../population/config";
import { email } from "../../account/QueriesProfile";
import Toast from "react-native-easy-toast";
import { globalStyles } from "../../styles/global";
import qs from "qs";
import axios from "axios";
import { myWalksStyles } from "../../styles/myWalksStyle";
import { requestsStyles } from "../../styles/requestsStyle";

function AddReviewService(props) {
  const { navigation } = props;
  const request = navigation.state.params.request;
  const worker = navigation.state.params.worker;
  const [rating, setRating] = useState(null);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const toastRef = useRef();
  const [paypalUrl, setPaypalUrl] = useState("");

  const uploadData = () => {
    let user;
    db.ref("wauwers")
      .orderByChild("email")
      .equalTo(email)
      .once("child_added", (snap) => {
        user = snap.val();
      });
    const reviewData = {
      userId: user.id,
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
                var idWorker = request.worker;
                db.ref("requests/" + request.id)
                  .update({ isRated: true })
                  .then(() => {
                    Alert.alert(
                      "Su valoración se ha guardado",
                      "¡Muchas gracias por usar Wauw!"
                    );
                    payment(idWorker);
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

  const payment = (id) => {
    var user;
    db.ref("wauwers/" + id).on("value", (snap) => {
      user = snap.val();
    });

    var randomNumber = Math.floor(Math.random() * 100000000000) + 1;
    var sender_batch_header = {
      sender_batch_id: randomNumber,
      email_subject: "¡Tu pago por el paseo o alojamiento!",
      email_message:
        "Gracias por tu paseo o alojamiento a nuestra aplicación. Con tu servicio, hemos conseguido aportar un granito de arena a las protectoras de animales",
    };

    var items = [
      {
        recipient_type: "EMAIL",
        amount: {
          value: request.price,
          currency: "EUR",
        },
        note: "Gracias por tu servicio!",
        receiver: user.paypalUrl,
      },
    ];

    const url = "https://api.sandbox.paypal.com/v1/oauth2/token";

    const data = {
      grant_type: "client_credentials",
    };

    const auth = {
      username:
        "AUrtghWgBuLlBCqUDRK4NfYpHNRxRPlxdQFu1m0nV8XSrVnfGT734v_CrmSWFjGvJ9GgcVlEyJ6GsgXq", //"your_paypal-app-client-ID",
      password:
        "EMc9eBqWueUaCtRuB92j3smvFqF4jyog2nzyFFY1Ud5us5vxm5F_KOKFj2QN1fVnaj8f33zBlh8eOGz2", //"your-paypal-app-secret-ID
    };

    const options = {
      method: "post",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Credentials": true,
      },

      //Make sure you use the qs.stringify for data
      data: qs.stringify(data),
      auth: auth,
      url,
    };

    axios(options)
      .then((response) => {
        axios
          .post(
            "https://api.sandbox.paypal.com/v1/payments/payouts",
            { sender_batch_header, items },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${response.data.access_token}`,
              },
            }
          )
          .then((response) => {
            const link = JSON.parse(JSON.stringify(response.data.links[0]));
            setPaypalUrl(link.href);
            var idRequest = request.id;
            var query = db.ref().child("requests/" + idRequest);
            query.update({
              isFinish: true,
            });
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  };

  const btn = {
    backgroundColor: "#00a680",
  };

  const viewRating = {
    backgroundColor: "white",
    height: 110,
  };

  return (
    <SafeAreaView style={requestsStyles.requestsView4}>
      <ScrollView keyboardShouldPersistTaps="never">
        <View style={requestsStyles.requestsFeed2}>
          <View style={globalStyles.viewFlex1}>
            <View style={requestsStyles.requestsView5}>
              <View style={requestsStyles.requestsView6}>
                <AirbnbRating
                  count={5}
                  reviews={["Muy mal", "Mal", "Normal", "Bueno", "Excelente"]}
                  defaultRating={0}
                  size={35}
                  onFinishRating={(value) => setRating(value)}
                />

                <Input
                  placeholder="Titulo"
                  containerStyle={requestsStyles.requestsTxt5}
                  onChange={(e) => setTitle(e.nativeEvent.text)}
                />
                <Input
                  placeholder="El servicio fue..."
                  multiline={true}
                  inputContainerStyle={requestsStyles.requestsTxt5}
                  onChange={(e) => setReview(e.nativeEvent.text)}
                />

                <Button
                  buttonStyle={myWalksStyles.myWalksBtn}
                  containerStyle={myWalksStyles.myWalksContainer}
                  title="Añadir valoración"
                  onPress={addReview}
                  titleStyle={requestsStyles.requestsBtnTittle}
                />
                <Toast ref={toastRef} position="center" opacity={0.8} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withNavigation(AddReviewService);
