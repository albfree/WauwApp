import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { WebView } from "react-native-webview";
import { withNavigation } from "react-navigation";
import axios from "axios";
import qs from "qs";
import { decode, encode } from "base-64";
import { db } from "../../population/config.js";
import { email } from "../../account/QueriesProfile";
import { CheckBox } from "react-native-elements";
import { globalStyles } from "../../styles/global";
import { payStyles } from "../../styles/payStyle";

function PayRequest(props) {
  const { navigation } = props;
  const request = navigation.state.params.request;
  const [isWebViewLoading, setIsWebViewLoading] = useState(false);
  const [paypalUrl, setPaypalUrl] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [priceRequest, setPriceRequest] = useState(request.price);
  const priceRequestConst = request.price;
  const requestId = request.id;
  const [checked, setIsChecked] = useState(false);

  let currentUserID;
  let currentUserWauwPoints;
  let currentDineroApoyo;
  let newDineroApoyo;

  if (request.hasOwnProperty("availability")) {
    newDineroApoyo = parseFloat((priceRequestConst / 1.3) * 0.1).toFixed(2);
  } else {
    newDineroApoyo = parseFloat((priceRequestConst / 1.25) * 0.1).toFixed(2);
  }

  db.ref("wauwers")
    .orderByChild("email")
    .equalTo(email)
    .on("child_added", (snap) => {
      currentUserID = snap.val().id;
      currentUserWauwPoints = snap.val().wauwPoints;
      currentDineroApoyo = snap.val().donatedMoney;
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

  useEffect(() => {}, []);

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
        payment_method: "paypal",
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
              tax: "0",
            },
          },
          description: "This is the payment transaction description",
          payment_options: {
            allowed_payment_method: "IMMEDIATE_PAY",
          },
          item_list: {
            items: [
              {
                name: "Wauw service",
                description:
                  "You are helping animal shelters with this transaction",
                quantity: "1",
                price: priceRequest,
                tax: "0",
                sku: requestId,
                currency: "EUR",
              },
            ],
          },
        },
      ],
      redirect_urls: {
        return_url: "https://example.com/",
        cancel_url: "https://example.com/",
      },
    };

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

    // Authorise with seller app information (clientId and secret key)
    axios(options)
      .then((response) => {
        setAccessToken(response.data.access_token);

        //Resquest payal payment (It will load login page payment detail on the way)
        axios
          .post(
            "https://api.sandbox.paypal.com/v1/payments/payment",
            dataDetail,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${response.data.access_token}`,
              },
            }
          )
          .then((response) => {
            const { id, links } = response.data;
            const approvalUrl = links.find(
              (data) => data.rel === "approval_url"
            ).href;

            setPaypalUrl(approvalUrl);
          })
          .catch((err) => {});
      })
      .catch((err) => {});
  };

  /*---End Paypal checkout section---*/

  onWebviewLoadStart = () => {
    if (shouldShowWebViewLoading) {
      setIsWebViewLoading(true);
    }
  };

  _onNavigationStateChange = (webViewState) => {
    //When the webViewState.title is empty this mean it's in process loading the first paypal page so there is no paypal's loading icon
    //We show our loading icon then. After that we don't want to show our icon we need to set setShouldShowWebviewLoading to limit it
    if (webViewState.title === "") {
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
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          setShouldShowWebviewLoading(true);
          var idRequest = request.id;

          Alert.alert(
            "Pago realizado",
            "El pago se ha realizado correctamente. \n\nSe han sumado " +
              Math.round((priceRequest / 6.5) * 100) / 100 +
              " Wauw Points a tu saldo de puntos." + `\n\nAdemás, con este pago ha realizado una aportación a las protectoras de ${newDineroApoyo}€`
          );

          navigation.popToTop("Services");

          var query = db.ref().child("requests/" + idRequest);
          query.update({
            isPayed: true,
          });
        })
        .catch((err) => {
          setShouldShowWebviewLoading(true);
        });

      let newPoints = Math.round((priceRequest / 6.5) * 100) / 100;

      db.ref("wauwers/" + currentUserID).once("child_added", (snap) => {
        db.ref("wauwers/" + currentUserID).update({
          wauwPoints: newPoints + currentUserWauwPoints,
          donatedMoney: parseFloat(newDineroApoyo) + parseFloat(currentDineroApoyo),
        });
      });
    }
  };

  return (
    <React.Fragment>
      {currentUserWauwPoints === 0 ? (
        <WithoutWauwPoints
          buyBook={buyBook}
          priceRequestConst={priceRequestConst}
        ></WithoutWauwPoints>
      ) : null}

      {Math.round(currentUserWauwPoints * 0.65 * 100) / 100 === priceRequest ? (
        <PointsEqualToPrice
          buyBook={buyBook}
          wauwPoints={currentUserWauwPoints}
          priceRequest={priceRequest}
          requestId={requestId}
          currentUserID={currentUserID}
          navigation={navigation}
          priceRequestConst={priceRequestConst}
          donatedMoney={newDineroApoyo}
          currentDonatedMoney={currentDineroApoyo}
        ></PointsEqualToPrice>
      ) : null}

      {(currentUserWauwPoints > 0 &&
        Math.round(currentUserWauwPoints * 0.65 * 100) / 100 < priceRequest) ||
      checked ? (
        <PointsLessToPrice
          buyBook={buyBook}
          wauwPoints={currentUserWauwPoints}
          priceRequest={priceRequest}
          setPriceRequest={setPriceRequest}
          checked={checked}
          setIsChecked={setIsChecked}
          priceRequestConst={priceRequestConst}
          currentUserID={currentUserID}
        ></PointsLessToPrice>
      ) : null}

      {Math.round(currentUserWauwPoints * 0.65 * 100) / 100 > priceRequest ? (
        <PointsMoreToPrice
          buyBook={buyBook}
          wauwPoints={currentUserWauwPoints}
          priceRequest={priceRequest}
          requestId={requestId}
          currentUserID={currentUserID}
          navigation={navigation}
          priceRequestConst={priceRequestConst}
          donatedMoney={newDineroApoyo}
          currentDonatedMoney={currentDineroApoyo}
        ></PointsMoreToPrice>
      ) : null}

      {paypalUrl ? (
        <View style={payStyles.payView}>
          <WebView
            source={{ uri: paypalUrl }}
            onNavigationStateChange={this._onNavigationStateChange}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            onLoadStart={onWebviewLoadStart}
            onLoadEnd={() => setIsWebViewLoading(false)}
          />
        </View>
      ) : null}
      {isWebViewLoading ? (
        <View>
          <ActivityIndicator size="small" color={c1} />
        </View>
      ) : null}
    </React.Fragment>
  );
}
const c1 = "#A02AE0";

function WithoutWauwPoints(props) {
  const { buyBook, priceRequestConst } = props;

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView>
        <View style={globalStyles.blankView5}>
          <Image
            source={require("../../../assets/images/MoneyDog.jpg")}
            style={globalStyles.blankImage3}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={buyBook}
            style={payStyles.payBtn}
          >
            <Text style={payStyles.payBtnTxt}>Pagar con PayPal</Text>
          </TouchableOpacity>
          <Text style={payStyles.payTxt}>
            No tienes Wauw Points para canjear.
          </Text>
          <Text style={payStyles.payTxt2}>
            Total a pagar: {priceRequestConst} €
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PointsEqualToPrice(props) {
  const {
    buyBook,
    wauwPoints,
    priceRequest,
    requestId,
    currentUserID,
    navigation,
    priceRequestConst,
    donatedMoney,
    currentDonatedMoney
  } = props;

  let valor = Math.round(wauwPoints * 0.65 * 100) / 100;

  const canjeoIgual = async () => {
    db.ref("requests/" + requestId).update({
      isPayed: true,
    });

    db.ref("wauwers/" + currentUserID).update({
      wauwPoints: 0,
      donatedMoney: parseFloat(donatedMoney) + parseFloat(currentDonatedMoney),
    });

    Alert.alert(
      "Pago realizado",
      `Has realizado el pago del servicio con Wauw Points correctamente. \n\nTu saldo de Wauw Points se ha agotado.\n\nAdemás, con este pago ha realizado una aportación a las protectoras de ${donatedMoney}€`
    );

    navigation.popToTop("Services");
  };

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView>
        <View style={globalStyles.blankView5}>
          <Image
            source={require("../../../assets/images/MoneyDog.jpg")}
            style={globalStyles.blankImage3}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={buyBook}
            style={payStyles.payBtn}
          >
            <Text style={payStyles.payBtnTxt}>Pagar con Paypal</Text>
          </TouchableOpacity>
          <Text style={payStyles.payTxt}>
            Wauw Points acumulados: {wauwPoints}
          </Text>
          <Text style={payStyles.payTxt2}>Valor de los puntos: {valor} €</Text>
          <Text style={payStyles.payTxt3}>
            Total a pagar sin aplicar descuento: {priceRequestConst} €
          </Text>
          <Text style={payStyles.payTxt}>
            Si canjeas no tendrás que realizar pago.
          </Text>
          <Text style={payStyles.payTxt2}>¿Quieres canjearlos?</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={canjeoIgual}
            style={payStyles.payBtn}
          >
            <Text style={payStyles.payBtnTxt}>Canjear</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PointsLessToPrice(props) {
  const {
    buyBook,
    wauwPoints,
    priceRequest,
    setPriceRequest,
    checked,
    setIsChecked,
    priceRequestConst,
  } = props;

  let resta = Math.round(wauwPoints * 0.65 * 100) / 100;

  let totalToPay =
    Math.round((Math.round((priceRequestConst - resta) * 100) / 100) * 100) /
    100;

  const setChecked = () => {
    if (checked === false) {
      setPriceRequest(Math.round((priceRequest - resta) * 100) / 100);
    } else {
      setPriceRequest(Math.round((priceRequest + resta) * 100) / 100);
    }
    setIsChecked(!checked);
  };

  const easterEgg = () => {
    Alert.alert(
      "EASTER EGG",
      "Aprobar ISPP con 6⏳ h/semanales: ¡DIFICULTAD DIOS! 🐶"
    );
  };

  db.ref("wauwers/" + currentUserID).update({
    wauwPoints: 0,
  });

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView>
        <View style={globalStyles.blankView5}>
          <Image
            source={require("../../../assets/images/MoneyDog.jpg")}
            style={globalStyles.blankImage3}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={buyBook}
            style={payStyles.payBtn}
          >
            <Text style={payStyles.payBtnTxt}>Pagar con Paypal</Text>
          </TouchableOpacity>
          <Text style={payStyles.payTxt}>
            Wauw Points acumulados: {wauwPoints}
          </Text>
          <Text style={payStyles.payTxt2}>Valor de los puntos: {resta} €</Text>
          <Text style={payStyles.payTxt3}>
            Total a pagar sin aplicar descuento: {priceRequestConst} €
          </Text>
          <Text style={payStyles.payTxt3}>
            Total a pagar con descuento: {totalToPay} €
          </Text>
          <Text style={payStyles.payTxt2}>¿Quieres usarlos?</Text>
          <CheckBox
            onLongPress={easterEgg}
            containerStyle={payStyles.payBtn2}
            textStyle={payStyles.payBtnTxt}
            checkedColor={"white"}
            title={"Aplicar"}
            checked={checked}
            onPress={setChecked}
          ></CheckBox>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PointsMoreToPrice(props) {
  const {
    buyBook,
    wauwPoints,
    priceRequest,
    requestId,
    currentUserID,
    navigation,
    priceRequestConst,
    donatedMoney,
    currentDonatedMoney,
  } = props;

  let valor = Math.round(wauwPoints * 0.65 * 100) / 100;

  let deMas =
    Math.round(
      (wauwPoints - Math.round((priceRequest / 0.65) * 100) / 100) * 100
    ) / 100;

  const canjeoMayor = async () => {
    db.ref("requests/" + requestId).update({
      isPayed: true,
    });

    db.ref("wauwers/" + currentUserID).update({
      wauwPoints: deMas,
      donatedMoney: parseFloat(donatedMoney) + parseFloat(currentDonatedMoney),
    });

    Alert.alert(
      "Pago realizado",
      `Has realizado el pago del servicio con Wauw Points correctamente. \n\nTe quedan` + deMas + `Wauw Points.\n\nAdemás, con este pago ha realizado una aportación a las protectoras de ${donatedMoney}€`
    );

    navigation.popToTop("Services");
  };

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView>
        <View style={globalStyles.blankView5}>
          <Image
            source={require("../../../assets/images/MoneyDog.jpg")}
            style={globalStyles.blankImage3}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={buyBook}
            style={payStyles.payBtn}
          >
            <Text style={payStyles.payBtnTxt}>Pagar con Paypal</Text>
          </TouchableOpacity>
          <Text style={payStyles.payTxt}>
            Wauw Points acumulados: {wauwPoints}
          </Text>
          <Text style={payStyles.payTxt2}>Valor de los puntos: {valor}€</Text>
          <Text style={payStyles.payTxt3}>
            Total a pagar sin aplicar descuento: {priceRequestConst}€
          </Text>
          <Text style={payStyles.payTxt}>
            Wauw Points que te quedarán después de canjear este servicio:{" "}
            {deMas}
          </Text>
          <Text style={payStyles.payTxt}>
            Si canjeas no tendrás que realizar pago
          </Text>
          <Text style={payStyles.payTxt2}>¿Quieres canjearlos?</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={canjeoMayor}
            style={payStyles.payBtn}
          >
            <Text style={payStyles.payBtnTxt}>Canjear</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default withNavigation(PayRequest);
