import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { WebView } from "react-native-webview";
import { withNavigation } from "react-navigation";
import axios from "axios";
import qs from "qs";
import { decode, encode } from "base-64";
import { db } from "../../population/config.js";
import { email } from "../../account/QueriesProfile";
import { CheckBox } from "react-native-elements";

function PayRequest(props) {
  const { navigation } = props;
  const request = navigation.state.params.request;
  const [isWebViewLoading, SetIsWebViewLoading] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [priceRequest, setPriceRequest] = useState(request.price);
  const priceRequestConst = request.price;
  const requestId = request.id;
  const [checked, setIsChecked] = useState(false);

  let currentUserID;
  let currentUserWauwPoints;

  db.ref("wauwers").orderByChild("email").equalTo(email).on("child_added", (snap) => {
    currentUserID = snap.val().id;
    currentUserWauwPoints = snap.val().wauwPoints;
  });

  //Le vamos a pasar de props al pago la request entera. De ahí, coges el precio y se lo pasas al data details. Si response.status = 200, entonces setearemos 
  //isPayed de esa request a true. En la vista de showRequest, el botón de pago se mostrará cuando isCanceled = false, isPending = false, isPayed = false, 
  // y si isCanceled = False, isPending = false y isPayed = true se mostrará el botón de "Abrir chat", que tendrá que abrir un chat entre el owner y el worker.

  //Fix bug btoa
  useEffect(() => {
    if (!global.btoa) {
      global.btoa = encode;
    }

    if (!global.atob) {
      global.atob = decode;
    }
  }, []);

  useEffect(() => {

  }, []);

  //When loading paypal page it refirects lots of times. This prop to control start loading only first time
  const [shouldShowWebViewLoading, setShouldShowWebviewLoading] = useState(
    true
  );

  /*---Paypal checkout section---*/
  const buyBook = async () => {
    //Check out https://developer.paypal.com/docs/integration/direct/payments/paypal-payments/# for more detail paypal checkout
    const dataDetail = {
      intent: "sale",
      payer: {
        payment_method: "paypal"
      },
      transactions: [
        {
          amount: {
            currency: "EUR",
            total: priceRequest,
            details: {
              shipping: "0",
              subtotal: priceRequest,
              shipping_discount: "0",
              insurance: "0",
              handling_fee: "0",
              tax: "0"
            }
          },
          description: "This is the payment transaction description",
          payment_options: {
            allowed_payment_method: "IMMEDIATE_PAY"
          },
          item_list: {
            items: [
              {
                name: "Wauw service",
                description: "You are helping animal shelters with this transaction",
                quantity: "1",
                price: priceRequest,
                tax: "0",
                sku: requestId,
                currency: "EUR"
              }
            ]
          }
        }
      ],
      redirect_urls: {
        return_url: "https://example.com/",
        cancel_url: "https://example.com/"
      }
    };

    const url = `https://api.sandbox.paypal.com/v1/oauth2/token`;

    const data = {
      grant_type: "client_credentials"
    };

    const auth = {
      username:
        "AUrtghWgBuLlBCqUDRK4NfYpHNRxRPlxdQFu1m0nV8XSrVnfGT734v_CrmSWFjGvJ9GgcVlEyJ6GsgXq", //"your_paypal-app-client-ID",
      password:
        "EMc9eBqWueUaCtRuB92j3smvFqF4jyog2nzyFFY1Ud5us5vxm5F_KOKFj2QN1fVnaj8f33zBlh8eOGz2" //"your-paypal-app-secret-ID
    };

    const options = {
      method: "post",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Credentials": true
      },

      //Make sure you use the qs.stringify for data
      data: qs.stringify(data),
      auth: auth,
      url
    };

    // Authorise with seller app information (clientId and secret key)
    axios(options)
      .then(response => {
        setAccessToken(response.data.access_token);

        //Resquest payal payment (It will load login page payment detail on the way)
        axios
          .post(
            `https://api.sandbox.paypal.com/v1/payments/payment`,
            dataDetail,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${response.data.access_token}`
              }
            }
          )
          .then(response => {
            const { id, links } = response.data;
            const approvalUrl = links.find(data => data.rel == "approval_url")
              .href;

            //console.log("response", links);
            setPaypalUrl(approvalUrl);
          })
          .catch(err => {
            //console.log({ ...err });
          });
      })
      .catch(err => {
        //console.log(err);
      });
  };

  /*---End Paypal checkout section---*/

  onWebviewLoadStart = () => {
    if (shouldShowWebViewLoading) {
      SetIsWebViewLoading(true);
    }
  };

  _onNavigationStateChange = webViewState => {
    //console.log("webViewState", webViewState);

    //When the webViewState.title is empty this mean it's in process loading the first paypal page so there is no paypal's loading icon
    //We show our loading icon then. After that we don't want to show our icon we need to set setShouldShowWebviewLoading to limit it
    if (webViewState.title == "") {
      //When the webview get here Don't need our loading anymore because there is one from paypal
      setShouldShowWebviewLoading(false);
    }

    if (webViewState.url.includes("https://example.com/")) {
      setPaypalUrl(null);
      const urlArr = webViewState.url.split(/(=|&)/);

      const paymentId = urlArr[2];
      const payerId = urlArr[10];

      axios
        .post(
          `https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`,
          { payer_id: payerId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`
            }
          }
        )
        .then(response => {
          setShouldShowWebviewLoading(true);
          // console.log("response.status", response.status);
          var idRequest = request.id;
          // console.log("id requests", idRequest);

          alert("El pago se ha realizado correctamente. \n\nSe han sumado " + (Math.round((priceRequest / 0.65) * 100) / 100) + " Wauw Points a tu saldo de puntos.");

          navigation.popToTop("Services");

          var query = db.ref().child("requests/" + idRequest);
          query.update({
            isPayed: true
          })
        })
        .catch(err => {
          setShouldShowWebviewLoading(true);
          //console.log({ ...err });
        });

      let newPoints = Math.round((priceRequest / 0.65) * 100) / 100;
      db.ref("wauwers/" + currentUserID).update({ wauwPoints: newPoints });
    }
  };

  return (
    <React.Fragment>

      {currentUserWauwPoints === 0 ? (
        <WithoutWauwPoints buyBook={buyBook}></WithoutWauwPoints>
      ) : null}

      {Math.round(currentUserWauwPoints * 0.65 * 100) / 100 === priceRequest ? (
        <PointsEqualToPrice buyBook={buyBook} wauwPoints={currentUserWauwPoints} priceRequest={priceRequest}
          requestId={requestId} currentUserID={currentUserID} navigation={navigation}></PointsEqualToPrice>
      ) : null}

      {Math.round(currentUserWauwPoints * 0.65 * 100) / 100 < priceRequest || checked ? (
        <PointsLessToPrice buyBook={buyBook} wauwPoints={currentUserWauwPoints} priceRequest={priceRequest} setPriceRequest={setPriceRequest}
          checked={checked} setIsChecked={setIsChecked} priceRequestConst={priceRequestConst}></PointsLessToPrice>
      ) : null}

      {Math.round(currentUserWauwPoints * 0.65 * 100) / 100 > priceRequest ? (
        <PointsMoreToPrice buyBook={buyBook} wauwPoints={currentUserWauwPoints} priceRequest={priceRequest}
          requestId={requestId} currentUserID={currentUserID} navigation={navigation}></PointsMoreToPrice>
      ) : null}

      {paypalUrl ? (
        <View style={styles.webview}>
          <WebView
            style={{ height: "100%", width: "100%" }}
            source={{ uri: paypalUrl }}
            onNavigationStateChange={this._onNavigationStateChange}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            onLoadStart={onWebviewLoadStart}
            onLoadEnd={() => SetIsWebViewLoading(false)}
          />
        </View>
      ) : null}
      {isWebViewLoading ? (
        <View
          style={{
            ...StyleSheet.absoluteFill,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff"
          }}
        >
          <ActivityIndicator size="small" color="#A02AE0" />
        </View>
      ) : null}
    </React.Fragment>
  );
}

