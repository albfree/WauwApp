import React from "react";
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, Image } from "react-native";
import { globalStyles } from "../../styles/global";
import { styles } from "../../styles/aboutStyle";
import { FontAwesome } from "@expo/vector-icons";


export default function AboutUs(props) {
    const { navigation } = props;

    return (

        <SafeAreaView style={globalStyles.safeArea}>
            <TouchableOpacity
                style={{ alignItems: "flex-end", margin: 16 }}
                onPress={navigation.openDrawer}
            >
                <FontAwesome name="bars" size={24} color="#161924" />
            </TouchableOpacity>

            <ScrollView scrollEventThrottle={16}>

                <View style={globalStyles.homeView2}>
                    <Image
                        style={styles.homeImage}
                        source={require("../../../assets/images/usphoto.jpg")}
                    />
                </View>

                <Text style={styles.homeTitle}>{"\n"}¿Quienes somos?</Text>

                <Text style={styles.contentText}>
                    ¿Tienes problemas de tiempo? ¿Tu mascota pasa muchas horas sola por tu trabajo o tus estudios? ¿Necesitas ganar un dinero extra?
                    Todos estos problemas son muy habituales, y desde Wauw queremos acabar con ellos.{"\n"}{"\n"}
                    Ofrecemos los mejores servicios de paseo y alojamiento de mascotas para que tu pequeño nunca más esté triste
                    y tu puedas darte esas vacaciones que llevas tiempo queriendo hacer. Además todo nuestro equipo ama las mascotas,
                    así que lógicamente queremos lo mejor para ellas.
                    Es por todo esto y más que estamos muy comprometidos a que nuestros servicios sean seguros
                    y que nuestros cuidadores los traten como si fuesen parte de su familia.
         </Text>

                <View style={globalStyles.homeView2}>
                    <Image
                        style={styles.homeImage}
                        source={require("../../../assets/images/happydoggo.jpg")}
                    />
                </View>

                <Text style={styles.homeTitle}>{"\n"}¿Por qué nosotros?</Text>

                <Text style={styles.contentText}>
                    Por qué no solo somos una aplicación. Porque también velamos por las protectoras de animales y queremos ofrecerles todo el apoyo posible.
                    Desde Wauw somos fieles creyentes del compromiso animal y con cada transacción dentro de la aplicación,  un porcentaje irá destinado a donaciones
                    mensuales a las protectoras de animales con las que trabajamos.
                {"\n"}{"\n"}Además, también queremos que nuestros usuarios disfruten de la aplicación y es por ello
                que hemos implementado diferentes planes de fidelización para que puedan ahorrar dinero.

                {"\n"}{"\n"}Contamos también con una <Text style={styles.contentTextBold}>cobertura veterinaria incluida en
                todas las reservas</Text>, ya que tu mascota  es lo primero para nosotros, además de opiniones de otros usuarios sobre todos y cada uno de nuestros cuidadores y
                paseadores para que sepas con quien va a estar tu mascota y esto no te suponga nunca más una preocupación. ¡Podréis estar
                contacto dentro de la aplicación y así ver como se encuentra tu perro en todo momento!
         </Text>

                <View style={globalStyles.homeView2}>
                    <Image
                        style={styles.homeImage}
                        source={require("../../../assets/images/shiba.jpg")}
                    />
                </View>

                <Text style={styles.homeTitle}>{"\n"}Contáctanos</Text>

                <Text style={styles.contentText}>
                <Text style={styles.contentTextBold}>Email:</Text> wauwispp1920@gmail.com {"\n"}
                <Text style={styles.contentTextBold}>Dirección:</Text> Escuela Técnica Superior de Ingeniería Informática, Universidad de Sevilla {"\n"}
                <Text style={styles.contentTextBold}>Landing page:</Text> cutt.ly/wauw
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
}

