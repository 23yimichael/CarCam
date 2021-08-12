import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { format, parseISO, setDate } from "date-fns";
import Context from "../utils/Context.js";
import * as FileSystem from "expo-file-system";

const Item = ({ onPress, date, thumbnail, size }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Image
      style={{ height: 100, width: 150, borderRadius: 7 }}
      source={{
        uri: thumbnail,
      }}
    />
    <View style={{ flexDirection: "column", marginLeft: 10 }}>
      <Text style={styles.dateText}>
        {format(parseISO(date), "MM/dd/yyyy p")}
      </Text>
      <Text style={styles.infoText}>05:22 min</Text>
      <Text style={styles.infoText}>{size}</Text>
    </View>
  </TouchableOpacity>
);

export default function ViewRecordings({ navigation }) {
  const { setUri, videos, setVideos } = useContext(Context);
  const [fileSize, setFileSize] = useState([]);

  const read = async () => {
    const data = await AsyncStorage.getItem("@videos");
    if (data) setVideos(JSON.parse(data));

    const jsonvalues = JSON.parse(data);
    for( const videoObject of jsonvalues ) {
      const dirInfo = await FileSystem.getInfoAsync(videoObject.uri);
      fileSize.push(dirInfo.size);
    }
  };

  const renderItem = ({ item, index }) => (
    <Item
      onPress={() => {
        setUri(item.uri);
        navigation.navigate("View Video");
      }}
      date={item.date}
      thumbnail={item.thumbnail}
      size={getReadableFileSizeString(fileSize[index])}
    />
  );

  useEffect(() => {
    read();
  }, [fileSize]);

  if (!videos) return <ActivityIndicator />;

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.header}>2021</Text>
        <FlatList
          data={videos}
          renderItem={renderItem}
          keyExtractor={(item, index) => item + index}
          style={{marginBottom: 83}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: Dimensions.get("window").height / 55,
    marginTop: 20,
    marginRight: Dimensions.get("window").height / 55,
    flexDirection: "column",
  },

  header: {
    fontSize: 23,
    fontFamily: "Nunito-Bold",
    marginBottom: 10,
  },

  item: {
    flexDirection: "row",
    backgroundColor: "#E5E5E5",
    marginHorizontal: 15,
    padding: 5,
    marginBottom: 10,
  },

  dateText: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
  },

  infoText: {
    fontFamily: "Nunito-Light",
    fontSize: 15,
  },
});

// https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
function getReadableFileSizeString(fileSizeInBytes) {
  var i = -1;
  var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
  do {
      fileSizeInBytes = fileSizeInBytes / 1024;
      i++;
  } while (fileSizeInBytes > 1024);

  return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
};