function WithoutWauwPoints(props) {
  const { buyBook } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={buyBook}
        style={styles.btn}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "400",
            textAlign: "center",
            color: "#ffffff"
          }}
        >
          Pagar con PayPal
          </Text>
      </TouchableOpacity>
      <Text>No tienes Wauw Points para canjear.</Text>
    </View>
  );

}

function PointsEqualToPrice(props) {
  const { buyBook, wauwPoints, priceRequest, requestId, currentUserID, navigation } = props;

  const canjeoIgual = async () => {
    db.ref("requests/" + requestId).update({
      isPayed: true
    });

    db.ref("wauwers/" + currentUserID).update({ wauwPoints: 0 });

    alert("Has realizado el pago del servicio con Wauw Points correctamente. \n\nTu saldo de Wauw Points se ha agotado.");

    navigation.popToTop("Services");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={buyBook}
        style={styles.btn}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "400",
            textAlign: "center",
            color: "#ffffff"
          }}
        >
          Pagar con Paypal.
          </Text>
      </TouchableOpacity>
      <Text>Tienes {wauwPoints} Wauw Points que equivalen a los {priceRequest}€ del servicio. ¿Quieres canjearlos?</Text>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={canjeoIgual}
        style={styles.btnCanjear}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "400",
            textAlign: "center",
            color: "#ffffff"
          }}
        >
          Canjear
          </Text>
      </TouchableOpacity>
    </View>
  );

}

