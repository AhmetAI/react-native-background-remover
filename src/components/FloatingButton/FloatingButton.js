import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../styles/colors'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { useFonts } from 'expo-font'

const FloatingButton = ({ onPress }) => {
    const [loaded] = useFonts({
        'Montserrat-SemiBold': require('../../assets/fonts/Montserrat-SemiBold.ttf'),
    });

    return (
        <TouchableOpacity style={styles.container} onPress={onPress} >
            <MaterialCommunityIcons name='plus' size={25} color={"white"} />
            <Text style={styles.text}>{loaded ? "Add Photo" : ""}</Text>
        </TouchableOpacity>
    )
}

export default FloatingButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.orange,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        borderRadius: 8,
        position: "absolute",
        bottom: 20,
        right: 20,
        flexDirection: "row"
    },
    text: {
        fontSize: 18,
        color: "white",
        fontFamily: "Montserrat-SemiBold"
    }
})