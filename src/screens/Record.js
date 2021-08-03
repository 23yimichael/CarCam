import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  Platform,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Record() {
const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.topContainer}>
          <TouchableOpacity onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <View style={styles.buttonBackground}>
              <MaterialIcons name="flip-camera-ios" size={Dimensions.get("window").width / 25} style={styles.cameraIcon} />
            </View>
          </TouchableOpacity>
          <View style={styles.timerContainer}>
            <MaterialIcons name="fiber-manual-record" size={Dimensions.get("window").width / 25} style={styles.recordIcon} />
            <Text style={styles.timerText}>00:00:00</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.speedContainer}>
            <Text style={styles.speedText}>0</Text>
            <Text style={styles.mphText}> mph</Text>
          </View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  bottomContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
    marginTop: 'auto'
  },
  topContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  cameraIcon: {
    color: "black",
    margin: 8
  },
  recordIcon: {
    color: "#F86A6A",
    margin: 8
  },
  buttonBackground: {
    borderRadius: 10000000,
    backgroundColor: "white",
    opacity: 0.75,
  },
  timerContainer: {
    backgroundColor: "white",
    opacity: 0.75,
    borderRadius: 10,
    flexDirection: "row",
    marginLeft: 'auto'
  },
  timerText: {
    fontSize: Dimensions.get("window").width / 30,
    margin: 6,
    fontFamily: 'Nunito-Bold',
  },
  speedContainer: {
    flexDirection: "row",
  },
  speedText: {
    fontSize: Dimensions.get("window").width / 11,
    fontFamily: 'Nunito-Bold',
    color: "white",
    marginTop: 'auto',
    marginTop: Dimensions.get("window").width / 11 - Dimensions.get("window").width / 13
  },
  mphText: {
    fontSize: Dimensions.get("window").width / 13,
    fontFamily: 'Nunito-Bold',
    color: "white",
    marginTop: 'auto',
  }
});