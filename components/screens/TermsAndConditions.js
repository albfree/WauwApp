import { Text, View, Linking } from "react-native";
import React, { Component } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { loginStyles } from "../styles/loginStyle";

export default class TermsAndConditions extends Component {
  render(){
    var y = new Date();
    return(
    <View>
      <ScrollView>

      {/* EMPIEZA UN PÁRRAFO ==================================== */}
      
      <Text>
        Política de Privacidad y Protección de Datos {/* Título */}
      </Text>
      
      <Text>
        Wauw almacena los datos de los usuarios que utilizan la aplicación, y garantiza la seguridad
        y la confidencialidad de los mismos. El registro de los usuarios en esta aplicación está
        gestionado mediante el sistema de autenticación de Google. Puede consultar pinchando <Text
          onPress={() => {Linking.openURL("https://policies.google.com/privacy?hl=es&gl=es");}}
          style={loginStyles.hyperlink}
          >aquí</Text> su política de privacidad.
      </Text>

      {/* ACABA EL PÁRRAFO .......................................*/}

      {/* EMPIEZA UN PÁRRAFO ==================================== */}
      <Text>
        Condiciones generales del uso de la aplicación {/* Título */}
      </Text>

      <Text>
        El acceso a la aplicación por parte de un usuario es de carácter libre y gratuito. No obstante, dentro de
        la misma puede encontrar aplicaciones de terceros que requieran un pago para su uso, como PayPal.
        Wauw prohíbe terminantemente el uso de las aplicaciones de pago por parte de personas menores de 18 años,
        quedando esto bajo responsabilidad de los padres o tutores legales. Del mismo modo, se prohíbe a menores de
        edad el uso de la aplicación para ofrecer servicios propios de alojamiento o cuidado de perros.
      </Text>

      <Text>
        Cualquier funcionamiento anormal, o cualquier problema originado al realizar un pago mediante PayPal, quedará
        bajo responsabilidad de dicha organización. Puede obtener más información pinchando <Text
          onPress={() => {Linking.openURL("https://www.paypal.com/es/smarthelp/home");}}
          style={loginStyles.hyperlink}
          >aquí</Text>.
      </Text>

      <Text>
        La organización aseguradora que ofrece servicio a Wauw es la compañía Santa Lucía S.A. Puede obtener
        más información pinchando <Text
          onPress={() => {Linking.openURL("https://www.santalucia.es/informacion-legal");}}
          style={loginStyles.hyperlink}
          >aquí</Text>.
      </Text>

      <Text>
        Wauw prohíbe todo comportamiento indebido, de carácter ofensivo o violento. Cualquier uso inadecuado en el que
        se manifiesten signos de violencia, racismo, sexismo, discriminación o maltrato animal, así como el indebido uso 
        del chat de la aplicación como herramienta para acosar, amenazar, extorsionar, o bien, realizar cualquier 
        actividad considerada como Spam, será penalizada con el bloqueo parcial o total de la cuenta de usuario
        de quien la realice, pudiendo incluso llegar a procedimientos legales por parte de la autoridad competente
        en proporción a la gravedad de la transgresión. Si observa algún comportamiento inadecuado en cualquier
        momento, puede informar del mismo enviando un correo electrónico a <Text
          onPress={() => {Linking.openURL("mailto:wauwispp1920@gmail.com");}}
          style={loginStyles.hyperlink}
          >wauwispp1920@gmail.com</Text>.
      </Text>

      <Text>
        Es importante recordar que Wauw no es una aplicación que deba utilizarse como sustituto de cualquier empleo profesional 
        regulado por el Servicio Público de Empleo Estatal, quedando los fines de su uso a la ayuda de personas que
        no tienen la posibilidad en un determinado momento de pasear a su/s mascota/s, o bien que necesite que alguien se haga
        cargo de ella/s durante un intervalo temporal, así como la colaboración con las organizaciones y protectoras de animales
        que se citan en la aplicación.
      </Text>

      <Text>
        Wauw S.L. es titular de los derechos de propiedad intelectual e industrial de la aplicación, que
        a su vez es propiedad de la Universidad de Sevilla. No está permitido el uso indebido del contenido
        perteneciente a Wauw, ignorando o suprimiendo los derechos de autor (copyright) y apropiarse de los 
        mismos sin la autorización previa de los autores de la aplicación.  Los derechos de autor sobre un 
        programa informático que sea resultado unitario de la colaboración entre varios autores serán 
        propiedad común y corresponderán a todos éstos en la proporción que determinen (Artículo 97 - Título VII,
        Ley de Propiedad Intelectual-BOE).
      </Text>
      <Text> { "copyright \u00A9 - Wauw S.L. " + y.getFullYear()}</Text>
      {/* ACABA EL PÁRRAFO .......................................*/}

      </ScrollView>
    </View>
    );
  }
}