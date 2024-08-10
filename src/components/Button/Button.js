import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import colors from '../../styles/colors'
import Octicons from "react-native-vector-icons/Octicons"

const Button = ({ title, onPress }) => {

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} >
      <Octicons name={"download"} size={20} style={styles.icon} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.orange,
    margin: 5,
    padding: 10,
    borderRadius: 8,
    flexDirection: "row",
  },
  title: {
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold"
  },
  icon: {
    marginHorizontal: 10
  }
})