import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Image } from "react-native-elements";
import { db } from '../../population/config';


export default function ListAccommodations(props){
    const {accList}  = props;
    const [loading, setLoading] = useState(false);
    if (loading){
        return (
            <View>
                <Text> Cargando... </Text>
            </View>
        );
    }else{
    return (
        <SafeAreaView>
            <ScrollView>
            { accList ? (
                <FlatList
                data = {accList}
                renderItem= {  accommodation  => (
                    <Accommodation accommodation = {accommodation.item} />
                )}
                keyExtractor= { (accommodation) => {accommodation.id}}
                />
            ) : (
                <View>
                    <Text> No hay alojamientos disponibles </Text>
                </View>
            )}
            </ScrollView>
        </SafeAreaView>
    );
            }
}





function Accommodation(accommodation){
    console.log(accommodation);

    return (
        <View style={styles.separacion}>
        <TouchableOpacity>
                <View style={styles.tarjeta}>
                    <View style={styles.row}>
                   
                   
                        <View style={styles.column_left}>
                            <Text> Hora de inicio: {accommodation.accommodation.startTime} \n </Text>
                            <Text> Hora de fin: {accommodation.accommodation.endTime} </Text>
                        </View>
                        <View style={styles.column_right}>
                            <Text> {accommodation.accommodation.salary} €</Text>
                        </View>
                    </View>
                </View> 
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10
        },
    column: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20
    },
    column_left: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: 20
    },
    column_right: {
        flex: 1,
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        padding: 20
    },
    tarjeta: {        
        elevation: 1, 
        backgroundColor: "#fff",
        borderRadius: 25,
        borderStyle: "solid"
    },
    separacion: {
        paddingTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
    }
});  