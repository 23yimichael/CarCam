import React from "react";
import { View, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "../components/header";
import Statistics from "../components/statistics";
import Features from "../components/features";
import ViewRecordings from "./view-recordings";
import ViewVideo from "./view-video.js";

function HomeScreen({ navigation }) {
  return (
    <View>
      <Header />
      <Statistics />
      <Features navigation={navigation} />
    </View>
  );
}

const Stack = createStackNavigator();

export default function Home() {
  return (
    <Stack.Navigator initialRouteHome="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="View Recordings"
        component={ViewRecordings}
        options={{
          title: "RECORDINGS",
          headerStyle: {
            backgroundColor: "#FFFFFF",
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.5,
            shadowRadius: 3.84,
            elevation: 5,
            height: Dimensions.get("window").height / 9,
          },
          headerTitleStyle: {
            fontSize: 25,
            fontFamily: "Nunito-Bold",
          },
          headerBackTitle: " ",
          headerTintColor: "#000000",
          headerBackTitleStyle: {
            fontSize: 30,
            marginLeft: 10,
          },
        }}
      />
      <Stack.Screen
        name="View Video"
        component={ViewVideo}
        options={{
          title: " ",
          headerStyle: {
            backgroundColor: "#FFFFFF",
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.5,
            shadowRadius: 3.84,
            elevation: 5,
            height: Dimensions.get("window").height / 9,
          },
          headerTitleStyle: {
            fontSize: 25,
            fontFamily: "Nunito-Bold",
          },
          headerBackTitle: " ",
          headerTintColor: "#000000",
          headerBackTitleStyle: {
            fontSize: 30,
            marginLeft: 10,
          },
        }}
      />
    </Stack.Navigator>
  );
}
