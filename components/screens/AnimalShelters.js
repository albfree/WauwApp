import React from "react";
import { View, Text,StyleSheet,SafeAreaView,ScrollView , ImageBackground} from "react-native";
import { globalStyles } from "../styles/global";
import protectora1 from "../../assets/images/protectora1.jpg";
import protectora2 from "../../assets/images/protectora2.jpg";
import protectora3 from "../../assets/images/protectora3.jpg";


export default function AnimalShelters() {
  return (
   
       <ScrollView scrollEventThrottle={16}>
          <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.profilePrints} >
    <ImageBackground source ={protectora1} style={styles.image}>
        <Text style={styles.homeTitle}>{"\n"}ARCA DE NOÉ</Text>
        
        <Text style={styles.contentText}>
          Arca de Noé es una asociación sin ánimo de lucro, legalmente constituida, 
        cuyos objetivos principales son: {"\n"}{"\n"}

        ·Denunciar el abandono y maltrato de los animales y promover su defensa.  {"\n"}{"\n"}
        ·Rescatar y cuidar de perros y gatos abandonados y buscarles familias adoptantes. {"\n"}{"\n"}
        
        Es una asociación totalmente independiente cuya única fuente de financiación
         son las cuotas de los colaboradores y los donativos. {"\n"} {"\n"}Pone especial empeño en 
         proteger aquellos animales que son peor tratados por la sociedad, 
         por motivos de edad, raza o enfermedad.{"\n"}
         </Text>  
         </ImageBackground>

    </View>
    </SafeAreaView>
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.profilePrints} >
    <ImageBackground source = {protectora2} style={styles.image}>
        <Text style={styles.homeTitle} >{"\n"}ARGOS</Text>
        
        <Text style={styles.contentText}>
        La asociación protectora ARGOS se funda en Sevilla el 24 de Febrero de 2010 
        por un grupo de personas que, habiendo colaborado con otras protectoras y refugios 
        y sabiendo las dificultades por las que estos pasan para mantener un número de animales 
        sostenible, debido a la enorme cantidad de abandonos que se producen, deciden ofrecer
         una alternativa.{"\n"}
        ARGOS nace por tanto de la necesidad de buscar una solución al hacinamiento de 
        los refugios tradicionales, bien manteniendo nuestros perros en residencias o bien 
        ayudando a que quienes encuentran animales abandonados y maltratados puedan hacerse
         cargo de ellos en sus propias casas hasta encontrarles familia definitiva. {"\n"}
         </Text>  
         </ImageBackground>

    </View>
    </SafeAreaView>
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.profilePrints} >
    <ImageBackground source = {protectora3} style={styles.image}>
        <Text style={styles.homeTitle} >{"\n"}LA SONRISA ANIMAL</Text>
        
        <Text style={styles.contentText}>
        Una pequeña asociación sin ánimo de lucro, situada en Brenes (Sevilla). {"\n"}
         En Andalucía en concreto es muy triste el desproporcionado número de casos
          que nos encontramos casi a diario y que a duras penas podemos atender,
           ya que carecemos de todo tipo de ayudas públicas y apoyo institucional,
          así como de refugio propio donde albergar a los animales rescatados. {"\n"} {"\n"}
      Por ese motivo, los perros y gatos rescatados van a parar a las casas de 
      los pocos voluntarios, algunos amigos que nos ayudan con acogidas.  {"\n"}
      Si no puedes adoptar, acoge. Si no puedes acoger, amadrina. 
      Si no puedes amadrinar, hazte socio/a, únete a nuestro grupo de teaming 
      por 1€/mes o ayúdanos a difundir. {"\n"} {"\n"} Nuestros peludos y nosotros te lo agradeceremos 
      de corazón! {"\n"}
         </Text>   
         </ImageBackground>

    </View>
    </SafeAreaView>
    </ScrollView>
   
  );
  }

  const styles = StyleSheet.create({
    contentText: {
      fontSize: 20,
      fontWeight: "300",
      marginTop: 10,
      marginHorizontal: 20,
      textAlign: "center",
      color: "white"
    },
    profilePrints: {
      height: "20%",
      width: "100%",
      resizeMode: "stretch",
      backgroundColor: "transparent",
      alignSelf: "center",
      marginTop: 10,
      marginBottom: 20,

    },
    image: {
      flex: 2,
      resizeMode: "cover",
      justifyContent: "center"
    },
    homeTitle: {
      fontSize: 24,
      fontWeight: "700",
      textAlign: "center",
      color: "white"
    },
  });
  