import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../../styles/colors'

import { useTranslation } from 'react-i18next';
import "../../i18n/i18n.config"

const Header = ({ title, changeLanguageFunction }) => {
  const { i18n } = useTranslation();

  async function changeLanguage() {
    const lang = i18n.language
    i18n.changeLanguage(lang == "en" ? "tr" : "en")
    await AsyncStorage.setItem('lang', (lang == "en" ? "tr" : "en"));
  }

  return (
    <View style={styles.container} >
      <Text style={styles.title}>{title}</Text>
      {changeLanguageFunction ? (
        <TouchableOpacity onPress={changeLanguage} >
          <Ionicons name='language' size={30} />
        </TouchableOpacity>
      ) :
        null
      }
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: colors.off_yellow,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    fontFamily: "Montserrat-SemiBold"
  }
})