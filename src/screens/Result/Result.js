import React, { useCallback } from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Image, Dimensions, BackHandler } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

import colors from '../../styles/colors';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';

import { useTranslation } from 'react-i18next';
import "../../i18n/i18n.config"

const Result = ({ navigation, route }) => {
    const { t } = useTranslation()
    const insets = useSafeAreaInsets();
    const image = route.params.image

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                navigation.navigate('HomePage');
            };
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
            return () => {
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
            };
        }, [])
    );


    const saveToGallery = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: t("permRequired"),
                textBody: t("permRequiredDesc"),
            })
            return;
        }
        const filename = FileSystem.documentDirectory + `bgRemove_image_${Date.now()}.jpg`;

        try {
            await FileSystem.writeAsStringAsync(filename, image, { encoding: FileSystem.EncodingType.Base64 });

            const asset = await MediaLibrary.createAssetAsync(filename);
            await MediaLibrary.createAlbumAsync('BackMagicPhotos', asset, false);
            Toast.show({
                type: ALERT_TYPE.SUCCESS,
                title: t("success"),
                textBody: t("imageSaved"),
            })
        } catch (error) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: t("error"),
                textBody: t("failedSave"),
            })
            console.log(error);
        }
    };

    return (
        <View style={[styles.container, { marginTop: insets.top }]} >
            <StatusBar style='auto' backgroundColor={colors.off_yellow} />
            <Header title={t("result")} />
            <View style={styles.imageContainer} >
                <Image source={{ uri: `data:image/png;base64,${image}` }} style={styles.image} />
            </View>
            <View style={styles.actionContainer} >
                <Button title={t("download")} onPress={saveToGallery} />
            </View>
        </View>
    )
}

export default Result

const Device_Size = Dimensions.get("window")

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.yellow,
    },
    imageContainer: {
        marginTop: 10,
        height: Device_Size.height / 1.2,
        width: Device_Size.width,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
    },
    image: {
        height: "100%",
        width: Device_Size.width / 1.05,
        resizeMode: "contain",
    },
    actionContainer: {
        margin: 10,
    },


})