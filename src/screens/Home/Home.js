import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

import colors from '../../styles/colors';
import Header from '../../components/Header/Header';

import { useTranslation } from 'react-i18next';
import "../../i18n/i18n.config" 

const Home = ({ navigation }) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  async function handleNewPhoto() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      navigation.navigate("Editor", { image: imageUri });
    }
  }

  return (
    <View style={[styles.container, { marginTop: insets.top }]} >
      <Header title={t("homePage")} changeLanguageFunction />
      <StatusBar style='auto' backgroundColor={colors.off_yellow} />
      <View style={styles.innerContainer} >
        <TouchableOpacity style={styles.uploadPhoto_container} onPress={handleNewPhoto} >
          <FontAwesome5 name='upload' size={50} color={colors.orange} />
          <Text style={styles.uploadText}>{t("uploadPhoto")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Home

const Device_Size = Dimensions.get("window")

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.yellow,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  uploadPhoto_container: {
    margin: 10,
    height: Device_Size.height / 1.15,
    borderColor: colors.orange,
    borderWidth: 3,
    borderRadius: 8,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadText: {
    fontSize: 28,
    fontFamily: "Montserrat-SemiBold",
    color: colors.orange
  },
})