function PointsLessToPrice(props) {
  const { buyBook, wauwPoints, priceRequest, setPriceRequest, checked, setIsChecked, priceRequestConst } = props;

  let resta = Math.round(wauwPoints * 0.65 * 100) / 100;

  const setChecked = () => {
    if (checked === false) {
      setPriceRequest(priceRequest - resta);
    } else {
      setPriceRequest(priceRequest + resta);
    }
    setIsChecked(!checked);
  };

  const easterEgg = () => {
    alert("Has encontrado un Easter Egg: aprobar ISPP con 6h/semanales, dificultad DIOS! 🐶");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={buyBook}
        style={styles.btn}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "400",
            textAlign: "center",
            color: "#ffffff"
          }}
        >
          Pagar con Paypal
          </Text>
      </TouchableOpacity>
      <Text style={styles.texts}>Tienes {wauwPoints} Wauw Points que restan {resta}€ a los {priceRequestConst}€ del servicio. ¿Quieres usarlos?</Text>
      <CheckBox onLongPress={easterEgg} containerStyle={styles.check} textStyle={styles.textCheck} checkedColor={"white"}
        title={"Aplicar"} checked={checked} onPress={setChecked}></CheckBox>
    </View>
  );

}

function PointsMoreToPrice(props) {
  const { buyBook, wauwPoints, priceRequest, requestId, currentUserID, navigation } = props;

  let deMas = wauwPoints - (Math.round((priceRequest / 0.65) * 100) / 100);

  const canjeoMayor = async () => {
    db.ref("requests/" + requestId).update({
      isPayed: true
    });

    db.ref("wauwers/" + currentUserID).update({ wauwPoints: deMas });

    alert("Has realizado el pago del servicio con Wauw Points correctamente. \n\nTe quedan " + deMas + " Wauw Points.");

    navigation.popToTop("Services");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={buyBook}
        style={styles.btn}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "400",
            textAlign: "center",
            color: "#ffffff"
          }}
        >
          Pagar con Paypal
          </Text>
      </TouchableOpacity>
      <Text>Tienes {wauwPoints} Wauw Points que se quedan en {deMas} al canjearlos por los {priceRequest}€ del servicio. ¿Quieres canjearlos?</Text>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={canjeoMayor}
        style={styles.btnCanjear}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "400",
            textAlign: "center",
            color: "#ffffff"
          }}
        >
          Canjear
          </Text>
      </TouchableOpacity>
    </View>
  );

}

export default withNavigation(PayRequest);

const morado = "#4d399a";
const blanco = "white";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingTop: 20
  },
  webview: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#ff7549"
  },
  btnCanjear: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    backgroundColor: morado,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center"
  },
  check: {
    backgroundColor: morado,
    borderRadius: 15
  },
  textCheck: {
    color: blanco
  },
  texts: {
    fontSize: 17,
    textAlign: "center"
  }
});

