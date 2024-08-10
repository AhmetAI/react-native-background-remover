import React, { useRef } from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';


import { useTranslation } from 'react-i18next';
import "../../i18n/i18n.config" 

const Onboarding_Screen = ({ navigation }) => {
    const { t } = useTranslation();
    
    const insets = useSafeAreaInsets();
    const onboardingRef = useRef(null);

    const pages = [
        {
            backgroundColor: '#FFFC00',
            image: <LottieView style={styles.lottie} source={require('../../assets/animations/select_image.json')} autoPlay loop />,
            title:t("onboardingTitle1"),
            subtitle:t("onboardingDesc1"),
        },
        {
            backgroundColor: '#FFFC00',
            image: <LottieView style={styles.lottie} source={require('../../assets/animations/waiting.json')} autoPlay loop />,
            title:t("onboardingTitle2"),
            subtitle:t("onboardingDesc2"),
        },
        {
            backgroundColor: '#FFFC00',
            image: <LottieView style={styles.lottie} source={require('../../assets/animations/happy_people.json')} autoPlay loop />,
            title:t("onboardingTitle3"),
            subtitle:t("onboardingDesc3"),
        },
    ]

    const NextComponent = () => {
        function Next() {
            onboardingRef.current.goNext()

        }
        return (
            <TouchableOpacity style={styles.NextButton} onPress={Next} >
                <FontAwesome6 name='chevron-right' size={30} />
            </TouchableOpacity>
        )
    }

    const DoneComponent = () => {
        async function Done() {
            navigation.navigate("HomePage")
            await AsyncStorage.setItem("isFirstOpen", "true")
        }
        return (
            <TouchableOpacity style={styles.DoneButton} onPress={Done} >
                <MaterialIcons name='done' size={35} />
            </TouchableOpacity>
        )
    }

    return (
        <View style={[styles.container, { marginTop: insets.top }]} >
            <StatusBar style='auto' backgroundColor='#FFFC00' />
            <Onboarding
                ref={onboardingRef}
                titleStyles={{ fontFamily: "Montserrat-SemiBold", color: "#D65600" }}
                subTitleStyles={{ fontFamily: "Montserrat-Regular", color: "black", fontSize: 18 }}
                showSkip={false}
                pages={pages}
                NextButtonComponent={NextComponent}
                DoneButtonComponent={DoneComponent}
                bottomBarHighlight={false}
            />
        </View>
    )
}

export default Onboarding_Screen

const Device_Size = Dimensions.get("window")

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    lottie: {
        height: Device_Size.height / 2.3,
        width: Device_Size.width / 1.1,
    },
    NextButton: {
        marginRight: 20,
    },
    DoneButton: {
        marginRight: 10,
    }

})