import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import base64 from 'base64-js';
import LottieView from 'lottie-react-native';

import { API_KEY } from "@env"

import { useTranslation } from 'react-i18next';
import "../../i18n/i18n.config"

export default function App({ navigation, route }) {
  const { t } = useTranslation()
  const [image, setImage] = useState();
  const [sendingImage, setsendingImage] = useState()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [complete, setComplete] = useState(false)

  useEffect(() => {
    setsendingImage(route.params.image);
  }, []);

  useEffect(() => {
    if (sendingImage) {
      removeBackground(sendingImage);
    }
  }, [sendingImage]);


  const removeBackground = async (uri) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('image_file', {
      uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    try {
      const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Api-Key': API_KEY,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.arrayBuffer();
      const base64Image = base64.fromByteArray(new Uint8Array(data));
      setImage(base64Image);
      setComplete(true)
    } catch (err) {
      console.error(err);
      setError('Failed to remove background');
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <View style={styles.loadingContainer} >
        <LottieView source={require("../../assets/animations/wizard.json")} loop autoPlay style={styles.animation} />
        <Text style={styles.loadingText}>{t("loadingText")}</Text>
      </View>
    )
  }

  else if (error) {
    return (
      <View style={styles.errorContainer} >
        <LottieView source={require("../../assets/animations/error.json")} loop autoPlay style={styles.animation} />
        <Text style={styles.errorTitle}>{t("errorTitle")}</Text>
        <Text style={styles.errorText}>{t("errorText1")}</Text>
        <Text style={styles.errorText}>{t("errorText2")}</Text>
      </View>
    )
  }

  else if (complete) {
    navigation.navigate("Result", { image: image })
  }


}

const Device_Size = Dimensions.get("window")


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginTop: 20,
  },
  animation: {
    height: Device_Size.height / 2.3,
    width: Device_Size.width / 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.yellow,
    justifyContent: "center",
    alignItems: "center"
  },
  loadingText: {
    marginHorizontal: 10,
    fontSize: 20,
    fontFamily: "Montserrat-SemiBold",
    color: colors.orange,
    textAlign: "center"
  },
  errorContainer: {
    flex: 1,
    backgroundColor: colors.yellow,
    justifyContent: "center",
    alignItems: "center"
  },
  errorTitle: {
    fontSize: 24,
    fontFamily: "Montserrat-SemiBold",
    color: "red",
    textAlign: "center"
  },
  errorText: {
    marginHorizontal: 10,
    fontSize: 20,
    fontFamily: "Montserrat-SemiBold",
    color: colors.orange,
    textAlign: "center"
  },

});
