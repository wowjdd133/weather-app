import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import axios from "axios";
import * as Location from "expo-location";

import Weather from "./Weather";
import Loading from "./Loading";

const API_KEY = "317985df45af9a93ade8bdeb6298d819";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const getLocation = async () => {
      try {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
        }
        //weather?q={city name}&appid={your api key}

        const {
          coords: { latitude, longitude },
        } = await Location.getCurrentPositionAsync({});

        if (!latitude && !lonitude) {
          latitude = 35;
          lonitude = 128;
        }

        const { data } = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              lat: latitude,
              lon: longitude,
              appid: API_KEY,
            },
          }
        );
        setWeather(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        Alert.alert("Can't find you.", "So sad");
      }
    };
    getLocation();
  }, []);

  return loading ? <Loading /> : <Weather data={weather} />;
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
