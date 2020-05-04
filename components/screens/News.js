import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { db } from "../population/config.js";
import BlankView from "./BlankView";
import Loading from "../Loading";
import { globalStyles } from "../styles/global";
import { requestsStyles } from "../styles/requestsStyle";

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export default function News() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reloadData, setReloadData] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

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
  }, [reloadData, refreshing]);

  return (
    <SafeAreaView style={globalStyles.viewFlex1}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={requestsStyles.requestsTxt16}>Tablón de Anuncios</Text>
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
      <Loading isVisible={loading} text={"Un momento..."} />
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
