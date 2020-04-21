import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ScrollView, SafeAreaView } from "react-native";
import { db } from "../population/config.js";
import BlankView from "./BlankView";
import Loading from "../Loading";
import { globalStyles } from "../styles/global";
import { requestsStyles } from "../styles/requestsStyle";

export default function News() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    db.ref("broadcast")
      .orderByChild("timestamp")
      .on("value", (snap) => {
        const news = [];
        snap.forEach((child) => {
          news.push(child.val());
        });
        setNewsList(news);
      });
    setLoading(false);
    setReloadData(false);
  }, []);

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView>
        <Text style={requestsStyles.requestsTxt16}>Tablón de Anuncios</Text>
        <Loading isVisible={loading} text={"Un momento..."} />
        {newsList.length > 0 ? (
          <FlatList
            data={newsList}
            renderItem={(noticia) => <Noticia noticia={noticia} />}
            keyExtractor={(noticia) => noticia.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <BlankView text={"No hay noticias."} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
function Noticia(props) {
  const { noticia } = props;
  return (
    <View style={requestsStyles.requestsFeed}>
      <View style={globalStyles.viewFlex1}>
        <Text style={globalStyles.adminTxt6}>{noticia.item.text}</Text>
        <Text style={globalStyles.adminTxt5}>{noticia.item.date}</Text>
      </View>
    </View>
  );
}
